from pydantic import BaseModel


class ExportEmptyResponse(BaseModel):
    message: str
