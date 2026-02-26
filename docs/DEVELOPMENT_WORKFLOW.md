# Whisper Platform Development Workflow

This document defines the workflow for developing the Whisper platform using a combination of human direction and AI agents.

It establishes rules for branching, pull requests, feature delivery, and long-term architectural stability.

This file works alongside:

- WHISPER_MASTER_SPEC.md
- ARCHITECTURE_DECISIONS.md
- ENGINEERING_GUARDRAILS.md

All contributors and agents must follow this workflow.

---

# 1. Development Philosophy

Development must be:

- Incremental
- Spec-driven
- Test-backed
- Architecture-safe

The system evolves through small, verified slices rather than large feature drops.

Agents are execution tools, not architectural decision makers.

---

# 2. Branching Strategy

## 2.1 Main Branch

`main` is always:

- Stable
- Buildable
- Passing CI
- Deployable in development environments

Direct commits to main are discouraged.

---

## 2.2 Feature Branch Naming

Feature branches must follow this pattern:

feature/<area>-<short-description>


Examples:


feature/whisper-create
feature/stitch-flow
feature/inbox-query


Bug fixes:


fix/<area>-<description>


Refactors:


refactor/<area>-<description>


---

# 3. Pull Request Rules

Every feature must go through a pull request.

## 3.1 PR Requirements

A PR is acceptable only if:

- CI passes
- Tests exist for new behavior
- No nested classes were introduced
- Engineering Guardrails remain intact
- No secrets are present

---

## 3.2 PR Scope

PRs must be small and focused.

Allowed:

- One domain slice
- One behavior flow
- One structural refactor

Avoid:

- Multi-feature PRs
- Massive renames
- Architecture rewrites

---

# 4. Agent Interaction Protocol

Agents operate under strict constraints.

## 4.1 Agent Responsibilities

Agents may:

- Implement domain logic
- Create DTOs
- Add repositories
- Write tests
- Follow the spec documents

Agents must not:

- Invent architecture
- Introduce new frameworks
- Modify core domain rules
- Add nested classes
- Add comments

---

## 4.2 Human Responsibilities

The human operator defines:

- What feature slice is next
- Architectural decisions
- Scope boundaries
- Acceptance criteria

Agents execute within those boundaries.

---

# 5. Feature Delivery Lifecycle

Each feature follows this lifecycle:

1. Spec Alignment
2. Branch Creation
3. Agent Implementation
4. Local Verification
5. CI Validation
6. Pull Request Review
7. Merge to Main

---

# 6. Commit Message Conventions

Use concise, imperative messages.

Examples:


Add whisper creation flow
Implement creator inbox query
Introduce stitch entity persistence


Avoid:


fix stuff
updates
misc changes


---

# 7. Refactoring Rules

Refactoring is allowed only when:

- It reduces complexity
- It preserves domain rules
- It does not change API contracts unexpectedly

Large refactors must be isolated into dedicated PRs.

---

# 8. Testing Expectations

Every functional change must include:

- Integration tests when behavior touches persistence
- Service-layer tests for domain rules

Tests must:

- Use H2
- Avoid external dependencies
- Be deterministic

---

# 9. Security Workflow

Before any merge:

- Ensure `.env` or local config files are not included.
- Verify no keys or secrets exist in code.
- Verify logging does not expose request headers.

Security is not optional.

---

# 10. When to Update Documentation

Documentation must be updated when:

- A new entity is introduced
- Lifecycle rules change
- Endpoint contracts change
- Architecture boundaries change

Agents must not update documentation unless explicitly instructed.

---

# 11. Architecture Stability Rules

The following areas are considered stable:

- Domain entity relationships
- Whisper lifecycle states
- Stitch visibility rules
- Layered architecture

Any changes require explicit architectural review.

---

# 12. Agent Execution Pattern

When instructing an agent, provide:

- Feature scope
- Reference to docs folder
- Clear acceptance criteria

Example instruction:

Continue implementation following docs specifications. Implement whisper creation persistence and creator inbox listing with tests.

---

# 13. Future Workflow Evolution

This workflow anticipates future additions:

- Dedicated auth module
- Realtime streaming module
- Separate frontend repo
- Event-driven extensions

Current workflow must remain simple until those phases begin.

---

# End of Development Workflow
