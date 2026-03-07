import asyncio
import logging
from functools import partial

from app.services.news_fetcher import fetch_yahoo_rss

logger = logging.getLogger(__name__)


async def fetch_yahoo_finance_news(limit: int = 30) -> list[dict]:
    """Fetch Yahoo Finance news via RSS feeds, run in thread pool to avoid blocking."""
    loop = asyncio.get_running_loop()
    try:
        rows = await loop.run_in_executor(None, fetch_yahoo_rss)
    except Exception as e:
        logger.error("[yahoo-finance] RSS fetch failed: %s", e)
        rows = []

    articles = []
    for row in rows[:limit]:
        published_at = row["published_at"]
        articles.append({
            "id": row["news_id"],
            "title": row["title"],
            "summary": row.get("summary") or "",
            "source": "Yahoo Finance",
            "published_at": published_at.isoformat() if hasattr(published_at, "isoformat") else str(published_at),
            "url": row["url"],
            "verdict": row.get("ticker_hint"),
            "thumbnail": None,
        })

    return articles
