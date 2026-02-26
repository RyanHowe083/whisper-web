# Infra Spec

This document defines infrastructure expectations for the Whisper platform. It is designed for secure-by-default development now, and clean expansion later.

Scope:
- Local development
- CI requirements
- Environment and secrets handling
- Deployment-ready direction (without overbuilding)
- Future seams for streaming

---

# 1. Environments

## 1.1 Local Development
- Must be runnable on a developer laptop without external paid services.
- Must not require real secrets.
- Local database use is optional; tests must not require it.

Local profiles:
- `dev` (default local runtime)
- `test` (CI, H2)
- `prod` (future)

---

## 1.2 CI (GitHub Actions)
CI must:
- Build on JDK 21
- Run Maven tests and packaging
- Perform basic secret guardrails
- Require no external services (no Postgres dependency)

---

# 2. Secrets and Configuration

## 2.1 Secrets Policy
- No secrets in repo, ever.
- No default passwords.
- No tokens stored in code or config files.
- No printing of environment variables in logs.

## 2.2 Configuration Sources
Configuration must be environment-variable driven.

Approved config file approach:
- `application.yml` committed with placeholders only
- `application-local.example.yml` committed as a safe template
- `application-local.yml` gitignored
- `.env` gitignored

---

# 3. Database

## 3.1 Production Target
- PostgreSQL

## 3.2 Test Target
- H2 in-memory database
- Automatic schema via JPA/Hibernate acceptable early

## 3.3 Migration Strategy
Initial phase:
- JPA schema generation acceptable for speed

Later phase:
- Introduce Flyway or Liquibase only when schema stability becomes important

---

# 4. CI Workflows

Minimum workflow jobs:
- Build and test
- Guardrails checks

Guardrails checks must fail if:
- `.env` or `application-local.yml` exists in tracked files
- Any file contains "BEGIN PRIVATE KEY"

Optional guardrails (later):
- Dependency vulnerability scan via OWASP Dependency-Check or GitHub code scanning

---

# 5. Branch Protections

Recommended repository settings:
- Require PRs to merge into `main`
- Require status checks to pass
- Require branches to be up to date
- Optional: require 1 approval

---

# 6. Deployment Direction (Future)

## 6.1 Initial Deployment Target
A simple deployment path is preferred:
- Single Spring Boot service
- Backed by PostgreSQL
- Hosted on AWS (ECS/Fargate) or similar
- Infrastructure as code optional early

## 6.2 Containerization
- Dockerfile can be added when needed
- Keep runtime minimal
- No secrets baked into images

## 6.3 Observability
Minimum:
- Structured logs (JSON optional later)
- Request IDs
- Basic health endpoint or actuator

Avoid early:
- Complex tracing stacks
- Metrics dashboards unless required

---

# 7. Networking and Security

## 7.1 Public Surface
- Only HTTP API exposed
- No public admin endpoints
- No debug endpoints in production

## 7.2 CORS
- Restrict CORS in production to known frontend origin(s)
- In dev, permissive is acceptable but must be profile-controlled

## 7.3 Rate Limiting (Future)
Not required for MVP.
Design hook only:
- a service-level seam where a limiter could be inserted later

---

# 8. Data Protection

## 8.1 Data at Rest
- Rely on managed PostgreSQL encryption at rest (future)
- No storing of fan secrets or credentials

## 8.2 PII Strategy
- User email considered sensitive
- Avoid exposing email in APIs
- Prefer UUIDs in all public identifiers

---

# 9. Future Streaming / Realtime Seam

Streaming will be a separate concern.

Requirements:
- Realtime should not be built into the core service initially
- Future module/service can subscribe to events or use WebSockets
- The core domain remains the source of truth

Planned future components:
- `whisper-realtime` service (separate runtime)
- WebSocket gateway
- Event ingestion pipeline

Do not implement until explicitly instructed.

---

# 10. Definition of Done (Infra)

Infra is considered sufficient for MVP when:
- CI runs on PRs and main
- CI is deterministic and fast
- Secret guardrails are enforced
- Local development requires no secrets
- Tests pass without external services
