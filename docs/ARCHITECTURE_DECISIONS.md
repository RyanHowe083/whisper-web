# Whisper Platform Architecture Decisions

This document defines the architectural boundaries, lifecycle rules, and structural conventions that must be followed when building the Whisper platform.

This file complements `WHISPER_MASTER_SPEC.md` and exists to prevent architectural drift as development progresses.

---

# 1. Architectural Philosophy

The system is designed around **directed interaction**, not public engagement.

Key principles:

- Private-first communication.
- Creator-controlled interaction flow.
- Deterministic domain behavior.
- Minimal magic and implicit behavior.
- Security-first development.

The architecture prioritizes clarity over abstraction.

---

# 2. Layered Architecture

The backend follows a strict layered structure.

## Allowed Call Flow

Controller → Service → Repository → Database


Controllers must never call repositories directly.

Services must contain domain logic.

Repositories are persistence only.

---

## Package Layout


com.chaoticlabs.whisper.core
├── api
│ ├── controller
│ ├── dto
│ └── error
├── domain
│ ├── user
│ ├── creator
│ ├── fan
│ ├── post
│ ├── whisper
│ └── stitch
├── repository
├── service
│ └── impl
├── config
└── security


No additional top-level packages without explicit design change.

---

# 3. Entity Relationship Model

## User

Represents a platform account.

Relationships:

- One-to-one with CreatorProfile (optional).
- May create whispers as a fan.

---

## CreatorProfile

Represents creator-specific configuration.

Relationships:

- Belongs to a User.
- Owns many Posts.
- Owns many Whispers.

---

## Post

Represents creator content.

Relationships:

- Belongs to CreatorProfile.
- May receive many Whispers.

---

## Whisper

Represents a private message sent to a creator.

Relationships:

- Belongs to one Creator.
- References one Post.
- May reference one Fan (nullable).
- May have one Stitch.

---

## Stitch

Represents a public answer derived from a Whisper.

Relationships:

- One-to-one with Whisper.
- Never references fan identity.

---

# 4. Whisper Lifecycle State Machine

## States

- CREATED
- REPLIED
- STITCHED
- EXPIRED

## Valid Transitions


CREATED → REPLIED
CREATED → STITCHED
REPLIED → STITCHED


Invalid transitions:


STITCHED → any other state
EXPIRED → any other state


Stitching is irreversible in MVP.

---

# 5. Identity Visibility Rules

Fan identity visibility levels:

- ANONYMOUS
- EPHEMERAL
- REVEALED

Rules:

- Public stitched content must never contain fan identity.
- Private replies require a non-null fan identity.
- Anonymous whispers allow reactions and stitching only.

---

# 6. API Design Conventions

Endpoints are grouped by responsibility:

## Creator Paths


/api/creator/*


## Fan Paths


/api/creators/{creatorId}/*
/api/fan/*


## Public Paths


/api/stitches


Controllers must be thin.

DTOs must remain stable and versionable.

---

# 7. Persistence Decisions

## Identifiers

- UUID for all entities.

## Timestamps

All entities must include:

- createdAt
- updatedAt

Soft delete support:

- deletedAt exists but not yet used.

---

# 8. Security Model

## MVP Identity

Resolved via request headers:


X-User-Id
X-Creator-Id


These headers exist only for development.

Real authentication will replace this later.

---

## Sensitive Data Rules

- No credentials stored in entities.
- No tokens stored in database.
- No external service integration in MVP.

---

# 9. Coding Constraints

The following are prohibited:

- Nested classes
- Static inner DTOs
- Anonymous classes
- Reflection-heavy logic
- Runtime entity mutation outside services
- Controllers containing domain logic
- Utility dumping classes

---

# 10. Naming Conventions

## Entities

Singular nouns:

- User
- Whisper
- Stitch

## Services

Verb-oriented:

- WhisperService
- StitchService

## Controllers

Role-based naming:

- CreatorController
- FanController
- PublicController

---

# 11. Testing Architecture

Tests must use:

- H2 database
- Spring Boot test context

Tests must validate:

- Domain rules
- State transitions
- Validation logic

External dependencies must not be required for tests.

---

# 12. CI Architecture

GitHub Actions must enforce:

- JDK 21 build
- Maven test phase
- Secret detection guardrails

CI must remain fast and deterministic.

---

# 13. Future Extension Points

These areas are intentionally reserved:

- Streaming infrastructure
- Real authentication layer
- Rate limiting
- Identity expiration logic
- Creator monetization features

These must not be prematurely implemented.

---

# 14. Anti-Patterns the Agent Must Avoid

- Building a chat system instead of a whisper system.
- Introducing public comments.
- Overusing inheritance in domain entities.
- Bidirectional JPA relationships without necessity.
- Adding caching layers prematurely.
- Adding new frameworks without approval.

---

# End of Architecture Decisions
