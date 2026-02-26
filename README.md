# Whisper Web

Frontend for the Whisper platform. Built with Next.js (App Router) and TypeScript.

## Prerequisites

- Node.js 20+
- npm

## Setup

```bash
cp .env.example .env.local
npm install
```

## Required Environment Variables

| Variable | Description | Example |
|---|---|---|
| `NEXT_PUBLIC_API_BASE_URL` | Backend API base URL | `http://localhost:8080/api` |

## Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Dev Identity

In development, set identity headers via:

- Query params: `?dev_user_id=<uuid>&dev_creator_id=<uuid>`
- localStorage: `whisper_dev_user_id`, `whisper_dev_creator_id`

A yellow banner appears at the bottom when dev identity is active.

## Build

```bash
npm run build
```

## Lint

```bash
npm run lint
```

