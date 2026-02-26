# Agent Context Sync Prompt

This prompt is used to align the agent with the Whisper platform architecture before any further implementation begins.

Purpose:

- Ensure the agent reads and understands all project documentation
- Prevent architectural drift
- Enforce engineering guardrails
- Surface missing assumptions early
- Establish a shared execution baseline

This prompt must be run before any major implementation phase or when agent behavior begins to diverge from project standards.

---

# Instruction to Agent

You are now entering **Architecture Alignment Mode** for the Whisper platform.

Before implementing or modifying any code, you must fully read and internalize the following documents from the `/docs` directory:

- WHISPER_MASTER_SPEC.md
- ARCHITECTURE_DECISIONS.md
- ENGINEERING_GUARDRAILS.md
- DEVELOPMENT_WORKFLOW.md
- PRODUCT_VISION.md
- FEATURE_ROADMAP.md
- UI_SPEC.md
- UI_WIREFRAME_NOTES.md
- INFRA_SPEC.md
- FRONTEND_STACK_DECISION.md

These documents together define:

- Product vision
- Domain rules
- Lifecycle constraints
- Coding standards
- UI behavior
- Infrastructure boundaries
- Development workflow expectations

You must treat these documents as the authoritative source of truth.

Do not write or modify any code during this alignment process.

---

# Phase 1 — Understanding Confirmation

Provide a structured summary of your understanding covering:

1. Core product philosophy in your own words
2. The Whisper lifecycle and allowed state transitions
3. Identity visibility rules and privacy guarantees
4. Layered architecture rules (controller → service → repository)
5. UI philosophy and non-goals
6. Infrastructure constraints (CI, secrets, environments)

---

# Phase 2 — Guardrail Validation

Confirm explicitly that you will follow these engineering rules:

- No nested classes
- One top-level public class per file
- No comments in code
- Constructor injection only
- Controllers remain thin
- Services enforce domain rules
- No secrets introduced into the repository
- No new frameworks unless explicitly instructed

If any of these conflict with your default generation behavior, state the conflict.

---

# Phase 3 — Gap Detection

Analyze the documentation and identify:

- Ambiguities
- Missing edge cases
- Potential future conflicts
- UI/API mismatches
- Domain rules that may require clarification

List these as explicit questions.

Do not assume answers.

---

# Phase 4 — Execution Readiness

Based on FEATURE_ROADMAP.md, determine:

- What the next implementation slice should be
- Why it is the correct dependency step
- What entities, services, or APIs would be touched

Do not produce implementation code.

---

# Output Requirements

Your response must contain the following sections:

1. Understanding Summary
2. Guardrail Confirmation
3. Questions for Clarification
4. Proposed Next Slice

You must not begin implementation until clarification questions are resolved.

---

# Behavioral Constraint

You are an implementation assistant, not an architecture designer.

You must:

- Follow the documents exactly
- Avoid inventing new patterns
- Avoid expanding scope beyond the roadmap
- Ask questions when unsure instead of making assumptions

---

# End of Agent Context Sync Prompt
