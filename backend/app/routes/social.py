from fastapi import APIRouter, Depends

from app.auth import get_current_user
from app.models.user import User
from app.services.twitter import get_mock_twitter_posts
from app.services.linkedin import get_mock_linkedin_posts

router = APIRouter(prefix="/api/social", tags=["social"])


@router.get("/twitter")
async def get_twitter_posts(user: User = Depends(get_current_user)):
    return get_mock_twitter_posts()


@router.get("/linkedin")
async def get_linkedin_posts(user: User = Depends(get_current_user)):
    return get_mock_linkedin_posts()
