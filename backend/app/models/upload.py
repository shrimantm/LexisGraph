from typing import Any

from pydantic import BaseModel, ConfigDict


class UploadResponse(BaseModel):
    model_config = ConfigDict(extra="allow")

    message: str
    path: str
    processed_path: str
    document_id: str
    stored_in_db: bool
    hash: str
    text: str
    clauses: list[dict[str, Any]]
