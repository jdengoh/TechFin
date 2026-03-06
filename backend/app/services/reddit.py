import logging
import time
from base64 import b64encode
from datetime import datetime, timedelta, timezone

import httpx

from app.config import settings

logger = logging.getLogger(__name__)

# Module-level token cache
_token_cache: dict | None = None


async def _get_reddit_token() -> str:
    global _token_cache

    if _token_cache and time.time() < _token_cache["expires_at"] - 60:
        return _token_cache["token"]

    credentials = b64encode(
        f"{settings.REDDIT_CLIENT_ID}:{settings.REDDIT_CLIENT_SECRET}".encode()
    ).decode()

    async with httpx.AsyncClient() as client:
        response = await client.post(
            "https://www.reddit.com/api/v1/access_token",
            headers={
                "Authorization": f"Basic {credentials}",
                "Content-Type": "application/x-www-form-urlencoded",
                "User-Agent": settings.REDDIT_USER_AGENT,
            },
            content="grant_type=client_credentials",
            timeout=10.0,
        )
        response.raise_for_status()
        data = response.json()

    _token_cache = {
        "token": data["access_token"],
        "expires_at": time.time() + data["expires_in"],
    }
    return _token_cache["token"]


def _parse_reddit_data(data: dict, subreddit: str) -> list[dict]:
    children = data.get("data", {}).get("children", [])
    if not isinstance(children, list):
        return _mock_reddit_posts(subreddit)

    posts = []
    for post in children:
        p = post.get("data", {})
        content = (p.get("selftext") or "")[:500] or p.get("title", "")
        posts.append({
            "id": p.get("id", ""),
            "platform": "reddit",
            "author": f"u/{p.get('author', 'unknown')}",
            "content": content,
            "upvotes": p.get("score", 0),
            "comments": p.get("num_comments", 0),
            "subreddit": f"r/{subreddit}",
            "url": f"https://reddit.com{p.get('permalink', '')}",
            "published_at": datetime.fromtimestamp(
                p.get("created_utc", 0), tz=timezone.utc
            ).isoformat(),
        })
    return posts


def _mock_reddit_posts(subreddit: str) -> list[dict]:
    now = datetime.now(timezone.utc)
    mock_posts: dict[str, list[dict]] = {
        "wallstreetbets": [
            {
                "id": "wsb-1",
                "platform": "reddit",
                "author": "u/RetailInvestorGuru",
                "content": "NVDA calls printing \U0001f680 AI momentum is unstoppable. Everyone sleeping on the GPU shortage thesis.",
                "upvotes": 4823,
                "comments": 342,
                "subreddit": "r/wallstreetbets",
                "url": "#",
                "published_at": (now - timedelta(minutes=45)).isoformat(),
            },
            {
                "id": "wsb-2",
                "platform": "reddit",
                "author": "u/TendieHunter2000",
                "content": "SPY puts. I have my reasons. See you all on the other side. Not financial advice.",
                "upvotes": 2156,
                "comments": 198,
                "subreddit": "r/wallstreetbets",
                "url": "#",
                "published_at": (now - timedelta(minutes=90)).isoformat(),
            },
            {
                "id": "wsb-3",
                "platform": "reddit",
                "author": "u/DiamondHandsOnly",
                "content": "TSLA to $400 EOY. Elon is building the future and y'all are too scared to see it. Loading up on shares.",
                "upvotes": 1789,
                "comments": 567,
                "subreddit": "r/wallstreetbets",
                "url": "#",
                "published_at": (now - timedelta(minutes=120)).isoformat(),
            },
        ],
        "stocks": [
            {
                "id": "stocks-1",
                "platform": "reddit",
                "author": "u/ValueInvestorPro",
                "content": "Energy sector is severely undervalued relative to earnings. XOM and CVX both trading below historical P/E. Adding to positions.",
                "upvotes": 892,
                "comments": 134,
                "subreddit": "r/stocks",
                "url": "#",
                "published_at": (now - timedelta(minutes=30)).isoformat(),
            },
            {
                "id": "stocks-2",
                "platform": "reddit",
                "author": "u/FundamentalsFocus",
                "content": "Healthcare sector analysis: UNH and JNJ both showing strong cash flow metrics. The regulatory risk is overpriced by the market.",
                "upvotes": 654,
                "comments": 89,
                "subreddit": "r/stocks",
                "url": "#",
                "published_at": (now - timedelta(hours=2)).isoformat(),
            },
            {
                "id": "stocks-3",
                "platform": "reddit",
                "author": "u/DividendDave",
                "content": "Building a dividend growth portfolio for retirement. KO, PG, JNJ, and VZ form the core. Reinvesting every quarter.",
                "upvotes": 1205,
                "comments": 210,
                "subreddit": "r/stocks",
                "url": "#",
                "published_at": (now - timedelta(hours=5)).isoformat(),
            },
        ],
        "economics": [
            {
                "id": "econ-1",
                "platform": "reddit",
                "author": "u/MacroMindset",
                "content": "CPI came in at 3.1% YoY. Still above Fed target but trajectory is clearly downward. Rate cuts in H2 2024 seem increasingly likely.",
                "upvotes": 1456,
                "comments": 287,
                "subreddit": "r/economics",
                "url": "#",
                "published_at": (now - timedelta(hours=1)).isoformat(),
            },
            {
                "id": "econ-2",
                "platform": "reddit",
                "author": "u/MonetaryPolicyWatch",
                "content": "The yield curve inversion has persisted for over 18 months now. Historical correlation with recession is strong. Are we in a soft landing or just delayed?",
                "upvotes": 987,
                "comments": 445,
                "subreddit": "r/economics",
                "url": "#",
                "published_at": (now - timedelta(hours=3)).isoformat(),
            },
            {
                "id": "econ-3",
                "platform": "reddit",
                "author": "u/GlobalTradeAnalyst",
                "content": "US trade deficit widened again in Q4. Dollar strength continues to hurt exporters. Watch industrials and materials sectors for continued pressure.",
                "upvotes": 743,
                "comments": 156,
                "subreddit": "r/economics",
                "url": "#",
                "published_at": (now - timedelta(hours=6)).isoformat(),
            },
        ],
    }
    return mock_posts.get(subreddit, mock_posts["stocks"])


async def fetch_reddit_posts(subreddit: str) -> list[dict]:
    global _token_cache

    has_credentials = (
        settings.REDDIT_CLIENT_ID
        and settings.REDDIT_CLIENT_ID != "your_reddit_client_id"
        and settings.REDDIT_CLIENT_SECRET
        and settings.REDDIT_CLIENT_SECRET != "your_reddit_client_secret"
    )

    if not has_credentials:
        logger.warning("[reddit] No credentials configured, returning mock data")
        return _mock_reddit_posts(subreddit)

    try:
        token = await _get_reddit_token()

        async with httpx.AsyncClient() as client:
            response = await client.get(
                f"https://oauth.reddit.com/r/{subreddit}/hot",
                params={"limit": "10"},
                headers={
                    "Authorization": f"Bearer {token}",
                    "User-Agent": settings.REDDIT_USER_AGENT,
                },
                timeout=10.0,
            )

            if response.status_code == 401:
                _token_cache = None
                token = await _get_reddit_token()
                response = await client.get(
                    f"https://oauth.reddit.com/r/{subreddit}/hot",
                    params={"limit": "10"},
                    headers={
                        "Authorization": f"Bearer {token}",
                        "User-Agent": settings.REDDIT_USER_AGENT,
                    },
                    timeout=10.0,
                )
                response.raise_for_status()

            elif not response.is_success:
                response.raise_for_status()

            return _parse_reddit_data(response.json(), subreddit)

    except Exception as e:
        logger.error("[reddit] Fetch error: %s", e)
        return _mock_reddit_posts(subreddit)
