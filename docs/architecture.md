# System Architecture

This document describes the intended architecture for the AI Coding Demo repository.

The repository is intentionally structured to support demonstrations of modern AI-assisted software engineering workflows.

The focus is not feature completeness.

The focus is demonstrating:
- safe AI-assisted refactoring
- characterization testing
- context engineering
- harness engineering
- CI/CD validation
- automated review workflows

---

# Architectural Goals

The repository should demonstrate how AI agents can safely operate inside a structured engineering environment.

The architecture prioritizes:
- modularity
- deterministic validation
- isolated business logic
- incremental refactoring
- stable public contracts

---

# High-Level Architecture

```txt
src/
├── app/
│   ├── api/
│   └── pages
├── modules/
│   ├── pricing/
│   ├── vehicles/
│   └── partners/
├── data/
└── lib/
```

---

# Application Layer

## Next.js App Router

The application uses:
- Next.js App Router
- route handlers
- server-side rendering where appropriate

The UI layer should remain intentionally simple.

The repository focus is engineering workflows, not frontend complexity.

---

# API Layer

Location:
- `src/app/api`

Responsibilities:
- receive requests
- validate payloads
- invoke domain services
- return stable contracts

API routes must NOT:
- contain pricing logic
- implement business rules
- contain insurance calculations

Business logic belongs inside domain modules.

---

# Domain Modules

Location:
- `src/modules`

The repository separates business domains into isolated modules.

---

## Pricing Module

Location:
- `src/modules/pricing`

Primary demonstration domain.

Contains:
- legacy pricing logic
- insurance rules
- pricing policies
- freight calculations
- characterization test targets

The module intentionally starts with poor architecture and legacy anti-patterns.

AI agents are expected to:
- analyze
- document
- test
- refactor
- review

this module incrementally.

---

## Vehicles Module

Location:
- `src/modules/vehicles`

Contains:
- vehicle types
- categorization helpers
- vehicle validation rules

---

## Partners Module

Location:
- `src/modules/partners`

Contains:
- partner validation
- active status handling
- partner categories
- regional support rules

---

# Mock Data Layer

Location:
- `src/data`

The repository intentionally uses mock JSON data instead of real databases.

Goals:
- simplify demonstrations
- avoid infrastructure complexity
- maximize reproducibility
- keep focus on engineering workflows

Mock data includes:
- vehicles
- partners
- freight quotes

---

# Testing Strategy

Location:
- `tests/`

The repository demonstrates characterization-first refactoring.

---

## Characterization Tests

Purpose:
Capture and preserve existing behavior before modifications.

Required before:
- pricing refactoring
- bug fixing
- rule extraction

---

## Regression Tests

Purpose:
Prevent accidental behavior changes during refactoring.

---

## API Tests

Purpose:
Validate:
- response contracts
- route behavior
- integration consistency

---

# Harness Engineering

The repository demonstrates the concept that:

AI agents become more reliable when surrounded by deterministic engineering systems.

The harness includes:
- CI validation
- linting
- automated reviews
- test suites
- workflow automation
- repository context files

---

# CI/CD Pipeline

Location:
- `.github/workflows`

The repository includes automated workflows for:
- TypeScript validation
- unit tests
- build checks
- automated AI reviews
- staging deployments

---

# Automated Review Workflow

The repository demonstrates AI-assisted pull request reviews.

Review agents are expected to analyze:
- business correctness
- edge cases
- security concerns
- architecture violations
- regression risks

The repository intentionally includes buggy pull requests for demonstration purposes.

---

# Refactoring Philosophy

The repository intentionally avoids:
- massive rewrites
- unsafe migrations
- architecture churn

Preferred strategy:
1. analyze
2. document
3. characterize
4. isolate
5. refactor incrementally
6. validate continuously

---

# Repository Context Files

The repository uses:
- `CLAUDE.md`
- `AGENTS.md`
- architecture documentation
- domain documentation

to provide structured operational context for AI agents.

This demonstrates Context Engineering principles in practice.

---

# Deployment Strategy

Merge to `main` triggers:
- staging deployment
- smoke tests
- deployment validation

The staging environment exists to demonstrate:
- CI/CD integration
- deployment automation
- AI-assisted engineering workflows

---

# Educational Intent

This repository intentionally contains:
- anti-patterns
- hidden bugs
- legacy code smells
- inconsistent validation

These exist to support:
- realistic demonstrations
- refactoring workflows
- AI review scenarios
- engineering discussions

The repository is an engineering playground for modern AI-assisted software development workflows.
