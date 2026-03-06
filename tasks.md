# TechFin Refactor — Remaining Tasks

## Status: Phases 1–8 Complete, Phase 9 In Progress

### What's Done
- All backend code created (FastAPI, SQLAlchemy models, routes, services, schemas, auth)
- All frontend code created (React+Vite, pages, components, hooks, auth, theme)
- Database created (`techfin` on local Postgres), migrations applied, demo user seeded
- Backend starts and serves requests on `:8000`
- Login endpoint works (`POST /api/auth/login` returns JWT)
- Auth/me endpoint works (`GET /api/auth/me` with Bearer token)
- Frontend builds clean (`npm run build` passes, TypeScript clean)
- Replaced `passlib[bcrypt]` with `bcrypt` directly (passlib incompatible with newer bcrypt)
- Added `greenlet` to backend deps (required by SQLAlchemy async)

### Fixes Applied During Setup
1. `.env` updated: `DATABASE_URL=postgresql+psycopg://tuandingren@localhost:5432/techfin`
2. `app/auth.py` — switched from `passlib.context.CryptContext` to `bcrypt` directly
3. `pyproject.toml` — replaced `passlib[bcrypt]` with `bcrypt`, added `greenlet`

### Remaining: Phase 9 — Integration Testing

#### Endpoints to verify (backend at `:8000`)
- [ ] `POST /api/holdings` — add holding (body: `{"ticker":"AAPL","shares":10,"category":"tech"}`)
- [ ] `GET /api/holdings` — list holdings
- [ ] `DELETE /api/holdings/{id}` — delete holding
- [ ] `GET /api/tickers?q=app` — ticker search (no auth required)
- [ ] `PATCH /api/user/onboarded` — mark user onboarded
- [ ] `GET /api/suggestions` — suggestions stub
- [ ] `GET /api/yahoo-finance` — articles (mock fallback)
- [ ] `GET /api/reddit?subreddit=stocks` — reddit posts (mock fallback)
- [ ] `GET /api/social/twitter` — mock twitter
- [ ] `GET /api/social/linkedin` — mock linkedin
- [ ] `GET /api/sentiment` — mock sentiment
- [ ] `POST /api/auth/register` — register new user

#### Frontend integration (Vite dev at `:5173`, proxies to `:8000`)
- [ ] Start both servers and verify proxy works
- [ ] Login page: login with demo/password
- [ ] Register page: create new user
- [ ] Onboarding: FirstLoginDialog appears for new user, add holdings, dismisses
- [ ] Dashboard: sentiment grid + ticker recommendations render
- [ ] Yahoo Finance page: articles load
- [ ] Social Media page: Reddit/Twitter/LinkedIn tabs render
- [ ] Settings page: add/delete holdings
- [ ] Theme toggle: light/dark works, persists across refresh
- [ ] Auth: token persists across refresh, 401 redirects to login

### Remaining: Phase 9 — Cleanup (after verification)
- [ ] Remove old Next.js files: `src/`, `prisma/`, `prisma.config.ts`, `next.config.*`
- [ ] Remove old root config: root `package.json`, root `tsconfig.json`, `node_modules/`, `.next/`
- [ ] Update root `.gitignore` (remove Next.js-specific entries)
- [ ] Update memory files in `.claude/` to reflect new architecture

### How to Start

```bash
# Backend
cd backend
uv run uvicorn app.main:app --reload --port 8000

# Frontend (separate terminal)
cd frontend
npm run dev
```

### Credentials
- Demo user: username=`demo`, password=`password`
