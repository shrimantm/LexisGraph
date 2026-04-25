from typing import Any

from pydantic import BaseModel, ConfigDict


class FetchResponse(BaseModel):
    model_config = ConfigDict(extra="allow")

    message: str
    source: str
    results: dict[str, dict[str, Any]]


class FetchNowResponse(BaseModel):
    model_config = ConfigDict(extra="allow")

    message: str
    result: dict[str, Any]
