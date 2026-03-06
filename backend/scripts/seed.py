"""Seed script: creates a default demo user."""
import asyncio
import os
import sys

# Add backend dir to path so we can import app modules
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from dotenv import load_dotenv
load_dotenv(os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), ".env"))

from sqlalchemy import select
from app.database import async_session
from app.models.user import User
from app.auth import hash_password


async def seed():
    async with async_session() as session:
        result = await session.execute(select(User).where(User.username == "demo"))
        existing = result.scalar_one_or_none()
        if existing:
            print(f"Demo user already exists: id={existing.id}")
            return

        user = User(
            username="demo",
            password_hash=hash_password("password"),
        )
        session.add(user)
        await session.commit()
        await session.refresh(user)
        print(f"Created demo user: id={user.id}, username=demo, password=password")


if __name__ == "__main__":
    asyncio.run(seed())
