from fastapi import APIRouter, Depends, Query

from app.auth import get_current_user
from app.models.user import User
from app.schemas.social import SocialPostResponse
from app.services.reddit import fetch_reddit_posts

router = APIRouter(prefix="/api/reddit", tags=["reddit"])


@router.get("", response_model=list[SocialPostResponse])
async def get_reddit_posts(
    subreddit: str = Query("stocks", description="Subreddit name"),
    user: User = Depends(get_current_user),
):
    return await fetch_reddit_posts(subreddit)
