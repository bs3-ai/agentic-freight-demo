# AGENTS.md

# AI Coding Demo — Agent Operating Guide

This document provides operational guidance for autonomous coding agents working inside this repository.

The repository is intentionally designed as a realistic engineering environment for demonstrating AI-assisted software development workflows.

Agents should optimize for:
- safety
- traceability
- incremental delivery
- deterministic validation
- architectural consistency

---

# Repository Mission

This repository demonstrates how AI agents can safely operate inside a real-world engineering workflow using:

- context engineering
- characterization testing
- harness engineering
- automated review systems
- CI/CD validation
- staged refactoring

The repository contains intentionally problematic legacy code for educational purposes.

---

# Core Workflow Expectations

Agents are expected to follow this sequence when modifying legacy code:

1. Understand the existing implementation
2. Identify architectural and domain risks
3. Create characterization tests
4. Refactor incrementally
5. Validate through CI
6. Open focused pull requests
7. Document important changes

Do not skip steps.

---

# Repository Structure

## Application

- `src/app`

Contains:
- Next.js routes
- pages
- API endpoints

---

## Pricing Domain

- `src/modules/pricing`

Contains:
- legacy pricing logic
- future refactored pricing services
- pricing policies
- insurance rules

This is the primary domain used during demonstrations.

---

## Tests

- `tests/`

Contains:
- characterization tests
- regression tests
- API validation tests

---

## Mock Data

- `src/data`

Contains:
- quotes
- partners
- vehicles

The repository intentionally avoids real databases to simplify demonstrations.

---

## Prompt Workflows

- `prompts/`

Contains reusable prompts for:
- analysis
- testing
- refactoring
- review
- deployment workflows

---

# Characterization Testing Rules

Before modifying legacy logic:

- capture current behavior
- preserve external contracts
- document inconsistent behavior
- isolate regressions

Characterization tests are mandatory before major refactoring.

---

# Refactoring Rules

Agents should prefer:
- small isolated changes
- extraction over rewrites
- explicit naming
- deterministic behavior
- composable domain services

Avoid:
- large rewrites
- hidden behavior changes
- unrelated cleanup
- architecture drift

---

# Known Legacy Problems

The pricing module intentionally contains:

- oversized functions
- duplicated rules
- missing validation
- hidden business bugs
- magic numbers
- improper separation of concerns
- inconsistent partner validation
- debug logging

These issues are intentional for demonstration purposes.

---

# Important Domain Rules

## Luxury Vehicles

Luxury vehicles require additional insurance calculations.

Known legacy bug:
Long-distance luxury freight incorrectly applies a 20% insurance multiplier instead of 35%.

This should first be preserved via tests before correction.

---

## Inactive Partners

Inactive partners must never generate freight quotations.

Legacy validation is intentionally inconsistent.

---

## Interstate Freight

Interstate freight contains special pricing rules based on:
- origin state
- destination state
- vehicle category
- partner category

---

# CI/CD Expectations

All pull requests should pass:

1. TypeScript validation
2. Unit tests
3. Build checks
4. Automated review workflows

Agents should assume CI failures are blocking.

---

# Pull Request Expectations

PRs should:
- remain focused
- include explanations
- avoid unrelated modifications
- preserve architecture boundaries
- include tests when behavior changes

---

# Review Expectations

Review agents should prioritize:

- business logic correctness
- security concerns
- architecture consistency
- hidden regressions
- edge-case handling
- test quality

---

# Preferred Agent Behavior

Preferred behavior:
- analyze before editing
- ask architectural questions through documentation
- preserve context
- use deterministic validation
- explain reasoning in commits and PRs

Avoid:
- speculative rewrites
- broad code churn
- hidden assumptions
- deleting legacy behavior without validation

---

# Harness Philosophy

This repository demonstrates a key engineering principle:

AI agents become significantly more reliable when operating inside:
- structured context
- explicit constraints
- deterministic validation systems
- automated feedback loops

The repository itself acts as a harness around autonomous coding agents.
