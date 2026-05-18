# AI Coding Demo

A public demonstration repository showcasing modern AI-assisted software engineering workflows in 2026.

This repository is intentionally designed as a realistic engineering environment for demonstrating:

- Spec-Driven Development
- Context Engineering
- Harness Engineering
- Characterization Testing
- Legacy Refactoring
- AI Code Review
- Agent-based Engineering Workflows
- CI/CD Automation

The project simulates a fictional vehicle freight quotation platform built with:

- Next.js
- TypeScript
- TailwindCSS
- Jest
- GitHub Actions

The main focus is not the product itself, but how autonomous coding agents interact with a real-world codebase safely and effectively.

---

# Demo Goals

This repository supports live and recorded demonstrations of:

1. Understanding legacy systems
2. Generating characterization tests
3. Refactoring business-critical code safely
4. AI-assisted code review
5. Automated CI/CD and staging deployment

---

# Demo Narrative

The core scenario revolves around a legacy freight pricing engine containing intentionally problematic code patterns:

- oversized functions
- hardcoded pricing rules
- missing validations
- duplicated logic
- magic numbers
- hidden edge-case bugs
- improper domain separation

AI agents are then used to:

- analyze technical debt
- document risks
- generate tests
- isolate business rules
- refactor safely
- review pull requests
- validate CI execution

---

# Repository Structure

```txt
ai-coding-demo/
├── CLAUDE.md
├── AGENTS.md
├── docs/
├── prompts/
├── src/
├── tests/
└── .github/
```

---

# Key Concepts Demonstrated

## Spec-Driven Development

Specifications and architecture constraints are treated as the source of truth before implementation.

## Context Engineering

AI agents rely on structured repository context through files like:

- `CLAUDE.md`
- `AGENTS.md`
- architecture documentation
- domain documentation

## Harness Engineering

The repository demonstrates how engineering systems guide and constrain AI-generated code using:

- CI/CD
- tests
- linting
- automated reviews
- workflow automation
- PR validation

---

# Demo Flow

## Scene 1 — Legacy Analysis

An agent analyzes the freight pricing module and identifies architectural and business risks.

## Scene 2 — Characterization Testing

The agent creates tests to preserve current system behavior before modifications.

## Scene 3 — Safe Refactoring

The pricing logic is extracted into isolated domain services while preserving compatibility.

## Scene 4 — AI Code Review

An intentionally buggy pull request is reviewed automatically by an AI review agent.

## Scene 5 — Staging Deployment

A successful merge triggers an automated staging deployment pipeline.

---

# Disclaimer

This repository is intentionally designed for educational and demonstration purposes.

Some anti-patterns and bugs are intentionally included to support live demonstrations of AI-assisted engineering workflows.
