from fastapi import APIRouter, Depends

from app.auth import get_current_user
from app.models.user import User
from app.schemas.article import ArticleResponse
from app.services.yahoo_finance import fetch_yahoo_finance_news

router = APIRouter(prefix="/api/yahoo-finance", tags=["yahoo-finance"])


@router.get("", response_model=list[ArticleResponse])
async def get_yahoo_finance_news(user: User = Depends(get_current_user)):
    return await fetch_yahoo_finance_news()
