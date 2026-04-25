from datetime import datetime, timezone

from fastapi import APIRouter, File, UploadFile
from pydantic import BaseModel


router = APIRouter()


class ChatRequest(BaseModel):
    message: str
    user_id: str | None = None
    org_id: str | None = None


@router.get("/dashboard/summary")
async def dashboard_summary() -> dict:
    # Fallback-safe summary used by dashboard cards.
    return {
        "documents": 12,
        "alerts": 3,
        "compliance_score": 78,
        "total_documents": 12,
        "alerts_count": 3,
    }


@router.get("/policies")
async def list_policies() -> list[dict]:
    now = datetime.now(timezone.utc).isoformat()
    return [
        {
            "_id": "pol_001",
            "name": "Employee Conduct Policy",
            "status": "completed",
            "version": "1.0",
            "owner": "Compliance Team",
            "created_at": now,
            "complianceScore": 82,
        },
        {
            "_id": "pol_002",
            "name": "Vendor Data Policy",
            "status": "processing",
            "version": "1.0",
            "owner": "Legal Team",
            "created_at": now,
            "complianceScore": 76,
        },
    ]


@router.post("/policies/upload")
async def upload_policy(file: UploadFile = File(...)) -> dict:
    return {
        "_id": f"pol_{int(datetime.now(timezone.utc).timestamp())}",
        "file_name": file.filename,
        "status": "processing",
        "created_at": datetime.now(timezone.utc).isoformat(),
        "owner": "Compliance Team",
        "complianceScore": 0,
    }


@router.get("/analysis/{doc_id}")
async def analysis_status(doc_id: str) -> dict:
    # Stable response shape for frontend pipeline visualizations.
    return {
        "doc_id": doc_id,
        "parsed": "completed",
        "knowledge_graph": "completed",
        "gap_analysis": "processing",
        "steps": [
            {
                "id": "parse",
                "label": "Parsed (spaCy)",
                "description": "Entity and clause extraction",
                "status": "complete",
                "duration": "2.1s",
            },
            {
                "id": "graph",
                "label": "Knowledge Graph (Neo4j)",
                "description": "Graph nodes and relations generated",
                "status": "complete",
                "duration": "3.4s",
            },
            {
                "id": "gap",
                "label": "Gap Analysis",
                "description": "Compliance mismatch detection",
                "status": "processing",
            },
        ],
    }


@router.get("/alerts")
async def alerts() -> list[dict]:
    return [
        {
            "_id": "alert_001",
            "message": "Potential compliance gap in data retention clause.",
            "severity": "high",
            "created_at": datetime.now(timezone.utc).isoformat(),
        },
        {
            "_id": "alert_002",
            "message": "Policy review pending for vendor onboarding controls.",
            "severity": "medium",
            "created_at": datetime.now(timezone.utc).isoformat(),
        },
        {
            "_id": "alert_003",
            "message": "Latest document is still being processed.",
            "severity": "low",
            "created_at": datetime.now(timezone.utc).isoformat(),
        },
    ]


@router.post("/ai/chat")
async def ai_chat(payload: ChatRequest) -> dict:
    text = (payload.message or "").strip()
    if not text:
        text = "Please provide your policy question."
    return {
        "response": "Your policy may have compliance gaps in data protection.",
        "echo": text,
        "user_id": payload.user_id,
        "org_id": payload.org_id,
    }


@router.get("/org/team")
async def org_team() -> list[dict]:
    return [
        {"_id": "user_001", "name": "Shrimant Marathe", "email": "shrimant@lexisgraph.ai", "role": "admin"},
        {"_id": "user_002", "name": "Priya Sharma", "email": "priya@lexisgraph.ai", "role": "analyst"},
        {"_id": "user_003", "name": "Arjun Patel", "email": "arjun@lexisgraph.ai", "role": "viewer"},
    ]
