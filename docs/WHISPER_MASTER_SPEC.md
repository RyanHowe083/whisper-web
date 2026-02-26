# Whisper Platform Master Build Specification

## Overview

Whisper is a creator–fan interaction platform centered around **private, directed communication** instead of public comment threads.

Fans send private **Whispers** to creators.  
Creators may respond privately or **Stitch** a Whisper into a public answer while preserving fan anonymity.

This document is the single source of truth for architecture, coding standards, product behavior, and implementation constraints.

---

# 1. Technology Stack

- Language: Java 21
- Framework: Spring Boot
- Build Tool: Maven
- Repository Strategy: Single repo (initially)
- Root Package: `com.chaoticlabs.whisper.core`

Core Principle:

> The platform optimizes for safe, private interaction — not algorithmic engagement.

---

# 2. Absolute Engineering Standards

## 2.1 Code Structure

- No comments anywhere in code.
- No nested or inner classes.
- One top-level public class per file.
- No anonymous classes.
- Constructor injection only.
- Controllers must call services only.
- Services must call repositories only.
- No utility dumping classes.
- Favor explicit naming over abstraction.
- UUID identifiers everywhere.

## 2.2 Security Rules

- No secrets, tokens, credentials, or keys in repository files.
- All configuration uses environment variables.
- Local config overrides must be gitignored.
- Logging must never expose environment values or secrets.

---

# 3. Product Philosophy

This is not a traditional social media feed.

Design constraints:

- Fans never see each other.
- No public comment threads.
- Whisper interactions are private by default.
- Stitching converts private signal into public value without exposing identities.

---

# 4. Identity Model

## 4.1 User

Single User entity.

A user may act as:

- Creator
- Fan
- Both

## 4.2 Fan Identity Modes

- ANONYMOUS (default)
- EPHEMERAL (future)
- REVEALED (future)

Identity visibility rules:

- Whisper identity visible only to creator.
- Public stitched content contains no fan identity data.

---

# 5. Domain Model

All entities include:

- `id (UUID)`
- `createdAt`
- `updatedAt`
- `deletedAt` (reserved for soft delete)

## 5.1 User

Fields:

- id
- email
- roles

## 5.2 CreatorProfile

Fields:

- userId
- displayName
- whispersEnabled

## 5.3 Post

Fields:

- id
- creatorId
- content
- mediaUrl (optional)
- timestamps

## 5.4 Whisper

Fields:

- id
- creatorId
- postId
- fanId (nullable)
- identityMode
- status
- message
- stitchedAt

Status Enum:

- CREATED
- REPLIED
- STITCHED
- EXPIRED

Constraints:

- Whisper belongs to one creator.
- Post must belong to creator.
- One stitch per whisper.

## 5.5 Stitch

Fields:

- id
- whisperId
- creatorId
- publicPrompt
- publicResponse

Rules:

- Fan identity must never exist on Stitch.
- Stitch is one-to-one with Whisper.

---

# 6. Business Logic Rules

## 6.1 Whisper Creation

Validation:

- Creator exists.
- Creator whispersEnabled = true.
- Post exists.
- Post.creatorId matches.

Behavior:

- fanId nullable.
- status = CREATED.

## 6.2 Creator Inbox

Sorting priority:

1. Unread (CREATED)
2. Newest first

## 6.3 Stitching

- Creator only action.
- Irreversible in MVP.
- Original whisper preserved.
- Status changes to STITCHED.

## 6.4 Replies (Future)

- Anonymous whispers cannot receive private replies.
- Anonymous may receive reactions or stitched responses.

---

# 7. API Contract

## Base Path

/api


## Creator Endpoints


POST /api/creator/posts
GET /api/creator/whispers
POST /api/creator/whispers/{id}/reply
POST /api/creator/whispers/{id}/stitch


## Fan Endpoints


GET /api/creators/{creatorId}
GET /api/creators/{creatorId}/posts
POST /api/creators/{creatorId}/whispers
GET /api/fan/inbox


## Public Endpoints


GET /api/stitches


## Error Response

Fields:

- code
- message
- requestId
- timestamp

---

# 8. Security Model (MVP)

## Dev Identity

Headers:


X-User-Id
X-Creator-Id


No JWT authentication in MVP.

Authorization checks exist in service layer only.

---

# 9. UI Architecture

## Fan Experience

- Creator profile page
- Posts tab
- Stitched Answers tab
- Whisper composer
- Fan inbox (future)

## Creator Experience

- Create Post
- Whisper Inbox
- Stitch Composer
- Creator Controls

## Stitch Presentation

- Public prompt (editable)
- Public response
- Identity permanently hidden

---

# 10. Persistence & Testing

## Database Strategy

- Production target: PostgreSQL
- Testing: H2
- CI must not require external services.

## Required Tests

- Whisper creation success
- Creator disabled rejects
- Post mismatch rejects
- Inbox sorting validation

---

# 11. CI Requirements

GitHub Actions must:

- Use JDK 21
- Cache Maven
- Run:


mvn test
mvn package


Security Guardrails:

- Fail build if `.env` committed.
- Fail build if private key blocks detected.

---

# 12. Delivery Roadmap

1. Domain model
2. API contracts
3. Service layer
4. CI workflow
5. Whisper creation + inbox
6. Stitching
7. Private replies
8. Creator controls
9. Rate limit hooks
10. Real authentication

---

# 13. Agent Execution Rules

When this file is provided to an agent:

- Treat this document as the authoritative specification.
- Follow Engineering Standards strictly.
- Do not introduce additional frameworks.
- Implement features in roadmap order only.
- Every feature must include tests.
- Resolve ambiguity using defaults defined here.

---

# End of Specification
