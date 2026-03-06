from fastapi import APIRouter, Query

from app.data.tickers import search_tickers
from app.schemas.ticker import TickerResponse

router = APIRouter(prefix="/api/tickers", tags=["tickers"])


@router.get("", response_model=list[TickerResponse])
async def get_tickers(q: str = Query("", description="Search query")):
    results = search_tickers(q)
    return [TickerResponse(symbol=t["symbol"], name=t["name"], sector=t.get("sector")) for t in results]
