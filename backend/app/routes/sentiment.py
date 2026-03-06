from fastapi import APIRouter, Depends

from app.auth import get_current_user
from app.models.user import User
from app.schemas.sentiment import SentimentResponse
from app.services.sentiment import get_mock_sentiment

router = APIRouter(prefix="/api/sentiment", tags=["sentiment"])


@router.get("", response_model=SentimentResponse)
async def get_sentiment(user: User = Depends(get_current_user)):
    return get_mock_sentiment()
