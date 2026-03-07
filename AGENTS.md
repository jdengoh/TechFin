# AGENTS.md — TechFin AI Agent Guide

> Companion to CLAUDE.md. Read CLAUDE.md first for commands, env vars, and project layout. This file covers architecture patterns, API contract, and gotchas that affect how you write code.

---

## Architecture

```
Browser (React SPA :5173)
  └─ SWR hooks → /api/* (Vite proxy)
       └─ FastAPI (:8000)
            ├─ JWT auth via get_current_user dependency
            └─ PostgreSQL (users, holdings tables)
```

---

## Backend Design Patterns

1. **Dependency injection** — All route handlers use `Depends()`:
   - `get_db` → yields async SQLAlchemy session (auto-commits, rolls back on error)
   - `get_current_user` → decodes JWT from `Authorization: Bearer`, returns `User` or raises 401

2. **Route root paths use `""`** — Use `@router.get("")` not `@router.get("/")` with a prefix to avoid 307 trailing-slash redirects.

3. **Try-real/fallback-to-mock** — All external API services (`yahoo_finance.py`, `reddit.py`) attempt the real call and fall back to hardcoded mock data on failure. The UI always renders.

4. **Async everywhere** — All DB ops and HTTP calls use `async/await`. SQLAlchemy 2 async with `psycopg`.

5. **UUID PKs** — All models use UUID v4, generated server-side, serialized as strings.

6. **bcrypt directly** — Password hashing uses the `bcrypt` library directly, not `passlib` (incompatible with newer bcrypt).

7. **greenlet required** — SQLAlchemy async requires `greenlet` in Python deps.

---

## Frontend Design Patterns

1. **SWR for all data** — Every API-backed value is fetched via SWR with `authedFetcher` (injects Bearer token, redirects to `/login` on 401).

2. **Optimistic updates** — `useHoldings` uses SWR's `mutate` with `optimisticData` for instant UI feedback, with rollback on error.

3. **snake_case → camelCase** — Backend returns snake_case JSON. Hook mapper functions (e.g., `mapHolding`) transform to camelCase before the component sees data.

4. **Auth flow** — JWT in `localStorage` via `lib/auth.ts`. `AuthContext` validates on mount via `GET /api/auth/me`.

5. **Combobox uses `cmdk`** — Ticker search uses the `cmdk` Command component, not Radix or base-ui.

---

## API Contract

All endpoints except `/api/tickers` require `Authorization: Bearer <JWT>`.

| Method | Endpoint                 | Auth | Description                        |
|--------|--------------------------|------|------------------------------------|
| POST   | `/api/auth/register`     | No   | Create user, return JWT            |
| POST   | `/api/auth/login`        | No   | Verify credentials, return JWT     |
| GET    | `/api/auth/me`           | Yes  | Validate token, return user        |
| GET    | `/api/holdings`          | Yes  | List user's holdings               |
| POST   | `/api/holdings`          | Yes  | Upsert holding `{ticker, quantity}`|
| DELETE | `/api/holdings/{id}`     | Yes  | Delete holding by UUID             |
| GET    | `/api/tickers?q=`        | No   | Search tickers                     |
| PATCH  | `/api/user/onboarded`    | Yes  | Mark user as onboarded             |
| GET    | `/api/suggestions`       | Yes  | Suggestions (mirrors holdings)     |
| GET    | `/api/yahoo-finance`     | Yes  | News articles (mock fallback)      |
| GET    | `/api/reddit?subreddit=` | Yes  | Reddit posts (mock fallback)       |
| GET    | `/api/social/twitter`    | Yes  | Twitter posts (mock)               |
| GET    | `/api/social/linkedin`   | Yes  | LinkedIn posts (mock)              |
| GET    | `/api/sentiment`         | Yes  | Sentiment data (mock)              |

---

## Conventions & Gotchas

- **No trailing slashes** — Frontend calls `/api/holdings`, not `/api/holdings/`. Backend routes match with `@router.get("")`.
- **Pydantic schemas ≠ ORM models** — `schemas/` = API contracts. `models/` = DB tables. They are intentionally decoupled.
- **Mock fallback is by design** — Services always return data. Don't remove or "fix" the fallback; it's intentional for dev without API keys.
- **`unique(user_id, ticker)`** — Holdings table has a composite unique constraint. The POST endpoint upserts, not inserts.

---

## Common Tasks

### Add a new API endpoint
1. Create/update Pydantic schema in `backend/app/schemas/`
2. Create route in `backend/app/routes/` with `APIRouter(prefix="/api/your-route")`
3. Register in `backend/app/main.py`: `app.include_router(your_route.router)`
4. Use `@router.get("")` for root path

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
