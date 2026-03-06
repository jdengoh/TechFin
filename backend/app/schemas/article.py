from pydantic import BaseModel


class ArticleResponse(BaseModel):
    id: str
    title: str
    summary: str
    source: str
    published_at: str
    url: str
    verdict: str | None = None
    thumbnail: str | None = None
