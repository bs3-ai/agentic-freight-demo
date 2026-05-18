# CLAUDE.md

# AI Coding Demo — Repository Operating Context

This file defines the operational context, architectural constraints and engineering expectations for AI agents working in this repository.

The repository is intentionally designed for demonstrations of modern AI-assisted software engineering workflows.

Agents operating in this repository must prioritize:
- correctness
- safety
- traceability
- incremental changes
- deterministic validation
- architecture preservation

---

# Repository Purpose

This project simulates a fictional freight quotation platform with intentionally problematic legacy code.

The primary goal is NOT product delivery.

The primary goal is demonstrating:
- legacy analysis
- characterization testing
- safe refactoring
- AI code review
- harness engineering
- CI/CD validation
- agent collaboration workflows

---

# Technology Stack

- Next.js App Router
- TypeScript
- TailwindCSS
- Jest
- GitHub Actions

---

# Architectural Principles

## 1. Domain Isolation

Business rules must remain isolated from:
- UI rendering
- API route handlers
- infrastructure concerns
- logging concerns

Pricing logic belongs exclusively inside:
- `src/modules/pricing`

---

## 2. Incremental Refactoring

Legacy code must NOT be rewritten in a single step.

Required sequence:
1. Understand current behavior
2. Document risks
3. Create characterization tests
4. Refactor incrementally
5. Preserve external behavior
6. Validate using automated tests

---

## 3. Characterization Before Modification

Never modify legacy pricing logic before creating tests that capture current behavior.

Characterization tests are mandatory before refactoring.

---

## 4. Preserve Public Contracts

Existing API response shapes must remain stable unless explicitly instructed otherwise.

Do not introduce breaking changes silently.

---

# Legacy Pricing Module Constraints

The pricing module intentionally contains:
- oversized functions
- duplicated logic
- hardcoded rules
- missing validation
- hidden bugs
- magic numbers
- debug logging
- mixed responsibilities

These issues are intentional for educational purposes.

Do not silently remove them unless performing an explicit refactoring task.

---

# Known Domain Rules

## Interstate Freight

Interstate freight applies additional pricing rules based on:
- origin state
- destination state
- vehicle category
- partner category

---

## Luxury Vehicles

Luxury vehicles require additional insurance fees.

Known bug:
Vehicles above 150km incorrectly apply a 20% insurance multiplier instead of 35%.

This behavior should first be captured via characterization tests before correction.

---

## Inactive Partners

Inactive partners must never generate freight quotations.

Validation is intentionally inconsistent in the legacy module.

---

# Forbidden Refactoring Behaviors

Agents MUST NOT:

- rewrite entire modules without tests
- remove business rules without validation
- introduce unrelated architectural changes
- change API contracts casually
- mix infrastructure into domain logic
- suppress failing tests without explanation
- remove intentional demo anti-patterns outside scoped tasks

---

# Testing Expectations

All pricing behavior changes must include:
- unit tests
- edge-case coverage
- regression validation

Priority areas:
- interstate pricing
- luxury vehicle insurance
- inactive partner handling
- long-distance calculations

---

# Pull Request Expectations

All pull requests should:
- remain small and focused
- explain architectural decisions
- document risk areas
- preserve deterministic behavior
- pass CI validation

---

# Preferred Refactoring Strategy

Preferred extraction flow:

1. isolate calculation inputs
2. isolate validation rules
3. isolate pricing policies
4. isolate insurance logic
5. isolate distance rules
6. preserve compatibility layer
7. remove duplication gradually

---

# Repository Navigation

## Pricing Domain

- `src/modules/pricing`

## API Layer

- `src/app/api`

## Tests

- `tests/`

## Mock Data

- `src/data`

## Prompt Workflows

- `prompts/`

---

# Harness Engineering Expectations

Agents should assume:
- CI validation is mandatory
- tests are authoritative
- review automation may reject unsafe changes
- architecture consistency matters more than speed

---

# Operating Philosophy

Fast code generation without architectural discipline creates technical debt at scale.

This repository demonstrates how:
- context
- constraints
- tests
- reviews
- CI/CD
- structured workflows

allow AI agents to operate safely in real engineering environments.
