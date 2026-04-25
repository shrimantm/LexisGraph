from pydantic import BaseModel


class OrgCreateRequest(BaseModel):
    name: str


class OrgJoinRequest(BaseModel):
    org_code: str


class ApproveRequest(BaseModel):
    request_id: str
