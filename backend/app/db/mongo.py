import logging
import os
from datetime import datetime, timezone

from pymongo import MongoClient
from pymongo.collection import Collection
from pymongo.database import Database
from pymongo.errors import DuplicateKeyError

logger = logging.getLogger(__name__)


MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")
MONGO_DB_NAME = "lexisgraph"

_CLIENT: MongoClient | None = None


def get_client() -> MongoClient:
    """Create/reuse MongoDB client for local community server."""
    global _CLIENT
    if _CLIENT is None:
        _CLIENT = MongoClient(MONGO_URI, serverSelectionTimeoutMS=5000)
        _CLIENT.admin.command("ping")
        logger.info("MongoDB client initialized at %s", MONGO_URI)
    return _CLIENT


def get_database() -> Database:
    """Return lexisgraph database handle."""
    client = get_client()
    db = client[MONGO_DB_NAME]
    logger.info("MongoDB connection initialized for database=%s", MONGO_DB_NAME)
    return db


def get_collection(name: str) -> Collection:
    """Return collection handle."""
    db = get_database()
    return db[name]

# User Operations
def get_user(user_id: str):
    return get_collection("users").find_one({"user_id": user_id})

def get_user_by_email(email: str):
    return get_collection("users").find_one({"email": email})

def create_or_update_user(user_data: dict):
    return get_collection("users").update_one(
        {"user_id": user_data["user_id"]},
        {"$set": user_data},
        upsert=True
    )

# Organization Operations
def get_organization_by_code(org_code: str):
    return get_collection("organizations").find_one({"org_code": org_code})

def get_organization_by_id(org_id: str):
    from bson import ObjectId
    try:
        return get_collection("organizations").find_one({"_id": ObjectId(org_id)})
    except Exception:
        return None

def create_organization(name: str, created_by: str):
    import uuid
    org_code = str(uuid.uuid4())[:8].upper()
    org_doc = {
        "name": name,
        "org_code": org_code,
        "created_by": created_by,
        "created_at": datetime.now(timezone.utc)
    }
    result = get_collection("organizations").insert_one(org_doc)
    org_id = str(result.inserted_id)
    
    # Assign creator as admin
    create_or_update_user({
        "clerk_user_id": created_by,
        "org_id": org_id,
        "role": "admin"
    })
    
    return {**org_doc, "_id": org_id}

# Join Requests
def create_join_request(user_id: str, org_id: str):
    request_doc = {
        "user_id": user_id,
        "org_id": org_id,
        "status": "pending",
        "created_at": datetime.now(timezone.utc)
    }
    return get_collection("join_requests").insert_one(request_doc)

def get_pending_requests(org_id: str):
    return list(get_collection("join_requests").find({"org_id": org_id, "status": "pending"}))

def approve_join_request(request_id: str, admin_org_id: str):
    from bson import ObjectId
    req = get_collection("join_requests").find_one({"_id": ObjectId(request_id), "org_id": admin_org_id})
    if not req:
        return False
    
    # Update request status
    get_collection("join_requests").update_one(
        {"_id": ObjectId(request_id)},
        {"$set": {"status": "approved"}}
    )
    
    # Add user to org
    create_or_update_user({
        "clerk_user_id": req["user_id"],
        "org_id": admin_org_id,
        "role": "member"
    })
    return True

# Document Operations
def store_org_document(data: dict):
    document = {
        "org_id": data["org_id"],
        "user_id": data["user_id"],
        "file_name": data["file_name"],
        "extracted_json": data.get("extracted_json", {}),
        "created_at": datetime.now(timezone.utc)
    }
    result = get_collection("documents").insert_one(document)
    return str(result.inserted_id)

def get_org_documents(org_id: str):
    return list(get_collection("documents").find({"org_id": org_id}).sort("created_at", -1))

# Legacy Functions (Required by existing routes)
def document_hash_exists(source: str, content_hash: str) -> bool:
    if not content_hash:
        return False
    collection = get_database()["user_documents" if source == "user" else "external_documents"]
    existing = collection.find_one({"hash": content_hash}, {"_id": 1})
    return existing is not None

def store_document(data: dict, source: str) -> str | None:
    collection = get_database()["user_documents" if source == "user" else "external_documents"]
    content_hash = data.get("hash", "")
    if document_hash_exists(source, content_hash):
        return None
    document = {
        "source": source,
        "source_type": data.get("source_type", source),
        "title": data.get("title", "untitled"),
        "created_at": datetime.now(timezone.utc),
        "hash": content_hash,
        **{k: v for k, v in data.items() if k not in ["hash", "created_at"]}
    }
    result = collection.insert_one(document)
    return str(result.inserted_id)
