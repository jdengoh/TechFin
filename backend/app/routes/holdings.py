from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.auth import get_current_user
from app.database import get_db
from app.models.holding import Holding
from app.models.user import User
from app.schemas.holding import HoldingCreate, HoldingResponse

router = APIRouter(prefix="/api/holdings", tags=["holdings"])


def _holding_response(h: Holding) -> HoldingResponse:
    return HoldingResponse(
        id=str(h.id),
        ticker=h.ticker,
        quantity=h.quantity,
        user_id=str(h.user_id),
        created_at=h.created_at,
        updated_at=h.updated_at,
    )


@router.get("", response_model=list[HoldingResponse])
async def list_holdings(
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(Holding).where(Holding.user_id == user.id).order_by(Holding.created_at)
    )
    return [_holding_response(h) for h in result.scalars().all()]


@router.post("", response_model=HoldingResponse, status_code=status.HTTP_201_CREATED)
async def upsert_holding(
    body: HoldingCreate,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(Holding).where(
            Holding.user_id == user.id,
            Holding.ticker == body.ticker.upper(),
        )
    )
    existing = result.scalar_one_or_none()

    if existing:
        existing.quantity = body.quantity
        await db.flush()
        await db.refresh(existing)
        return _holding_response(existing)

    holding = Holding(
        ticker=body.ticker.upper(),
        quantity=body.quantity,
        user_id=user.id,
    )
    db.add(holding)
    await db.flush()
    await db.refresh(holding)
    return _holding_response(holding)


@router.delete("/{holding_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_holding(
    holding_id: str,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(select(Holding).where(Holding.id == holding_id))
    holding = result.scalar_one_or_none()

    if not holding:
        raise HTTPException(status_code=404, detail="Holding not found")
    if holding.user_id != user.id:
        raise HTTPException(status_code=403, detail="Not authorized")

    await db.delete(holding)
