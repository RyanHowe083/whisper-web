# Feature Roadmap

This roadmap defines implementation order. Features must be built in dependency sequence.

Non-goals:
- Public comments
- Algorithmic feeds
- Streaming infrastructure
- Monetization systems (early)

---

## Phase 1 — Foundation

### 1. Documentation Baseline
All docs in `/docs` exist and match architecture intent.

### 2. CI Baseline
GitHub Actions:
- JDK 21 build
- Maven test + package
- Secret guardrails

---

## Phase 2 — MVP Core Loop (Whisper → Stitch)

### 2.1 Dev Identity Resolver
Header-based identity (X-User-Id, X-Creator-Id).
No JWT yet.

### 2.2 Creator Profile
- CreatorProfile entity
- whispersEnabled toggle
- Public creator fetch API

### 2.3 Posts
Creators publish posts.
Fans can fetch posts.

### 2.4 Whisper Creation
Fan sends whisper tied to a post.

Validation:
- Creator exists
- Creator enabled
- Post belongs to creator

Result:
- status = CREATED

### 2.5 Creator Inbox Listing
Creator retrieves whispers.

Sorting:
- CREATED first
- Newest first

### 2.6 Stitching
Creator converts whisper into public answer.

Rules:
- One stitch per whisper
- Status → STITCHED
- Identity never exposed

MVP Loop Complete when:
- Creator posts
- Fan whispers
- Creator stitches
- Public sees stitched answers

---

## Phase 3 — Interaction Depth

### 3.1 Reactions
Creator reacts to whispers.

### 3.2 Private Replies
Allowed only when fan identity exists.

### 3.3 Fan Inbox
Fan sees:
- Replies
- Stitched notifications

---

## Phase 4 — Safety Baseline

### Reporting and Blocking
Creator can:
- Block fan identity
- Report whisper

---

## Phase 5 — Expansion (Later)

Do not implement early.

- Identity expiration
- Monetization features
- Discovery feeds
- Streaming infrastructure

---

## Architecture Seams to Preserve

- Identity resolver isolated
- Services enforce domain rules
- Realtime stays separate from core

---

## Milestones

Milestone A:
Core loop complete.

Milestone B:
Replies + fan inbox.

Milestone C:
Moderation baseline.
