import uuid

from sqlalchemy import Float, ForeignKey, Index, String, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.base import Base


class Holding(Base):
    __tablename__ = "holdings"
    __table_args__ = (
        UniqueConstraint("user_id", "ticker", name="uq_user_ticker"),
        Index("ix_holdings_user_id", "user_id"),
    )

    ticker: Mapped[str] = mapped_column(String(20))
    quantity: Mapped[float] = mapped_column(Float, default=0.0)
    user_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("users.id", ondelete="CASCADE")
    )

    user = relationship("User", back_populates="holdings")
