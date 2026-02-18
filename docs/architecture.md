# Architecture

This document describes the overall system structure and how components interact.

## Monorepo Structure

meal_planner/
├── apps/
│   ├── api/        # Backend API (Node + TypeScript + Prisma)
│   └── web/        # Frontend (React + Vite + TypeScript)
├── docs/
└── package.json

## High-Level Overview

The system follows a standard client-server architecture:

- **Web App (React + Vite)**  
  Handles UI, user interaction, and API calls.

- **API (Node + Express + Prisma)**  
  Handles:
  - Request validation
  - Business logic
  - Database access
  - Authentication (future)

- **Database (PostgreSQL)**  
  Stores recipes, meal plans, users, and grocery lists.

## Data Flow

1. User interacts with Web UI
2. Web sends HTTP request to API
3. API validates request
4. API interacts with DB via Prisma
5. API returns JSON response
6. Web updates UI

## Design Decisions

- **REST over GraphQL** for simplicity and clarity
- **Prisma ORM** for type safety and migrations
- **Monorepo** to coordinate frontend and backend changes
- **Environment-based config** for dev/prod separation

This document should evolve as the architecture grows.