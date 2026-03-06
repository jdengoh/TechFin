from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.auth import get_current_user
from app.database import get_db
from app.models.holding import Holding
from app.models.user import User
from app.schemas.ticker import TickerSuggestion

router = APIRouter(prefix="/api/suggestions", tags=["suggestions"])


@router.get("", response_model=list[TickerSuggestion])
async def get_suggestions(
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(Holding).where(Holding.user_id == user.id)
    )
    holdings = result.scalars().all()

    return [
        TickerSuggestion(
            ticker=h.ticker,
            quantity=h.quantity,
            reason=f"Based on your current holding of {h.ticker}",
        )
        for h in holdings
    ]
