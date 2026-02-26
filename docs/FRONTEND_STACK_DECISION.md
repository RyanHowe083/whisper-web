# Frontend Stack Decision

This document defines the recommended frontend approach for the Whisper platform and establishes guardrails so the UI can evolve quickly without architectural drift.

This decision is optimized for:
- Fast iteration
- Clean separation from backend
- Shareable public stitched pages later
- Secure-by-default development

---

## 1. Recommended Frontend Direction

### Primary Recommendation
- Web-first using Next.js

Rationale:
- Fast MVP delivery
- Easy routing for creator pages and stitched answers
- Server-rendered public stitched pages possible later
- Large ecosystem and strong developer tooling

---

## 2. Repository Strategy

Frontend should live in a separate repository when active development begins.

Preferred future repos:
- `whisper-core` (backend)
- `whisper-web` (frontend)

Until then, UI specs remain in `/docs`.

---

## 3. Framework and Language

Recommended:
- Next.js (App Router)
- TypeScript

UI library:
- Minimal base components
- Avoid heavy UI frameworks initially
- Tailwind optional, but only if it increases speed without locking design

Do not add:
- Complex state machines early
- Heavy design systems early
- Multiple competing component libraries

---

## 4. Frontend Architecture

### 4.1 Folder Structure (Suggested)
- `app/` for routes and screens
- `components/` for reusable UI components
- `lib/api/` for API client
- `lib/state/` minimal shared state utilities
- `styles/` if needed

---

### 4.2 Routing

Must support:
- Creator profile pages: `/c/{creatorId}`
- Creator stitched answers: `/c/{creatorId}/stitched`
- Post detail: `/c/{creatorId}/p/{postId}`
- Fan inbox: `/inbox`
- Creator inbox: `/creator/inbox`
- Creator posts: `/creator/posts`
- Stitch view: `/s/{stitchId}` (optional)

Public stitched pages should remain linkable and shareable.

---

## 5. State Management

MVP preference:
- Component state and simple hooks
- Minimal global state

Avoid:
- Redux unless necessary
- Over-abstracted stores
- Persistent client caches early

If caching becomes important:
- Add React Query or equivalent later, explicitly

---

## 6. API Client Rules

### 6.1 Client Design
- A single API client module
- Typed request and response models
- Centralized error mapping

### 6.2 Environment Configuration
- Use environment variables for API base URL
- No secrets in frontend repo
- No embedding tokens or credentials in client code

---

## 7. Security Guardrails

Frontend must never:
- Store secrets
- Store credentials
- Print sensitive headers or tokens
- Include dev identity headers in production builds

Dev-only behavior must be profile-driven:
- local env only
- explicit toggle

---

## 8. UI Guardrails

The UI must not introduce:
- Public comment threads
- Fan-to-fan visibility
- Follower counts and social scoreboard metrics
- Toxic engagement surfaces

All whisper entry points must display privacy clarity.

All stitch views must avoid any identity leak vectors.

---

## 9. Deployment Direction (Future)

Recommended:
- Vercel or equivalent for Next.js hosting
- Point to backend API domain
- Strict CORS configuration in production

Public stitched pages should be server-rendered when SEO becomes relevant.

---

## 10. Definition of Done (Frontend MVP)

Frontend MVP is complete when:

Fan can:
- View creator profile
- View posts
- Send whisper
- View inbox statuses and stitched links

Creator can:
- Create post
- View whisper inbox
- Stitch a whisper into a public answer

Public can:
- View stitched answers without identity leaks

---

# End of Frontend Stack Decision
