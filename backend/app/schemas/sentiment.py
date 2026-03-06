from pydantic import BaseModel


class SentimentItem(BaseModel):
    name: str
    score: float
    description: str


class SentimentResponse(BaseModel):
    hot_sectors: list[SentimentItem]
    risky_sectors: list[SentimentItem]
    hot_regions: list[SentimentItem]
    risky_regions: list[SentimentItem]
