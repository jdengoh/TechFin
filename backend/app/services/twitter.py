from datetime import datetime, timedelta, timezone


def get_mock_twitter_posts() -> list[dict]:
    """Return mock Twitter posts. TODO: Replace with real Twitter API v2 integration."""
    now = datetime.now(timezone.utc)
    return [
        {
            "id": "tw-1",
            "platform": "twitter",
            "author": "@FinanceTweets",
            "content": "$NVDA just broke $800. The AI trade is very much alive. Anyone who sold in January is regretting it. #stocks #AI #NVDA",
            "upvotes": 3421,
            "comments": 287,
            "url": "#",
            "published_at": (now - timedelta(minutes=15)).isoformat(),
        },
        {
            "id": "tw-2",
            "platform": "twitter",
            "author": "@MarketPulse",
            "content": "Energy sector up 2.3% today as oil hits $85/barrel. XOM and CVX leading the charge. The pivot to fossil fuels continues. #energy #oilstocks",
            "upvotes": 1876,
            "comments": 134,
            "url": "#",
            "published_at": (now - timedelta(minutes=45)).isoformat(),
        },
        {
            "id": "tw-3",
            "platform": "twitter",
            "author": "@WallStreetBull",
            "content": "Fed minutes suggest 2-3 cuts in 2024. Banks and REITs about to have a very good year. Loading up on $JPM and $PLD. #Fed #RateCuts",
            "upvotes": 2154,
            "comments": 398,
            "url": "#",
            "published_at": (now - timedelta(minutes=90)).isoformat(),
        },
        {
            "id": "tw-4",
            "platform": "twitter",
            "author": "@TechInvestor",
            "content": "Big Tech earnings recap: $MSFT +18% YoY revenue, $GOOGL ad revenue back, $META profitability machine. Year of efficiency paying off. #BigTech #earnings",
            "upvotes": 4232,
            "comments": 512,
            "url": "#",
            "published_at": (now - timedelta(minutes=180)).isoformat(),
        },
        {
            "id": "tw-5",
            "platform": "twitter",
            "author": "@HealthcareInvest",
            "content": "Weight loss drug market projected to hit $100B by 2030. $LLY and $NVO are printing money. GLP-1 is the trade of the decade. #healthcare #biotech",
            "upvotes": 3876,
            "comments": 654,
            "url": "#",
            "published_at": (now - timedelta(minutes=240)).isoformat(),
        },
    ]
