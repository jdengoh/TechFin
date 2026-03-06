import logging
from datetime import datetime, timedelta, timezone

import httpx

from app.config import settings

logger = logging.getLogger(__name__)


def _mock_articles() -> list[dict]:
    now = datetime.now(timezone.utc)
    return [
        {
            "id": "mock-1",
            "title": "Energy Sector Surges as Oil Prices Hit 6-Month High",
            "summary": "Crude oil prices climbed sharply this week as OPEC+ maintained production cuts. Energy stocks across the S&P 500 outperformed all other sectors.",
            "source": "Yahoo Finance",
            "published_at": (now - timedelta(minutes=30)).isoformat(),
            "url": "#",
            "verdict": "Hot Sector: Energy",
            "thumbnail": None,
        },
        {
            "id": "mock-2",
            "title": "Tech Giants Report Strong Q4 Earnings Amid AI Investment Boom",
            "summary": "Microsoft, Google, and Amazon all beat analyst expectations as cloud computing and AI infrastructure spending continue to drive revenue growth.",
            "source": "Yahoo Finance",
            "published_at": (now - timedelta(hours=2)).isoformat(),
            "url": "#",
            "verdict": "Hot Sector: Technology",
            "thumbnail": None,
        },
        {
            "id": "mock-3",
            "title": "Federal Reserve Signals Potential Rate Cut in Q2",
            "summary": "Fed Chair indicated the central bank may begin easing monetary policy as inflation trends toward the 2% target, boosting financial sector stocks.",
            "source": "Yahoo Finance",
            "published_at": (now - timedelta(hours=4)).isoformat(),
            "url": "#",
            "verdict": "Hot Sector: Financials",
            "thumbnail": None,
        },
        {
            "id": "mock-4",
            "title": "Healthcare Stocks Under Pressure After Drug Pricing Legislation",
            "summary": "Pharmaceutical companies saw sharp declines after Congress advanced new drug pricing reform bills. Biotech sector particularly hard hit.",
            "source": "Yahoo Finance",
            "published_at": (now - timedelta(hours=6)).isoformat(),
            "url": "#",
            "verdict": "Hot Sector: Energy",
            "thumbnail": None,
        },
        {
            "id": "mock-5",
            "title": "Semiconductor Supply Chain Stabilizes, Chip Stocks Rally",
            "summary": "Global semiconductor supply chains have largely normalized after years of disruption. NVIDIA, AMD, and TSMC shares rose on improved outlook.",
            "source": "Yahoo Finance",
            "published_at": (now - timedelta(hours=8)).isoformat(),
            "url": "#",
            "verdict": "Hot Sector: Technology",
            "thumbnail": None,
        },
        {
            "id": "mock-6",
            "title": "Consumer Staples Defensive Plays See Increased Inflows",
            "summary": "As market volatility increases, investors rotate into defensive consumer staples stocks. Procter & Gamble and Coca-Cola see highest inflows in months.",
            "source": "Yahoo Finance",
            "published_at": (now - timedelta(hours=12)).isoformat(),
            "url": "#",
            "verdict": "Hot Sector: Energy",
            "thumbnail": None,
        },
    ]


async def fetch_yahoo_finance_news() -> list[dict]:
    api_key = settings.RAPIDAPI_KEY
    host = settings.RAPIDAPI_YAHOO_FINANCE_HOST

    if not api_key or api_key == "your_rapidapi_key_here":
        logger.warning("[yahoo-finance] No API key configured, returning mock data")
        return _mock_articles()

    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(
                f"https://{host}/api/v1/markets/news",
                params={"tickers": "AAPL,MSFT,GOOGL,NVDA", "type": "ALL"},
                headers={
                    "x-rapidapi-key": api_key,
                    "x-rapidapi-host": host,
                },
                timeout=15.0,
            )
            response.raise_for_status()
            data = response.json()

        items = data.get("body") or data.get("news") or []
        articles = []
        for i, item in enumerate(items[:12]):
            articles.append({
                "id": item.get("id", str(i)),
                "title": item.get("title", "No title"),
                "summary": item.get("summary") or item.get("description", "No summary available."),
                "source": item.get("source") or item.get("publisher", "Yahoo Finance"),
                "published_at": item.get("pubDate") or item.get("published_at", datetime.now(timezone.utc).isoformat()),
                "url": item.get("link") or item.get("url", "#"),
                "thumbnail": item.get("img"),
                "verdict": "Hot Sector: Energy",
            })
        return articles

    except Exception as e:
        logger.error("[yahoo-finance] Fetch error: %s", e)
        return _mock_articles()
