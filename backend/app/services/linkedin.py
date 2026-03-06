from datetime import datetime, timedelta, timezone


def get_mock_linkedin_posts() -> list[dict]:
    """Return mock LinkedIn posts. TODO: Replace with real LinkedIn API integration."""
    now = datetime.now(timezone.utc)
    return [
        {
            "id": "li-1",
            "platform": "linkedin",
            "author": "Sarah Chen, CFA",
            "content": "The semiconductor cycle is turning. After 18 months of inventory correction, we're seeing early signs of demand recovery across datacenters and automotive. Our team is overweight $NVDA, $AMD, and $AMAT heading into Q2. #semiconductors #investing",
            "upvotes": 892,
            "comments": 67,
            "url": "#",
            "published_at": (now - timedelta(hours=2)).isoformat(),
        },
        {
            "id": "li-2",
            "platform": "linkedin",
            "author": "James Rodriguez, Portfolio Manager",
            "content": "Excited to share our 2024 market outlook. Three key themes: (1) AI infrastructure buildout accelerates, (2) Energy transition drives materials demand, (3) Healthcare innovation cycle picks up post-pandemic. Full report in comments.",
            "upvotes": 1234,
            "comments": 145,
            "url": "#",
            "published_at": (now - timedelta(hours=5)).isoformat(),
        },
        {
            "id": "li-3",
            "platform": "linkedin",
            "author": "Priya Sharma, Investment Strategist",
            "content": "Contrary view: The consensus is too bullish on rate cuts. Sticky services inflation means the Fed will keep rates higher for longer than the market expects. Favor quality over growth, dividend growers over high-multiple names. #investing #rates",
            "upvotes": 567,
            "comments": 89,
            "url": "#",
            "published_at": (now - timedelta(hours=8)).isoformat(),
        },
        {
            "id": "li-4",
            "platform": "linkedin",
            "author": "Michael Thompson, Director at BlackRock",
            "content": "ESG investing is evolving, not dying. The conversation has shifted from ideology to pure financial materiality. Companies with strong governance and climate risk management are showing better long-term risk-adjusted returns. Data doesn't lie.",
            "upvotes": 2341,
            "comments": 312,
            "url": "#",
            "published_at": (now - timedelta(hours=12)).isoformat(),
        },
        {
            "id": "li-5",
            "platform": "linkedin",
            "author": "Lisa Park, Equity Research Analyst",
            "content": "Just published my deep dive on the cloud computing market. AWS, Azure, and GCP are all showing re-acceleration after a rough 2023. Enterprise cloud migration is structurally inevitable. Upgrading $MSFT and $AMZN to Buy. #cloud #tech",
            "upvotes": 1876,
            "comments": 234,
            "url": "#",
            "published_at": (now - timedelta(hours=18)).isoformat(),
        },
    ]
