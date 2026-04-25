# LexisGraph

LexisGraph is a full-stack compliance intelligence platform that helps teams upload policies/documents, analyze them, surface compliance gaps, and interact with an AI assistant for guided remediation.

This repository contains the **complete project** (single root README), including:
- Next.js frontend (App Router + Tailwind + shadcn/ui)
- FastAPI backend
- MongoDB persistence
- Document processing pipeline (with optional Neo4j/spaCy extensions)

## Tech Stack

### Frontend
- Next.js 16 (App Router, Turbopack)
- React 19
- Tailwind CSS 4
- shadcn/ui-style component system
- Clerk (auth integration in codebase)

### Backend
- FastAPI
- Uvicorn
- MongoDB (PyMongo)
- APScheduler (periodic ingestion jobs)
- pdfplumber / python-docx / preprocessing utilities
- Optional Neo4j + spaCy workflows

## Monorepo Structure

```text
LexisGraph/
├─ src/
│  ├─ app/                         # Next.js app routes (App Router)
│  │  ├─ page.js                   # Landing page route
│  │  ├─ dashboard/page.js
│  │  ├─ documents/page.js
│  │  ├─ policies/page.js
│  │  ├─ analysis/page.js
│  │  ├─ alerts/page.js
│  │  ├─ ai-assistant/page.js
│  │  ├─ team/page.js
│  │  ├─ onboarding/page.js
│  │  └─ ...other pages
│  ├─ components/
│  │  ├─ dashboard/                # Dashboard widgets (KPIs, pipeline, chat, docs)
│  │  ├─ pages/                    # Page-level UI containers
│  │  ├─ ui/                       # Shared UI components
│  │  └─ ...feature components
│  ├─ lib/
│  │  ├─ api.js                    # Frontend API client + safe wrappers + fallback logic
│  │  ├─ mock-data.js              # Demo/fallback data
│  │  └─ config.js
│  └─ hooks/
├─ backend/
│  ├─ app/
│  │  ├─ main.py                   # FastAPI app entrypoint
│  │  ├─ routes/                   # API route modules
│  │  ├─ db/                       # MongoDB access layer
│  │  ├─ services/                 # Processing/services
│  │  ├─ utils/                    # File/hash/helpers
│  │  └─ auth/
│  ├─ data/                        # Raw/processed local document artifacts
│  └─ requirements.txt
├─ lib/
│  └─ api.ts                       # Shared API URL constant
├─ package.json
├─ tsconfig.json
└─ README.md
```

## Key Product Flows

- Authentication + onboarding
- Organization setup and team visibility
- PDF upload and processing pipeline
- Dashboard summary + alerts
- Analysis pipeline states (Parsed, Graph, Gap Analysis)
- AI assistant chat with fallback responses
- Demo mode fallbacks when backend endpoints fail/unavailable

## API Overview

Frontend calls use base URL:
- `http://localhost:8000`

API prefix:
- `/api/v1`

Main endpoints used by UI:
- `GET /api/v1/dashboard/summary`
- `GET /api/v1/documents`
- `POST /api/v1/upload`
- `GET /api/v1/policies`
- `POST /api/v1/policies/upload`
- `GET /api/v1/analysis/{doc_id}`
- `GET /api/v1/alerts`
- `POST /api/v1/ai/chat`
- `GET /api/v1/org/team`
- `GET /health`

## Local Development Setup

## 1. Prerequisites
- Node.js 20+
- Python 3.11+ (3.12 works in this repo)
- MongoDB (local or Atlas)

## 2. Install Frontend Dependencies

From repo root:

```bash
npm install
```

## 3. Install Backend Dependencies

From `backend/`:

```bash
pip install -r requirements.txt
```

## 4. Configure Environment Variables

Create a `backend/.env` file (or export env vars in shell) with values appropriate for your environment:

```env
MONGO_URI=mongodb://localhost:27017
CLERK_API_URL=https://api.clerk.com/v1
CLERK_SECRET_KEY=your_clerk_secret_key
CLERK_JWKS_URL=https://your-clerk-domain/.well-known/jwks.json
```

Frontend API URL is already configured in:
- `lib/api.ts`
- `src/lib/api.js`

## Running the Project

Run **backend** first:

```bash
cd backend
python -m uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
```

Then run **frontend** from repo root:

```bash
npm run dev
```

Open:
- Frontend: `http://localhost:3000`
- Backend docs: `http://localhost:8000/docs`
- Health check: `http://localhost:8000/health`

## Build and Quality

From repo root:

```bash
npm run build
npm run lint
```

## Demo-Ready Behavior

The frontend API layer (`src/lib/api.js`) is designed to be resilient:
- Wraps calls in `try/catch`
- Uses fallback mock data
- Prevents UI crashes if backend is incomplete or temporarily unavailable
- Appends `user_id` and `org_id` from local storage where available

Local storage user shape:

```json
{
  "user_id": "demo_user_001",
  "email": "demo@lexisgraph.ai",
  "org_id": "demo_org_001"
}
```

## Typical End-to-End Test Flow

1. Start MongoDB
2. Start backend (`uvicorn`)
3. Start frontend (`npm run dev`)
4. Open dashboard
5. Upload a PDF on Documents/Policies
6. Check Analysis page status pipeline
7. Open Alerts and AI Assistant pages
8. Verify Team page and onboarding routes

## Troubleshooting

### Module not found for `@/...`
- Ensure `tsconfig.json` includes:
  - `"baseUrl": "."`
  - `"paths": { "@/*": ["./src/*"] }`
- Restart dev server after changing TS/JS config.

### `Error loading ASGI app. Could not import module "main"`
- Start backend from `backend/` with:
  - `python -m uvicorn app.main:app --reload`

### Port already in use (8000)
- Stop the process using port 8000, or run backend on a different port.

### MongoDB connection errors
- Verify `MONGO_URI` and DB availability.
- Confirm network access/IP allow list if using cloud MongoDB.

## Notes

- Keep this as the **single source README** for the project.
- Do not commit real secrets or credentials.
- If backend routes evolve, update the API overview section above.
