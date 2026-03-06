def get_mock_sentiment() -> dict:
    """Return mock sentiment data matching the existing TypeScript mock."""
    return {
        "hot_sectors": [
            {"name": "Technology", "score": 0.87, "description": "AI and cloud demand driving strong momentum"},
            {"name": "Energy", "score": 0.78, "description": "Oil prices elevated, production cuts holding"},
            {"name": "Financials", "score": 0.72, "description": "Rate cut expectations boosting bank outlook"},
        ],
        "risky_sectors": [
            {"name": "Real Estate", "score": 0.76, "description": "High rates continue to pressure valuations"},
            {"name": "Consumer Discretionary", "score": 0.68, "description": "Spending slowdown as savings rate rises"},
            {"name": "Healthcare", "score": 0.62, "description": "Drug pricing reform legislation risk"},
        ],
        "hot_regions": [
            {"name": "United States", "score": 0.81, "description": "Resilient economy, strong labor market"},
            {"name": "India", "score": 0.79, "description": "Fastest growing major economy, manufacturing boom"},
            {"name": "Japan", "score": 0.71, "description": "Yen weakness boosting exporters and equities"},
        ],
        "risky_regions": [
            {"name": "China", "score": 0.74, "description": "Property sector stress, deflationary pressure"},
            {"name": "Europe", "score": 0.65, "description": "Weak growth, energy cost headwinds persist"},
            {"name": "Emerging Markets", "score": 0.61, "description": "Strong dollar creating capital outflow pressure"},
        ],
    }
