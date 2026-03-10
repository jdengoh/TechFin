import asyncio
import logging
import time

import httpx

from app.config import settings

logger = logging.getLogger(__name__)

# AlphaVantage name → ETF symbol + market weight
SECTOR_MAP = [
    {"av_name": "Information Technology", "symbol": "XLK",  "name": "Technology",          "market_weight": 29.0},
    {"av_name": "Financials",             "symbol": "XLF",  "name": "Financials",           "market_weight": 13.0},
    {"av_name": "Health Care",            "symbol": "XLV",  "name": "Healthcare",           "market_weight": 12.0},
    {"av_name": "Consumer Discretionary", "symbol": "XLY",  "name": "Consumer Cyclical",    "market_weight": 10.0},
    {"av_name": "Communication Services", "symbol": "XLC",  "name": "Comm. Services",       "market_weight": 8.0},
    {"av_name": "Industrials",            "symbol": "XLI",  "name": "Industrials",          "market_weight": 8.0},
    {"av_name": "Consumer Staples",       "symbol": "XLP",  "name": "Consumer Defensive",   "market_weight": 6.0},
    {"av_name": "Energy",                 "symbol": "XLE",  "name": "Energy",               "market_weight": 4.0},
    {"av_name": "Materials",              "symbol": "XLB",  "name": "Materials",            "market_weight": 2.5},
    {"av_name": "Utilities",             "symbol": "XLU",  "name": "Utilities",            "market_weight": 2.5},
    {"av_name": "Real Estate",            "symbol": "XLRE", "name": "Real Estate",          "market_weight": 2.5},
]

_cache: dict = {"data": None, "ts": 0.0}
_CACHE_TTL = 15 * 60  # 15 minutes


async def _fetch_alphavantage_sectors(api_key: str) -> dict[str, dict]:
    """Returns mapping of av_name -> {day_return, ytd_return}."""
    async with httpx.AsyncClient() as client:
        resp = await client.get(
            "https://www.alphavantage.co/query",
            params={"function": "SECTOR", "apikey": api_key},
            timeout=15.0,
        )
        resp.raise_for_status()
        data = resp.json()

    if "Information" in data or "Note" in data:
        logger.warning("[sectors] AlphaVantage rate limited: %s", data.get("Information") or data.get("Note"))
        return {}

    realtime = data.get("Rank A: Real-Time Performance", {})
    ytd = data.get("Rank F: Year-to-Date Performance", {})

    result = {}
    for entry in SECTOR_MAP:
        av = entry["av_name"]
        def _pct(val: str) -> float:
            try:
                return float(val.replace("%", ""))
            except Exception:
                return 0.0
        result[av] = {
            "day_return": _pct(realtime.get(av, "0%")),
            "ytd_return": _pct(ytd.get(av, "0%")),
        }
    return result


async def _fetch_etf_price(client: httpx.AsyncClient, symbol: str) -> float:
    url = f"https://query1.finance.yahoo.com/v8/finance/chart/{symbol}"
    try:
        resp = await client.get(
            url,
            params={"interval": "1d", "range": "1d"},
            headers={"User-Agent": "Mozilla/5.0"},
            timeout=8.0,
        )
        resp.raise_for_status()
        meta = resp.json()["chart"]["result"][0]["meta"]
        return round(meta.get("regularMarketPrice", 0.0), 2)
    except Exception as e:
        logger.debug("[sectors] Price fetch failed for %s: %s", symbol, e)
        return 0.0


async def _fetch_yahoo_sector_prices() -> dict[str, float]:
    symbols = [s["symbol"] for s in SECTOR_MAP]
    async with httpx.AsyncClient() as client:
        prices = await asyncio.gather(
            *[_fetch_etf_price(client, sym) for sym in symbols],
            return_exceptions=True,
        )
    return {
        sym: (p if isinstance(p, float) else 0.0)
        for sym, p in zip(symbols, prices)
    }


async def fetch_sector_data() -> list[dict]:
    now = time.monotonic()
    if _cache["data"] and now - _cache["ts"] < _CACHE_TTL:
        return _cache["data"]

    api_key = settings.ALPHAVANTAGE_API_KEY or "demo"
    av_data: dict[str, dict] = {}
    prices: dict[str, float] = {}

    try:
        av_data = await _fetch_alphavantage_sectors(api_key)
    except Exception as e:
        logger.warning("[sectors] AlphaVantage SECTOR failed: %s", e)

    try:
        prices = await _fetch_yahoo_sector_prices()
    except Exception as e:
        logger.warning("[sectors] Yahoo price fetch failed: %s", e)

    if not av_data and not prices:
        logger.error("[sectors] All data sources failed, returning empty list")
        return []

    sectors = []
    for entry in SECTOR_MAP:
        av = entry["av_name"]
        sym = entry["symbol"]
        av_entry = av_data.get(av, {})
        sectors.append({
            "symbol": sym,
            "name": entry["name"],
            "day_return": av_entry.get("day_return", 0.0),
            "ytd_return": av_entry.get("ytd_return", 0.0),
            "market_weight": entry["market_weight"],
            "price": prices.get(sym, 0.0),
        })

    _cache["data"] = sectors
    _cache["ts"] = now
    return sectors
