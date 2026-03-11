# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repo Layout

Monorepo with two main directories:
- **`/frontend`** — React 19 + Vite 6 + TypeScript + Tailwind CSS 4 + shadcn/ui + SWR
- **`/backend`** — Python 3.12 + FastAPI + SQLAlchemy 2 (async) + Alembic + PostgreSQL

## Commands

```bash
make dev              # start both frontend + backend (via start.sh)
make frontend         # frontend only
make backend          # backend only
```

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

### Infrastructure (Docker)
```bash
docker compose -f docker-compose.infra.yaml up -d   # start PostgreSQL + Neo4j
```
- PostgreSQL: `localhost:5432`
- Neo4j: `localhost:7474` (HTTP), `localhost:7687` (Bolt)

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
- `app/models/` — `User` (username, password_hash, has_onboarded) + `Holding` (ticker, quantity, user_id) + `ChatSession`/`ChatMessage` (chat history)
- Alembic configured for async migrations with psycopg

#### AI Agent (`app/ai/`)
- `app/ai/graph.py` — LangGraph `compiled_graph` powering the multi-agent chatbot
- Chat sessions and messages persisted to PostgreSQL via `app/models/chat.py`
- Responses streamed to the frontend via `StreamingResponse`

#### API Routes (`app/routes/`)
- `auth.py` — POST register, POST login, GET me
- `holdings.py` — GET list, POST upsert, DELETE by id (all auth-protected)
- `tickers.py` — GET `?q=` search (auth-protected)
- `user.py` — PATCH onboarded (auth-protected)
- `suggestions.py` — GET stub: mirrors holdings (auth-protected)
- `yahoo_finance.py` — GET articles via RapidAPI, mock fallback; triggers background graph ingest
- `reddit.py` — GET `?subreddit=`, OAuth token cache, mock fallback; triggers background graph ingest
- `social.py` — GET twitter/linkedin mock data (auth-protected)
- `sentiment.py` — GET mock sentiment data (auth-protected)
- `sectors.py` — GET sector data (auth-protected)
- `market_movers.py` — GET market movers data (auth-protected)
- `graph.py` — 7 graph query endpoints (see Graph API below)
- `ai_agents.py` — multi-agent chatbot: chat sessions CRUD + streaming responses via LangGraph (`/api/ai/`)

#### External API Services (`app/services/`)
All follow try-real-API / fallback-to-mock pattern:
- `yahoo_finance.py` — httpx + RapidAPI
- `reddit.py` — OAuth client_credentials, token cache, retry on 401
- `twitter.py`, `linkedin.py`, `sentiment.py` — mock-only
- `sectors.py`, `market_movers.py` — external integrations
- `llm_extraction.py` — OpenAI gpt-4o-mini entity extraction from articles
- `llm_analysis.py` — OpenAI gpt-4o-mini analysis for events/themes; in-memory TTL cache (1 hour); returns `null` if no API key
- `graph_ingestion.py` — MERGE nodes/relationships in Neo4j; `upsert_raw_article()` to PG staging
- `graph_queries.py` — Cypher query functions backing the graph API
- `news_fetcher.py` — Yahoo RSS adapter for APScheduler hourly job
- `scheduler.py` — APScheduler `AsyncIOScheduler`, runs hourly Yahoo RSS → graph pipeline

#### Graph DB (Neo4j)
- `app/database_graph.py` — async Neo4j driver, `create_constraints()`, `get_driver()`
- Node labels: `MacroTheme`, `Event`, `NewsArticle`, `SocialPost`, `Sector`, `Industry`, `Company`, `Indicator`, `Geography`, `Institution`, `Person`
- `app/data/yahoo_industries.py` — 146 Yahoo Finance industries + 11 sectors (canonical reference)

#### Graph API Endpoints (`/api/graph/`)
- `GET /news/company/{ticker}` — news linked to a company
- `GET /news/sector/{sector}` — news for a sector
- `GET /news/theme/{theme_name}` — news by macro theme
- `GET /news/linked/{news_id}` — related news via shared entities
- `GET /events/recent` — recent events
- `GET /themes/active` — active macro themes
- `GET /heatmap` — sector/theme heatmap data

#### Background Ingestion Flow
When `yahoo_finance.py` or `reddit.py` routes are hit, a `BackgroundTask` runs:
1. `upsert_raw_article()` → PostgreSQL `raw_news_articles` staging table (SHA256 dedup)
2. `ingest_article_to_graph()` → LLM extraction → Neo4j MERGE
APScheduler also runs the same pipeline hourly via `fetch_yahoo_rss()`, recording results in `ingestion_jobs`.

### Frontend (React + Vite)

#### Routing
```
/login              → LoginPage
/register           → RegisterPage
/ (protected)       → AppLayout (TopNav + FirstLoginDialog + Outlet)
  /                 → EventsPage
  /dashboard        → DashboardPage
  /yahoo-finance    → YahooFinancePage
  /settings         → SettingsPage
  /event/:eventId   → EventDetailPage
  /theme/:themeName → ThemeDetailPage
  /entity/:entityType/:entityName → EntityDetailPage
  /chat             → ChatPage (multi-agent chatbot with session management)
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
- `useYahooFinance`, `useReddit`, `useSentiment`, `useSectors`, `useMarketMovers`
- `useGraphEvents`, `useGraphThemes`, `useGraphHeatmap` — graph API hooks for EventsPage
- `useGraphNews`, `useGraphNewsByTheme` — news fetching by company/theme
- `useEventArticles`, `useEventEntities`, `useEventAnalysis` — EventDetailPage data
- `useThemeEntities`, `useThemeAnalysis` — ThemeDetailPage data

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
ALPHAVANTAGE_API_KEY=your_alphavantage_key_here
NEO4J_URI=bolt://localhost:7687
NEO4J_USERNAME=neo4j
NEO4J_PASSWORD=your_neo4j_password
OPENAI_API_KEY=your_openai_key_here
OPENAI_MODEL=gpt-4o-mini
```

### Graceful degradation
- No `NEO4J_PASSWORD` → constraints skipped, graph routes return 503
- No `OPENAI_API_KEY` → LLM returns empty extraction (articles still saved to PG)
- No `RAPIDAPI`/`REDDIT` creds → mock data returned (background ingest still runs)

## Seed User
- Username: `demo`, Password: `password`
- Created by `scripts/seed.py`

## Design Patterns & Conventions

- **Route root paths use `""`** — `@router.get("")` not `@router.get("/")` (avoids 307 redirects)
- **Pydantic schemas ≠ ORM models** — `app/schemas/` = API contracts; `app/models/` = DB tables
- **UUID PKs** — all models use UUID v4, server-generated, serialized as strings
- **bcrypt directly** — uses `bcrypt` library, not `passlib`
- **greenlet required** — SQLAlchemy async needs `greenlet` in deps
- **Mock fallback is intentional** — never remove; UI must always render without real API keys
- **Dependency injection** — all route handlers use `Depends(get_db)` and `Depends(get_current_user)`; `get_db` yields an async session that auto-commits and rolls back on error
- **snake_case → camelCase** — backend returns snake_case JSON; SWR hook mapper functions transform to camelCase before components see data
- **Holdings upsert** — `unique(user_id, ticker)` constraint; POST `/api/holdings` upserts, not inserts
- **Optimistic updates** — `useHoldings` uses SWR `mutate` with `optimisticData` for instant UI feedback with rollback on error

## Common Tasks

### Add a new API endpoint
1. Create/update Pydantic schema in `backend/app/schemas/`
2. Create route in `backend/app/routes/` with `APIRouter(prefix="/api/your-route")`
3. Register in `backend/app/main.py`: `app.include_router(your_route.router)`
4. Use `@router.get("")` for root path (not `"/"`)

### Add a new frontend page
1. Create page in `frontend/src/pages/`
2. Add route in `frontend/src/App.tsx` inside the protected `Route` children
3. Add nav link in `frontend/src/components/layout/TopNav.tsx`
4. Create SWR hook in `frontend/src/hooks/` if fetching data

### Add a new database table
1. Create SQLAlchemy model in `backend/app/models/`
2. Import in `backend/app/models/__init__.py`
3. `uv run alembic revision --autogenerate -m "add table_name"`
4. `uv run alembic upgrade head`
