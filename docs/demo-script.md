# Demo Script

This document defines the live demonstration flow for the AI Coding Demo repository.

The goal is to demonstrate modern AI-assisted software engineering workflows using:
- autonomous coding agents
- characterization testing
- harness engineering
- AI-assisted code review
- CI/CD automation

The presentation should focus on engineering workflows, not prompt tricks.

---

# Demo Objectives

Demonstrate that modern AI-assisted engineering is not:
- autocomplete
- isolated prompting
- "vibe coding"

Instead, the demo should show:
- structured workflows
- deterministic validation
- context-driven agents
- safe refactoring
- automated review systems

---

# Demo Stack

- Next.js
- TypeScript
- Jest
- GitHub Actions
- Claude Code
- Codex CLI
- GitHub Pull Requests
- Vercel Staging Deployments

---

# Demo Narrative

The repository simulates a freight quotation platform containing a problematic legacy pricing module.

The audience should observe how AI agents:
1. understand the legacy system
2. create safety mechanisms
3. refactor incrementally
4. review code automatically
5. validate changes through CI/CD

---

# Scene 1 — Legacy Analysis

## Goal

Demonstrate that agents can:
- analyze architecture
- identify risks
- understand business rules
- document technical debt

without immediately modifying code.

---

## Demo Flow

Open:
- `src/modules/pricing/legacy.ts`

Show:
- oversized functions
- magic numbers
- mixed responsibilities
- hardcoded rules
- missing validation
- debug logs

Run:
- legacy analysis prompt

The agent should:
- summarize risks
- explain business rules
- identify hidden bugs
- suggest characterization tests

---

## Key Message

AI-assisted engineering starts with understanding, not generation.

---

# Scene 2 — Characterization Testing

## Goal

Demonstrate safe legacy modernization.

The audience should understand:
- tests are safety mechanisms
- behavior preservation matters
- refactoring without tests is dangerous

---

## Demo Flow

Ask the agent to:
- generate characterization tests
- preserve current behavior
- capture edge cases

Important cases:
- interstate freight
- luxury vehicles
- inactive partners
- long-distance calculations

Run tests live.

---

## Key Message

AI agents become significantly safer when operating with deterministic validation.

---

# Scene 3 — Incremental Refactoring

## Goal

Demonstrate controlled refactoring.

The audience should observe:
- extraction of domain logic
- separation of responsibilities
- preservation of behavior
- incremental improvements

---

## Demo Flow

Ask the agent to:
- isolate pricing rules
- extract insurance calculations
- separate validation logic
- preserve compatibility

Run:
- tests
- typecheck
- build

during the process.

---

## Key Message

Modern AI engineering is architecture-guided, not chaos-driven.

---

# Scene 4 — AI Code Review

## Goal

Demonstrate automated review workflows.

The audience should see:
- AI reviewing AI-generated code
- inline review comments
- architectural validation
- bug detection

---

## Demo Flow

Open a pull request containing intentional problems.

Examples:
- incorrect insurance multiplier
- missing inactive partner validation
- hidden N+1 behavior
- insecure route handling

Trigger automated review workflow.

Show:
- inline comments
- warnings
- architectural feedback

---

## Key Message

AI generation without AI review is incomplete engineering.

---

# Scene 5 — Staging Deployment

## Goal

Demonstrate complete engineering workflows beyond coding.

The audience should observe:
- CI/CD automation
- deployment pipelines
- staging environments
- smoke validation

---

## Demo Flow

Merge the pull request.

Show:
- GitHub Actions running
- staging deployment trigger
- generated deployment URL
- smoke tests

Open the staging environment live.

---

## Key Message

The future is not just AI generating code.

The future is AI participating in the entire engineering lifecycle.

---

# Important Presentation Guidance

## Focus on Engineering

Do not position the demo as:
- prompt engineering tricks
- one-shot generation
- "build apps instantly"

Position it as:
- engineering systems
- workflows
- architecture
- validation
- operational safety

---

## Focus on Constraints

Reinforce continuously:
- tests
- CI
- harnesses
- context
- review systems

are what make AI-generated code reliable.

---

## Focus on Incrementalism

Avoid:
- massive rewrites
- "rewrite everything"
- unrealistic speed demonstrations

Emphasize:
- controlled iteration
- safety
- compatibility
- observability

---

# Closing Narrative

The developer role is evolving from:
- code writer

to:
- architecture orchestrator
- workflow designer
- harness engineer
- AI systems operator

The repository exists to demonstrate that transition concretely.
