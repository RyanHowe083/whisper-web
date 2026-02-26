# Whisper Platform Engineering Guardrails

This document defines the non-negotiable engineering constraints for the Whisper platform.

It exists to prevent architectural drift, inconsistent coding styles, and unsafe implementation patterns when using AI agents or multiple contributors.

This file overrides any agent assumptions or default framework behaviors.

---

# 1. Core Philosophy

Engineering decisions must prioritize:

- Predictability
- Explicit behavior
- Security-by-default
- Long-term maintainability
- Minimal framework magic

The goal is not clever code. The goal is stable evolution.

---

# 2. Structural Rules

## 2.1 Class Structure

The following are mandatory:

- One public top-level class per file.
- No nested classes.
- No inner static classes.
- No anonymous classes.
- No inline DTO definitions inside controllers or services.

All DTOs, exceptions, and services must be standalone files.

---

## 2.2 Dependency Direction

Allowed dependency flow:

Controller → Service → Repository → Database


Forbidden flows:


Controller → Repository
Repository → Service
Entity → Service
Entity → Controller


Entities must remain persistence-focused only.

---

# 3. Injection Rules

- Constructor injection only.
- No field injection.
- No setter injection.
- No service locator patterns.

Spring annotations allowed:

- `@Service`
- `@Repository`
- `@RestController`
- `@Configuration`

Avoid advanced proxy or dynamic wiring.

---

# 4. DTO Rules

DTOs must be:

- Immutable where practical.
- Separate from domain entities.
- Located under:


api/dto/request
api/dto/response


DTOs must not:

- Contain business logic.
- Contain persistence annotations.
- Contain nested classes.

---

# 5. Repository Rules

Repositories must:

- Extend Spring Data interfaces only.
- Contain no business logic.
- Avoid complex custom queries unless explicitly required.

Repositories must not:

- Be injected into controllers.
- Contain service-layer validations.

---

# 6. Service Layer Responsibilities

Services are the only place where domain logic exists.

Services must:

- Validate business rules.
- Enforce lifecycle transitions.
- Enforce identity visibility rules.

Services must not:

- Build HTTP responses.
- Access request headers directly.
- Contain UI logic.

Identity resolution must occur via a dedicated component.

---

# 7. Controller Rules

Controllers must:

- Be thin.
- Delegate immediately to services.
- Map DTOs only.

Controllers must not:

- Contain branching business logic.
- Access repositories.
- Modify entities directly.

---

# 8. Domain Entity Constraints

Entities must remain:

- Simple.
- Explicit.
- Non-magical.

Avoid:

- Bidirectional relationships unless strictly necessary.
- Cascade-heavy mappings.
- Lazy-loading traps in controllers.

Entities must not:

- Contain service logic.
- Contain validation annotations tied to UI concerns.

---

# 9. Exception Handling

All exceptions must be:

- Top-level classes.
- Mapped through a global exception handler.

Forbidden patterns:

- Inline exception classes.
- Throwing generic RuntimeException directly from controllers.

---

# 10. Naming Conventions

## Entities

Singular nouns:

- Whisper
- Stitch
- User

## Services

Action-oriented:

- WhisperService
- StitchService

## Controllers

Role-based:

- CreatorController
- FanController
- PublicController

---

# 11. Security Guardrails

- No credentials or secrets in any source file.
- No default passwords.
- No hard-coded URLs.
- No printing of request headers or environment variables in logs.

Dev identity must remain isolated in a dedicated resolver component.

---

# 12. Testing Guardrails

Tests must:

- Use H2 database.
- Avoid external service calls.
- Focus on domain behavior, not implementation details.

Avoid:

- Over-mocking repositories.
- Testing controllers without service coverage.

---

# 13. Persistence Guardrails

All entities must include:

- UUID id
- createdAt
- updatedAt

Soft delete:

- deletedAt exists but unused until explicitly enabled.

No entity versioning or auditing frameworks unless approved.

---

# 14. Performance Guardrails

Do not introduce:

- Caching layers
- Messaging queues
- Streaming infrastructure
- Distributed transactions

until explicitly planned.

Premature optimization is forbidden.

---

# 15. Anti-Patterns the Agent Must Avoid

The agent must never introduce:

- Nested DTO classes.
- Controller logic that manipulates entities.
- Utility classes aggregating unrelated functions.
- Custom framework abstractions.
- Event-driven patterns without instruction.
- Public comment systems.

---

# 16. Future Modularization Seams

The architecture must remain ready to split into modules:

- core-domain
- api-layer
- realtime-streaming
- auth

Do not enforce module separation yet.

Maintain clean package boundaries to allow future extraction.

---

# 17. Definition of Done (Engineering)

A feature is considered complete only when:

- CI passes.
- Tests exist for core behavior.
- No nested classes introduced.
- No secrets detected.
- Controllers remain thin.
- Services enforce rules.
- Entities remain clean.

---

# End of Engineering Guardrails
