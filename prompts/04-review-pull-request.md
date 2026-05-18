# Prompt 04 — Review Pull Request

You are working in the `ai-coding-demo` repository as an autonomous review agent.

Your task is to review the current pull request changes on this branch.

This is a review-only workflow.

Do NOT modify code.

## Required Reading

Before reviewing the PR, read:

1. `README.md`
2. `CLAUDE.md`
3. `AGENTS.md`
4. `docs/domain.md`
5. `docs/architecture.md`
6. `docs/reports/legacy-pricing-analysis.md`
7. `tests/characterization/legacy-pricing.test.ts`

Then inspect the current git diff for this branch against its base branch.

## Review Goals

Analyze the pull request for:

- regression risks
- business logic changes
- architecture violations
- boundary condition changes
- characterization test violations
- hidden behavior modifications
- suspicious conditional changes
- dangerous cleanup behavior
- contract preservation
- maintainability concerns

Pay special attention to:

- luxury insurance behavior
- 150km boundary behavior
- inactive partner behavior
- interstate pricing rules
- warning preservation
- rounding-sensitive calculations

## Hard Constraints

You must NOT:

- modify production code
- modify tests
- fix bugs
- refactor code
- rewrite the PR

This is a pure review workflow.

## Output

Create:

`docs/reports/pr-review-analysis.md`

The review should include:

1. Executive Summary
2. High-Risk Findings
3. Business Logic Concerns
4. Boundary Condition Risks
5. Architecture Review
6. Regression Risk Analysis
7. Test Coverage Concerns
8. Recommended Follow-up Actions

When possible:

- reference exact files
- reference exact conditions
- explain operational impact
- explain why the issue is dangerous

Focus on engineering risk, not style preferences.

# SAFETY CONSTRAINT

THIS IS A REVIEW-ONLY TASK.

DO NOT MODIFY THE SYSTEM.

YOUR JOB IS TO IDENTIFY RISK.
