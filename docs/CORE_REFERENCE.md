# Core Reference (Frontend → Backend Contract)

This repository (whisper-web) is the frontend for the Whisper platform.

Backend repository: whisper-core

This file defines the non-negotiable behavioral contract between UI and API.

---

## Product Invariants

These rules must never be violated in the UI:

- Whispers are private to the creator.
- Stitches are public but must never expose fan identity.
- No public comment threads.
- No fan-to-fan visibility.
- No follower counts or popularity metrics.
- Creator controls what becomes public.

The UI must always clearly indicate:
- Whether content is private or public.
- Who can see it.

---

## Identity Model (Development Only)

Development headers used by backend:

- `X-User-Id` (fan identity)
- `X-Creator-Id` (creator identity)

Rules:

- These headers must only be attached when `NODE_ENV === "development"`.
- The UI must never auto-enable identity injection in production builds.
- The dev identity control must be clearly labeled as development-only.

---

## API Expectations (Current)

The UI consumes these endpoints:

Creator:
- `GET /api/creator/whispers`
- `POST /api/creator/whispers/{id}/react`
- `POST /api/creator/whispers/{id}/reply`
- `POST /api/creator/whispers/{id}/stitch`
- `POST /api/creator/whispers/{id}/report`
- `POST /api/creator/whispers/{id}/block`
- `GET /api/creator/blocks`

Fan:
- `GET /api/fan/inbox`

Public:
- `GET /api/stitches`
    - Optional filtering by `creatorId` if supported

If the backend API changes, this document must be updated.

---

## Frontend Boundaries

The frontend must NOT:

- Modify backend logic.
- Assume new API fields without confirmation.
- Introduce new platform behaviors.
- Invent social features not defined in specs.

If a required field is missing from API:
- Request it from backend.
- Do not mock or fabricate it in production logic.

---

## UX Philosophy Reminder

The platform should feel:

- Calm
- Intentional
- Private-first
- Creator-controlled

Never dopamine-driven.
Never noisy.