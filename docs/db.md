# Database

This document describes the database layer.

## Technology

- PostgreSQL
- Prisma ORM

## Schema Source of Truth

The schema is defined in: apps/api/prisma/schema.prisma

## Migration Workflow

Typical development flow:

1. Update `schema.prisma`
2. Run migration command
3. Regenerate Prisma client
4. Update API logic as needed

(Exact commands depend on the configured scripts.)

## Planned Core Models

### User (Optional for MVP)

- id
- email
- passwordHash
- createdAt

### Recipe

- id
- title
- ingredients
- instructions
- createdAt

### MealPlan

- id
- weekStartDate
- recipes[]
- createdAt

### GroceryItem

- id
- name
- quantity
- linkedRecipeId (optional)

## Design Principles

- Keep schema simple initially
- Normalize only when needed
- Avoid premature optimization
- Use indices when performance requires it

This document should reflect the actual schema as it evolves.

## Seeding Demo Data

Currently includes a seed script scaffold.

Run:

npm run db:seed

Future:
- Will insert at least 3 demo recipes
- Used for local development + portfolio screenshots