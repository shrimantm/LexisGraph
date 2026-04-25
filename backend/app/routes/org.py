from fastapi import APIRouter, Depends, HTTPException
from app.auth.clerk import get_current_user
from app.db.mongo import (
    get_user, create_organization, get_organization_by_code, 
    create_join_request, get_pending_requests, approve_join_request
)
from app.models.org import ApproveRequest, OrgCreateRequest, OrgJoinRequest

router = APIRouter(prefix="/org")

@router.post("/create")
async def create_org(data: OrgCreateRequest, user: dict = Depends(get_current_user)):
    # Check if user already in an org
    existing_user = get_user(user["id"])
    if existing_user and existing_user.get("org_id"):
        raise HTTPException(status_code=400, detail="User already belongs to an organization")
    
    org = create_organization(data.name, user["id"])
    return org

@router.post("/join")
async def join_org(data: OrgJoinRequest, user: dict = Depends(get_current_user)):
    org = get_organization_by_code(data.org_code)
    if not org:
        raise HTTPException(status_code=404, detail="Organization not found")
    
    # Check if user already in an org
    existing_user = get_user(user["id"])
    if existing_user and existing_user.get("org_id"):
        raise HTTPException(status_code=400, detail="User already belongs to an organization")
    
    create_join_request(user["id"], str(org["_id"]))
    return {"message": "Join request submitted"}

@router.get("/requests")
async def get_requests(user: dict = Depends(get_current_user)):
    db_user = get_user(user["id"])
    if not db_user or db_user.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Only admins can view join requests")
    
    requests = get_pending_requests(db_user["org_id"])
    # Convert ObjectIds to strings for JSON
    for req in requests:
        req["_id"] = str(req["_id"])
    return requests

@router.post("/approve")
async def approve_request(data: ApproveRequest, user: dict = Depends(get_current_user)):
    db_user = get_user(user["id"])
    if not db_user or db_user.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Only admins can approve requests")
    
    success = approve_join_request(data.request_id, db_user["org_id"])
    if not success:
        raise HTTPException(status_code=400, detail="Failed to approve request")
    
    return {"message": "User approved"}

@router.get("/me")
async def get_my_org(user: dict = Depends(get_current_user)):
    db_user = get_user(user["id"])
    if not db_user:
        return {"user": None, "org": None}
    
    return {
        "user": {
            "id": db_user["clerk_user_id"],
            "role": db_user.get("role"),
            "org_id": db_user.get("org_id")
        }
    }
