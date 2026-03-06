from datetime import datetime

from pydantic import BaseModel


class HoldingCreate(BaseModel):
    ticker: str
    quantity: float


class HoldingResponse(BaseModel):
    id: str
    ticker: str
    quantity: float
    user_id: str
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}
