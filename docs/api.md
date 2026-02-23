# API

This document defines the HTTP interface exposed by the backend.

## Base URL

Development:
http://localhost:

Production:
(To be defined)

## Conventions

- JSON request and response bodies
- Standard HTTP status codes
- Consistent error response shape

### Error Format (Proposed)

```json
{
  "error": {
    "message": "Something went wrong",
    "code": "ERROR_CODE"
  }
}

Endpoints

GET /health

Checks if the service is running.

Response:
{
  "ok": true
}

Future Endpoints (Planned)

Recipes
	•	GET /recipes
	•	POST /recipes
	•	GET /recipes/:id
	•	PUT /recipes/:id
	•	DELETE /recipes/:id

Meal Plans
	•	GET /meal-plans
	•	POST /meal-plans

Grocery List
	•	GET /grocery-list

Authentication

Authentication endpoints are implemented.

See `/docs/auth.md` for:
- `POST /auth/register`
- `POST /auth/login`
- `GET /auth/me`

---

# `docs/web.md`

```md
# Web Application

This document describes the frontend application.

## Tech Stack

- React
- Vite
- TypeScript
- (Future: Tailwind or CSS Modules)

## Responsibilities

The web app is responsible for:

- Rendering UI
- Managing local component state
- Calling backend API endpoints
- Handling loading and error states
- Managing authentication state (future)

## Project Structure (Example)

apps/web/
├── src/
│   ├── components/
│   ├── pages/
│   ├── api/
│   ├── hooks/
│   └── main.tsx

## API Communication

All API calls should be centralized in an `api/` layer to:

- Keep components clean
- Standardize error handling
- Simplify future refactors

Example pattern:

```ts
export async function getRecipes() {
  const res = await fetch("/api/recipes");
  if (!res.ok) throw new Error("Failed to fetch recipes");
  return res.json();
}

Future Improvements
	•	Global state management (if needed)
	•	Form validation abstraction
	•	Route protection
	•	Optimistic UI updates
