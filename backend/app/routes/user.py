from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.auth import get_current_user
from app.database import get_db
from app.models.user import User
from app.schemas.user import UserResponse

router = APIRouter(prefix="/api/user", tags=["user"])


@router.patch("/onboarded", response_model=UserResponse)
async def set_onboarded(
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    user.has_onboarded = True
    await db.flush()
    await db.refresh(user)
    return UserResponse(
        id=str(user.id),
        username=user.username,
        has_onboarded=user.has_onboarded,
        created_at=user.created_at,
    )
