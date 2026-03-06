from pydantic import BaseModel


class SocialPostResponse(BaseModel):
    id: str
    platform: str
    author: str
    content: str
    upvotes: int | None = None
    comments: int | None = None
    subreddit: str | None = None
    url: str
    published_at: str
