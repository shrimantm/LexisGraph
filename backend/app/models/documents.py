from datetime import datetime
from typing import Any

from pydantic import BaseModel, ConfigDict


class ExtractedJsonPayload(BaseModel):
    model_config = ConfigDict(extra="allow")

    text_length: int | None = None
    preview: str | None = None
    metadata: dict[str, Any] | None = None


class DocumentUploadResponse(BaseModel):
    id: str
    message: str


class OrgDocumentRecord(BaseModel):
    model_config = ConfigDict(extra="allow")

    _id: str | None = None
    org_id: str | None = None
    user_id: str | None = None
    file_name: str | None = None
    extracted_json: dict[str, Any] | None = None
    created_at: datetime | str | None = None
