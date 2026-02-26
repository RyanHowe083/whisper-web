# UI Spec

This document defines how the UI should be built and how it should look/feel for the Whisper platform.

The UI is intentionally calm and private-first. It is not a dopamine feed.

Core UI mantra:
- Private input
- Curated output
- No public fan performance

---

## 1. UX Principles

### 1.1 Calm Interface
- Minimal badges, minimal counts
- Avoid “leaderboards” and visible popularity metrics
- Avoid aggressive notifications

### 1.2 Predictable Privacy
The UI must always answer:
- Who can see this?
- Is this public or private?
- Can it be shared?
- Does it reveal identity?

### 1.3 Creator Control First
- Creator surfaces should feel like a studio inbox, not social media
- Fan surfaces should feel safe and low-pressure

### 1.4 No Public Fan Threads
- No fan-to-fan visibility
- No public comments
- No “reply chains” among fans

---

## 2. Visual Style Direction

### 2.1 Overall Aesthetic
- Clean, modern, minimal
- Large whitespace
- Emphasis on content and writing
- Subtle dividers
- Soft, intentional motion (if any)

### 2.2 Color and Tone
- Neutral base
- Avoid loud neon “social” palettes by default
- Use color primarily for state and safety, not hype

### 2.3 Typography
- Readable, slightly editorial
- Good line height
- Comfortable long-form reading for stitched answers

---

## 3. Navigation Model

The UI has two modes:

- Fan Mode
- Creator Mode

Users who are both can switch modes.

### 3.1 Fan Navigation (MVP)
- Home (Following)
- Inbox
- Search
- Profile

### 3.2 Creator Navigation (MVP)
- Posts
- Inbox
- Stitched
- Profile/Settings

No global trending feed in MVP.

---

## 4. Core Screens (MVP)

### 4.1 Fan: Creator Profile
Purpose: Convert interest into a whisper.

Elements:
- Creator identity: display name, category tags, short bio
- Primary CTA: Whisper
- Tabs:
    - Posts
    - Stitched Answers

Rules:
- No public comments
- No public list of fans

---

### 4.2 Fan: Creator Posts List
Purpose: Provide context and entry points.

Post card:
- Media (optional) and caption
- CTA: Whisper

---

### 4.3 Fan: Post Detail
Purpose: Whisper entry from a specific post.

Elements:
- Post media/caption
- Whisper CTA
- Privacy note: “Whispers are private. Only the creator sees them.”

---

### 4.4 Fan: Whisper Composer
Purpose: High-signal message with low anxiety.

Fields:
- Message text (clear max length)
- Category selector (Question, Appreciation, Idea, Other)
- Identity mode selector:
    - Anonymous (default)
    - Ephemeral (optional later)

UX rules:
- No public preview
- Confirm screen after send

States:
- Sent
- Rate-limited (future)
- Creator whispers disabled

---

### 4.5 Fan: Inbox
Purpose: Close the loop.

Inbox list items show:
- Creator identity
- Whisper status:
    - Replied privately
    - Answered publicly (stitched)
    - Pending

Detail view shows:
- The whisper the fan sent
- Private reply if applicable
- Link to stitched answer if applicable

---

## 5. Creator Screens (MVP)

### 5.1 Creator: Home
Primary actions:
- Create Post
- Inbox (unread count allowed but minimal)

Secondary:
- Toggle whispersEnabled (in settings)

---

### 5.2 Creator: Create Post
Purpose: Publish content that can receive whispers.

Fields:
- Caption text
- Media upload optional (can be stubbed early)

---

### 5.3 Creator: Inbox (Whisper List + Detail)
Purpose: Creator’s command center.

Layout:
- Left pane: list of whispers
- Right pane: selected whisper detail

Filters:
- Unread (CREATED)
- All
- Category (optional)

List item fields:
- Message preview
- Time
- Identity badge (Anonymous/Ephemeral)

---

### 5.4 Creator: Whisper Detail
Actions:
- React (light acknowledgement)
- Reply privately (only if fan identity exists)
- Stitch
- Block/report

Behavior rules:
- Stitch is deliberate and has a dedicated flow
- Reply should not expose fan identity publicly

---

### 5.5 Creator: Stitch Composer
Purpose: Convert private whisper into public value.

Fields:
- Public prompt (editable paraphrase)
- Public response (creator answer)
- Identity lock: always hidden

Publish results:
- Creates stitched answer
- Updates whisper status to STITCHED
- Fan receives “Answered publicly” in inbox

---

### 5.6 Public: Stitched Answers
Purpose: Shareable, discoverable knowledge.

Feed item:
- Prompt
- Answer
- Creator attribution

Rules:
- Never show fan identity
- Never show metadata that could reveal identity

---

## 6. UI State Model

### 6.1 Whisper States
- CREATED: awaiting creator action
- REPLIED: private reply exists
- STITCHED: public answer exists
- EXPIRED: not used in MVP

UI mapping:
- Fan inbox and creator inbox must reflect these states.

---

## 7. Component Inventory (MVP)

Fan components:
- CreatorCard
- PostCard
- WhisperComposer
- InboxList
- InboxDetail

Creator components:
- WhisperList
- WhisperDetail
- StitchComposer
- PostComposer

Public components:
- StitchedFeed
- StitchedItem

---

## 8. Frontend Architecture Guidance

This section is tech-agnostic but defines structure.

### 8.1 Recommended Patterns
- Route-based screens
- Service layer for API calls
- State management kept minimal in MVP
- Separate “creator mode” routes from “fan mode” routes

### 8.2 Data Fetching
- Prefer server-driven data (fetch by ID)
- Avoid optimistic updates initially
- Cache lightly, invalidate on write

### 8.3 Error Handling
- Standard error banner/toast system
- Inline validation for whisper composer and post composer

### 8.4 Accessibility
- Keyboard navigable inbox
- Clear focus states
- Readable contrast

---

## 9. MVP UI Non-Goals

Do not implement in MVP:
- Infinite scroll discovery feed
- Trending
- Public fan profiles
- Public comment threads
- Complex notifications
- Streaming UI

---

## 10. UI Acceptance Criteria for MVP

MVP UI is considered complete when:

- Fan can:
    - View creator profile
    - View posts
    - Send whisper
    - See whisper status and stitched answers in inbox

- Creator can:
    - Create a post
    - View whisper inbox
    - Stitch a whisper into a public answer

- Public can:
    - View stitched answers without fan identity leaks
