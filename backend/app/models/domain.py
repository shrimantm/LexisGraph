from pydantic import BaseModel, ConfigDict


class DomainUploadStatusResponse(BaseModel):
    model_config = ConfigDict(extra="allow")

    hash: str
    status: str
    step: str
    progress: int


class DomainFileMetadata(BaseModel):
    filename: str
    path: str
    title: str
    domain: str
    created_at: str
    clauses_count: int


class DomainListResponse(BaseModel):
    domain: str
    count: int
    files: list[DomainFileMetadata]
