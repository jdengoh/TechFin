# TechFin

A personal finance dashboard that aggregates stock holdings, news, social media sentiment, and investment suggestions.

**Stack:** React 19 + Vite 6 + TypeScript + Tailwind CSS 4 + shadcn/ui (frontend) · FastAPI + SQLAlchemy 2 + PostgreSQL (backend)

---

## Getting Started

### Prerequisites

- Node.js ≥ 18
- Python ≥ 3.12 + [uv](https://docs.astral.sh/uv/)
- PostgreSQL running locally with a database named `techfin`

### Backend

```bash
cd backend
uv sync
cp .env.example .env        # edit DATABASE_URL and API keys as needed
uv run alembic upgrade head
uv run python scripts/seed.py
uv run uvicorn app.main:app --reload --port 8000
```

### Frontend

```bash
cd frontend
npm install
npm run dev                 # dev server on localhost:5173
```

The Vite dev server proxies all `/api/*` requests to the FastAPI backend on `:8000`.

---

## Environment Variables

Copy `backend/.env.example` to `backend/.env` and fill in:

```
DATABASE_URL=postgresql+psycopg://USER:PASSWORD@localhost:5432/techfin
SECRET_KEY=change-me-in-production
RAPIDAPI_KEY=your_rapidapi_key_here
RAPIDAPI_YAHOO_FINANCE_HOST=yahoo-finance15.p.rapidapi.com
REDDIT_CLIENT_ID=your_reddit_client_id
REDDIT_CLIENT_SECRET=your_reddit_client_secret
REDDIT_USER_AGENT=TechFin/1.0 by YourRedditUsername
```

API keys are optional — the app falls back to mock data if they are missing.

---

## Demo User

After seeding, log in with:

- **Username:** `demo`
- **Password:** `password`

---

## Features

- **Dashboard** — Sentiment grid and ticker recommendations based on your holdings
- **Yahoo Finance** — News articles with sentiment verdicts
- **Social Media** — Reddit, Twitter, and LinkedIn feeds for your tickers
- **Settings** — Add and remove stock holdings
