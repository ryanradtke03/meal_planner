# Auth Endpoints

This document describes the authentication endpoints currently implemented in `apps/api`.

## Base Route

- All auth routes are mounted at: `/auth`
- Local dev base URL is typically: `http://localhost:3001`

## Auth Model

- Login issues a JWT and stores it in an HTTP-only cookie named `token`.
- Protected routes read the JWT from `req.cookies.token`.
- `req.user` is populated from JWT claims (`sub` => user id, `email` => user email).

Cookie set on login:

- `name`: `token`
- `httpOnly`: `true`
- `secure`: `true` only in production (`NODE_ENV=production`), otherwise `false`
- `sameSite`: `lax`
- `path`: `/`
- `maxAge`: not set (session cookie)

## Response Error Format

Non-2xx responses use:

```json
{
  "error": "message"
}
```

Notes:

- Invalid JSON body returns `400` with `{"error":"Invalid JSON body"}`.
- Errors without an explicit `status` become `500` with `{"error":"Internal server error"}`.

## Endpoints

### 1) Register

- **Method/Path**: `POST /auth/register`
- **Auth required**: No

Request body:

```json
{
  "email": "user@example.com",
  "password": "min-8-characters"
}
```

Validation:

- `email`: must be valid email
- `password`: minimum length `8`

Success response:

- **201 Created**

```json
{
  "user": {
    "id": "uuid-or-cuid",
    "email": "user@example.com",
    "createdAt": "2026-02-23T00:00:00.000Z"
  }
}
```

Current failure behaviors:

- If user already exists, service throws without `status`, so response is currently:
  - **500 Internal Server Error**
  - `{"error":"Internal server error"}`
- If request body fails Zod validation, controller forwards Zod error directly, so response is currently:
  - **500 Internal Server Error**
  - `{"error":"Internal server error"}`

### 2) Login

- **Method/Path**: `POST /auth/login`
- **Auth required**: No

Request body:

```json
{
  "email": "user@example.com",
  "password": "plaintext-password"
}
```

Validation:

- `email`: must be valid email
- `password`: minimum length `1`

Behavior:

- Email is normalized as `trim().toLowerCase()` before DB lookup.
- On success, sets `token` cookie and returns public user fields.

Success response:

- **200 OK**

```json
{
  "user": {
    "id": "uuid-or-cuid",
    "email": "user@example.com"
  }
}
```

Failure responses:

- Invalid body (Zod) => **400 Bad Request**
  - `{"error":"Invalid request body"}`
- Wrong email/password => **401 Unauthorized**
  - `{"error":"Invalid email or password"}`

### 3) Current User

- **Method/Path**: `GET /auth/me`
- **Auth required**: Yes (`token` cookie)

Success response:

- **200 OK**

```json
{
  "user": {
    "id": "uuid-or-cuid",
    "email": "user@example.com"
  }
}
```

Failure responses:

- Missing/invalid/expired token => **401 Unauthorized**
  - `{"error":"Not authenticated"}`

## Client Integration Notes

- Browser clients must send cookies on cross-origin requests (`credentials: "include"`).
- Server-side callers should preserve and send the `token` cookie between requests.
- JWT settings come from:
  - `JWT_SECRET` (required)
  - `JWT_EXPIRES_IN` (default: `7d`)
