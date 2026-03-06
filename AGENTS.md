# AGENTS.md — TechFin AI Agent Onboarding Guide

This document is written for AI agents (e.g. Copilot, Claude Code) working on this codebase. It explains the architecture, design patterns, conventions, and how to run the project.

---

## What Is TechFin?

TechFin is a personal finance dashboard that aggregates stock holdings, news, social media sentiment, and investment suggestions into a single web app. It was migrated from a Next.js monolith to a **React + Vite frontend** and **Python FastAPI backend**.

---

## Repo Layout

```
/
├── frontend/          # React 19 + Vite 6 + TypeScript + Tailwind CSS 4 + shadcn/ui
├── backend/           # Python 3.12 + FastAPI + SQLAlchemy 2 (async) + Alembic + PostgreSQL
├── CLAUDE.md          # Claude Code guidance (build commands, env vars, architecture)
├── AGENTS.md          # This file
├── README.md          # User-facing readme
├── tasks.md           # Migration task tracker (historical)
└── .gitignore
```

---

## Running the Project

### Prerequisites

- **Node.js** ≥ 18 and **npm**
- **Python** ≥ 3.12 and **[uv](https://docs.astral.sh/uv/)** (Python package manager)
- **PostgreSQL** running locally with a database named `techfin`

### Backend

```bash
cd backend
uv sync                                                    # install deps
cp .env.example .env                                       # then edit DATABASE_URL if needed
uv run alembic upgrade head                                # apply DB migrations
uv run python scripts/seed.py                              # seed demo user (demo / password)
uv run uvicorn app.main:app --reload --port 8000           # start API on :8000
```

### Frontend

```bash
cd frontend
npm install            # install deps
npm run dev            # dev server on :5173 (proxies /api/* → :8000)
npm run build          # production build (tsc + vite build)
```

### Dev Networking

The Vite dev server proxies all `/api/*` requests to `http://localhost:8000`. No CORS issues in development. The backend also explicitly allows `http://localhost:5173` via CORS middleware.

### Seed Credentials

- Username: `demo`, Password: `password`

---

## Architecture Overview

```
┌─────────────────────────────────┐
│  Browser (React SPA)            │
│  localhost:5173                  │
│                                 │
│  React Router → Pages           │
│  SWR hooks → /api/* calls       │
│  AuthContext (JWT in localStorage)│
└──────────┬──────────────────────┘
           │  /api/*  (Vite proxy)
           ▼
┌─────────────────────────────────┐
│  FastAPI (Python)               │
│  localhost:8000                  │
│                                 │
│  Routes → Services → DB         │
│  JWT auth via get_current_user  │
│  CORS: localhost:5173           │
└──────────┬──────────────────────┘
           │
           ▼
┌─────────────────────────────────┐
│  PostgreSQL                     │
│  Database: techfin              │
│  Tables: users, holdings        │
│  Managed via Alembic migrations │
└─────────────────────────────────┘
```

---

## Backend (FastAPI)

### Directory Structure

```
backend/
├── app/
│   ├── main.py              # FastAPI app, CORS, router registration
│   ├── auth.py              # JWT creation/validation, bcrypt password hashing, get_current_user dependency
│   ├── config.py            # Pydantic Settings (reads .env): DATABASE_URL, SECRET_KEY, API keys
│   ├── database.py          # Async SQLAlchemy engine, session factory, get_db dependency
│   ├── models/              # SQLAlchemy ORM models
│   │   ├── base.py          # Declarative base with UUID PK, timestamps
│   │   ├── user.py          # User: username, password_hash, has_onboarded
│   │   └── holding.py       # Holding: ticker, quantity, user_id (FK), unique(user_id, ticker)
│   ├── schemas/             # Pydantic request/response schemas (one per domain)
│   ├── routes/              # APIRouter modules (one per domain)
│   │   ├── auth.py          # POST /api/auth/register, POST /api/auth/login, GET /api/auth/me
│   │   ├── holdings.py      # GET/POST /api/holdings, DELETE /api/holdings/{id}
│   │   ├── tickers.py       # GET /api/tickers?q= (no auth required)
│   │   ├── user.py          # PATCH /api/user/onboarded
│   │   ├── suggestions.py   # GET /api/suggestions (mirrors current holdings)
│   │   ├── yahoo_finance.py # GET /api/yahoo-finance (RapidAPI with mock fallback)
│   │   ├── reddit.py        # GET /api/reddit?subreddit= (OAuth with mock fallback)
│   │   ├── social.py        # GET /api/social/twitter, /api/social/linkedin (mock)
│   │   └── sentiment.py     # GET /api/sentiment (mock)
│   ├── services/            # Business logic / external API clients
│   │   ├── yahoo_finance.py # httpx + RapidAPI, falls back to mock data
│   │   ├── reddit.py        # OAuth client_credentials flow, token cache, retry on 401
│   │   ├── twitter.py       # Mock-only
│   │   ├── linkedin.py      # Mock-only
│   │   └── sentiment.py     # Mock-only
│   └── data/
│       └── tickers.py       # In-memory ticker list with search function
├── alembic/                  # Database migration scripts
├── scripts/
│   └── seed.py              # Seeds demo user
├── pyproject.toml           # Python deps (FastAPI, SQLAlchemy, Alembic, bcrypt, python-jose, httpx)
└── alembic.ini              # Alembic config
```

### Key Design Patterns

1. **Dependency injection** — All route handlers declare dependencies via `Depends()`:
   - `get_db` → yields an async SQLAlchemy session (auto-commits on success, rolls back on error)
   - `get_current_user` → decodes JWT from `Authorization: Bearer` header, returns `User` model or raises 401

2. **Route paths** — Routes use empty string `""` (not `"/"`) for root paths to avoid 307 trailing-slash redirects. E.g., `@router.get("")` with `prefix="/api/holdings"` → matches `/api/holdings`.

3. **Try-real/fallback-to-mock** — External API services (Yahoo Finance, Reddit) attempt the real API call and fall back to hardcoded mock data on failure. This ensures the app always returns data even without API keys.

4. **Async everywhere** — All DB operations and HTTP calls use `async/await`. SQLAlchemy 2 async with `psycopg` (async PostgreSQL driver).

5. **UUID primary keys** — All models use UUID v4 PKs generated server-side.

### Database Migrations

```bash
cd backend
uv run alembic revision --autogenerate -m "description"   # generate migration
uv run alembic upgrade head                                # apply migrations
```

### Environment Variables (backend/.env)

```
DATABASE_URL=postgresql+psycopg://USER:PASSWORD@localhost:5432/techfin
SECRET_KEY=change-me-in-production
RAPIDAPI_KEY=your_rapidapi_key_here
RAPIDAPI_YAHOO_FINANCE_HOST=yahoo-finance15.p.rapidapi.com
REDDIT_CLIENT_ID=your_reddit_client_id
REDDIT_CLIENT_SECRET=your_reddit_client_secret
REDDIT_USER_AGENT=TechFin/1.0 by YourRedditUsername
```

---

## Frontend (React + Vite)

### Directory Structure

```
frontend/
├── src/
│   ├── main.tsx                  # Entry point (renders App inside providers)
│   ├── App.tsx                   # React Router config with protected routes
│   ├── globals.css               # Tailwind base + CSS custom properties for themes
│   ├── pages/                    # Top-level route components
│   │   ├── LoginPage.tsx
│   │   ├── RegisterPage.tsx
│   │   ├── DashboardPage.tsx     # Sentiment grid + ticker recommendations
│   │   ├── YahooFinancePage.tsx  # Article list from Yahoo Finance
│   │   ├── SocialMediaPage.tsx   # Tabbed Reddit/Twitter/LinkedIn feeds
│   │   └── SettingsPage.tsx      # Manage holdings (add/delete)
│   ├── components/
│   │   ├── layout/               # AppLayout, TopNav, ProtectedRoute, PageWrapper
│   │   ├── dashboard/            # SentimentGrid, SentimentCard, TickerRecommendations, PortfolioByCategory
│   │   ├── onboarding/           # FirstLoginDialog, TickerSelector
│   │   ├── settings/             # AddTickerForm, HoldingRow, HoldingsList, TickerSearchCombobox
│   │   ├── social-media/         # SocialTabs, RedditFeed, TwitterFeed, LinkedInFeed, PostCard
│   │   ├── yahoo-finance/        # ArticleList, ArticleCard, VerdictBadge
│   │   └── ui/                   # shadcn/ui primitives (button, card, dialog, tabs, etc.)
│   ├── contexts/
│   │   ├── AuthContext.tsx        # AuthProvider: login, register, logout, user state
│   │   └── ThemeContext.tsx       # ThemeProvider: light/dark toggle, localStorage persistence
│   ├── hooks/                    # SWR-based data hooks
│   │   ├── useHoldings.ts        # CRUD with optimistic updates
│   │   ├── useFirstLogin.ts      # Checks if user needs onboarding
│   │   ├── useYahooFinance.ts
│   │   ├── useReddit.ts
│   │   └── useSentiment.ts
│   ├── lib/
│   │   ├── auth.ts               # getToken/setToken/clearToken (localStorage)
│   │   ├── fetcher.ts            # authedFetcher: injects Bearer token, handles 401 redirect
│   │   ├── social-fetcher.ts     # SWR fetcher for social endpoints
│   │   └── utils.ts              # cn() utility (clsx + tailwind-merge)
│   ├── types/                    # TypeScript interfaces (Holding, Article, Ticker, etc.)
│   └── data/
│       └── tickers.ts            # Client-side ticker data (for onboarding selector)
├── index.html                    # Vite HTML entry
├── vite.config.ts                # Vite config: React plugin, path alias, API proxy
├── tsconfig.json                 # TypeScript config with path alias @/* → ./src/*
├── postcss.config.js             # PostCSS + Tailwind
├── components.json               # shadcn/ui configuration
└── package.json                  # Dependencies: React 19, Vite 6, Tailwind 4, SWR, cmdk, radix-ui
```

### Routing

```
/login            → LoginPage          (public)
/register         → RegisterPage       (public)
/                 → ProtectedRoute
  /               → DashboardPage
  /yahoo-finance  → YahooFinancePage
  /social-media   → SocialMediaPage
  /settings       → SettingsPage
```

`ProtectedRoute` checks for a valid user in `AuthContext`; redirects to `/login` if none.

### Key Design Patterns

1. **SWR for data fetching** — All API data is fetched via SWR hooks with `authedFetcher`. This gives automatic caching, revalidation, and stale-while-revalidate behavior.

2. **Optimistic updates** — `useHoldings` uses SWR's `mutate` with `optimisticData` for instant UI feedback on add/delete, with rollback on error.

3. **snake_case → camelCase transforms** — Backend returns snake_case JSON. Hook mapper functions (e.g., `mapHolding`) transform to camelCase for frontend consumption.

4. **Auth flow** — JWT token stored in `localStorage` via `lib/auth.ts`. `AuthContext` validates the token on mount via `GET /api/auth/me`. The `authedFetcher` injects the token into all SWR requests and redirects to `/login` on 401.

5. **Theme** — Custom `ThemeContext` toggles `.dark` class on `document.documentElement` and persists preference in `localStorage`. No external theme library.

6. **Component organization** — Domain-grouped components under `components/` (dashboard, settings, social-media, etc.) with shared UI primitives in `components/ui/` (shadcn).

### Path Alias

`@/*` → `./src/*` — configured in both `tsconfig.json` and `vite.config.ts`.

---

## API Contract Summary

All endpoints (except tickers) require `Authorization: Bearer <JWT>`.

| Method | Endpoint                      | Auth | Description |
|--------|-------------------------------|------|-------------|
| POST   | `/api/auth/register`          | No   | Create user, return JWT |
| POST   | `/api/auth/login`             | No   | Verify credentials, return JWT |
| GET    | `/api/auth/me`                | Yes  | Validate token, return user |
| GET    | `/api/holdings`               | Yes  | List user's holdings |
| POST   | `/api/holdings`               | Yes  | Upsert holding `{ticker, quantity}` |
| DELETE | `/api/holdings/{id}`          | Yes  | Delete holding by UUID |
| GET    | `/api/tickers?q=`             | No   | Search tickers by query |
| PATCH  | `/api/user/onboarded`         | Yes  | Mark user as onboarded |
| GET    | `/api/suggestions`            | Yes  | Suggestions (mirrors holdings) |
| GET    | `/api/yahoo-finance`          | Yes  | News articles (mock fallback) |
| GET    | `/api/reddit?subreddit=`      | Yes  | Reddit posts (mock fallback) |
| GET    | `/api/social/twitter`         | Yes  | Twitter posts (mock) |
| GET    | `/api/social/linkedin`        | Yes  | LinkedIn posts (mock) |
| GET    | `/api/sentiment`              | Yes  | Sentiment data (mock) |

---

## Conventions & Gotchas

1. **No trailing slashes in API calls** — Frontend calls `/api/holdings` not `/api/holdings/`. Backend routes use `@router.get("")` not `@router.get("/")` to match.

2. **Pydantic schemas ≠ ORM models** — `schemas/` defines API contracts (request/response shapes). `models/` defines database tables. They're separate and intentionally decoupled.

3. **Mock fallback pattern** — Services in `backend/app/services/` always return data. If real API calls fail (missing keys, network errors), they return hardcoded mock data. This is by design so the UI always renders.

4. **bcrypt directly (not passlib)** — Password hashing uses `bcrypt` library directly because `passlib` is incompatible with newer bcrypt versions.

5. **greenlet required** — SQLAlchemy async requires `greenlet` in Python deps.

6. **UUID strings** — All IDs are UUID v4, stored as PG `uuid` type, serialized as strings in API responses.

7. **Frontend uses `cmdk` for comboboxes** — The ticker search uses `cmdk` (Command component), not `@base-ui/react`.

---

## Common Development Tasks

### Add a new API endpoint

1. Create/update Pydantic schema in `backend/app/schemas/`
2. Create route in `backend/app/routes/` with `APIRouter(prefix="/api/your-route")`
3. Register router in `backend/app/main.py`: `app.include_router(your_route.router)`
4. Use `@router.get("")` not `@router.get("/")` for root paths

### Add a new frontend page

1. Create page component in `frontend/src/pages/`
2. Add route in `frontend/src/App.tsx` inside the protected `Route` children
3. Add nav link in `frontend/src/components/layout/TopNav.tsx`
4. Create SWR hook in `frontend/src/hooks/` if fetching data

### Add a new database table

1. Create SQLAlchemy model in `backend/app/models/`
2. Import it in `backend/app/models/__init__.py`
3. Run `cd backend && uv run alembic revision --autogenerate -m "add table_name"`
4. Run `uv run alembic upgrade head`

---

## Tech Stack Reference

| Layer      | Technology | Version |
|------------|-----------|---------|
| Frontend   | React     | 19      |
| Bundler    | Vite      | 6       |
| Styling    | Tailwind CSS | 4    |
| Components | shadcn/ui | Latest  |
| Data       | SWR       | 2       |
| Routing    | React Router | 7    |
| Backend    | FastAPI   | Latest  |
| ORM        | SQLAlchemy | 2 (async) |
| Migrations | Alembic   | Latest  |
| Database   | PostgreSQL | 14+    |
| Auth       | JWT (python-jose) + bcrypt | — |
| Python     | 3.12+     | —       |
| Pkg Mgr    | uv (backend), npm (frontend) | — |
