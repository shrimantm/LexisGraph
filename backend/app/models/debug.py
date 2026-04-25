from pydantic import BaseModel


class DebugDocumentSummary(BaseModel):
    id: str
    source: str
    source_type: str
    title: str
    hash: str
    created_at: str
    clause_count: int


class DebugDocumentsResponse(BaseModel):
    count: int
    documents: list[DebugDocumentSummary]


class DebugStatsResponse(BaseModel):
    user_documents_count: int
    external_documents_count: int
    total_documents: int
