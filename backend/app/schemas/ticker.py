from pydantic import BaseModel


class TickerResponse(BaseModel):
    symbol: str
    name: str
    sector: str | None = None


class TickerSuggestion(BaseModel):
    ticker: str
    quantity: float
    reason: str
