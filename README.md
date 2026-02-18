# meal_planner

## Local Postgres (Docker)

Start the database:

```bash
docker compose up -d
# or: npm run db:up


## Database & Migrations (Prisma)

### Prereqs
- A running Postgres instance
- `DATABASE_URL` set in `apps/api/.env`

Example:
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/meal_planner?schema=public"

### Run migrations locally (creates/applies)
npm run db:migrate

### Apply existing migrations (prod-style)
npm run db:deploy

### Reset DB (drops + re-applies migrations)
npm run db:reset

### Prisma Studio
npm run db:studio
```

## Environment Variables

This repo uses per-app environment files.

### Backend (apps/api)

1. Copy:
   - `apps/api/.env.example` → `apps/api/.env`

2. Required variables:
   - `DATABASE_URL` (Postgres connection string)
   - `PORT` (API port)

Example `DATABASE_URL`:
```txt
postgresql://postgres:postgres@localhost:5432/meal_planner?schema=public