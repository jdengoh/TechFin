# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repo Layout

Monorepo with two main directories:
- **`/frontend`** — React 19 + Vite 6 + TypeScript + Tailwind CSS 4 + shadcn/ui + SWR
- **`/backend`** — Python 3.12 + FastAPI + SQLAlchemy 2 (async) + Alembic + PostgreSQL

## Commands

### Frontend
```bash
cd frontend
npm install           # install dependencies
npm run dev           # start dev server on localhost:5173
npm run build         # production build (tsc + vite build)
```

### Backend
```bash
cd backend
uv sync                                        # install Python deps
cp .env.example .env                           # configure env vars
uv run alembic upgrade head                    # run DB migrations
uv run python scripts/seed.py                  # seed demo user (username=demo, password=password)
uv run uvicorn app.main:app --reload --port 8000  # start dev server on :8000
```

### Database
```bash
cd backend
uv run alembic revision --autogenerate -m "description"  # create migration
uv run alembic upgrade head                               # apply migrations
```

## Architecture

### Dev Networking
Vite proxies `/api/*` requests to FastAPI on `http://localhost:8000`.

### Auth
- Real JWT auth: username/password login, token stored in localStorage, sent as Bearer
- `POST /api/auth/register` — create user, return JWT
- `POST /api/auth/login` — verify credentials, return JWT
- `GET /api/auth/me` — validate token, return user
- All protected routes require Bearer token via `get_current_user` dependency

### Backend (FastAPI)

#### Database (SQLAlchemy 2 + Alembic)
- `app/database.py` — async engine, `async_sessionmaker`, `get_db` dependency
- `app/models/` — `User` (username, password_hash, has_onboarded) + `Holding` (ticker, quantity, user_id)
- Alembic configured for async migrations with psycopg

#### API Routes (`app/routes/`)
- `auth.py` — POST register, POST login, GET me
- `holdings.py` — GET list, POST upsert, DELETE by id (all auth-protected)
- `tickers.py` — GET `?q=` search (auth-protected)
- `user.py` — PATCH onboarded (auth-protected)
- `suggestions.py` — GET stub: mirrors holdings (auth-protected)
- `yahoo_finance.py` — GET articles via RapidAPI, mock fallback (auth-protected)
- `reddit.py` — GET `?subreddit=`, OAuth token cache, mock fallback (auth-protected)
- `social.py` — GET twitter/linkedin mock data (auth-protected)
- `sentiment.py` — GET mock sentiment data (auth-protected)

#### External API Services (`app/services/`)
All follow try-real-API / fallback-to-mock pattern:
- `yahoo_finance.py` — httpx + RapidAPI
- `reddit.py` — OAuth client_credentials, token cache, retry on 401
- `twitter.py`, `linkedin.py` — mock-only
- `sentiment.py` — mock-only

### Frontend (React + Vite)

#### Routing
```
/login            → LoginPage
/register         → RegisterPage
/ (protected)     → AppLayout (TopNav + FirstLoginDialog + Outlet)
  /               → DashboardPage
  /yahoo-finance  → YahooFinancePage
  /social-media   → SocialMediaPage
  /settings       → SettingsPage
```

#### Auth
- `src/contexts/AuthContext.tsx` — AuthProvider with login/register/logout
- `src/lib/auth.ts` — getToken/setToken/clearToken (localStorage)
- `src/lib/fetcher.ts` — authedFetcher for SWR (injects Bearer, redirects on 401)
- `src/components/layout/ProtectedRoute.tsx` — redirects to /login if no user

#### Theme
- Custom `ThemeContext` replacing next-themes (~30 LOC)
- Toggles `.dark` class on document root, persists to localStorage

#### Data Fetching
SWR hooks in `src/hooks/` with snake_case → camelCase transforms:
- `useHoldings` — optimistic add/delete
- `useFirstLogin` — checks `/api/auth/me`, manages onboarding
- `useYahooFinance`, `useReddit`, `useSentiment`

#### Path Alias
`@/*` → `./src/*` (configured in `tsconfig.json` and `vite.config.ts`)

## Environment Variables

### Backend (.env)
```
DATABASE_URL=postgresql+psycopg://USER:PASSWORD@localhost:5432/techfin
SECRET_KEY=change-me-in-production
RAPIDAPI_KEY=your_rapidapi_key_here
RAPIDAPI_YAHOO_FINANCE_HOST=yahoo-finance15.p.rapidapi.com
REDDIT_CLIENT_ID=your_reddit_client_id
REDDIT_CLIENT_SECRET=your_reddit_client_secret
REDDIT_USER_AGENT=TechFin/1.0 by YourRedditUsername
```

## Seed User
- Username: `demo`, Password: `password`
- Created by `scripts/seed.py`
