# Prompt 01 — Analyze Legacy Pricing

You are working in the `ai-coding-demo` repository as an autonomous terminal coding agent.

Your task is to perform a full engineering analysis of the legacy pricing module:

`src/modules/pricing/legacy.ts`

This is an analysis-only task for a professional engineering workflow. Do not modify runtime behavior.

## Required Reading

Before analyzing the legacy module, read these files in order:

1. `README.md`
2. `CLAUDE.md`
3. `AGENTS.md`
4. `docs/domain.md`
5. `docs/architecture.md`
6. `src/modules/pricing/legacy.ts`

Use the repository documentation as the source of truth for domain intent, architectural boundaries, and agent behavior.

## Hard Constraints

You must NOT:

- edit production code
- fix bugs
- refactor code
- change public APIs
- change return contracts
- create tests
- update snapshots
- run broad cleanup
- remove intentional legacy behavior

If you notice a bug, document it. Do not fix it.

If you notice missing tests, recommend them. Do not create them.

## Analysis Scope

Analyze `src/modules/pricing/legacy.ts` and identify:

- business rules
- pricing logic
- interstate freight rules
- insurance rules
- hidden edge cases
- technical debt
- duplicated logic
- dangerous refactoring areas
- inconsistent validation behavior
- suspicious conditions
- architecture violations
- potential regression risks

Also identify:

- what behavior must be protected with characterization tests
- what logic appears intentionally legacy for demonstration purposes
- what areas should be isolated during future refactoring

Pay special attention to:

- inactive partner validation behavior
- luxury vehicle insurance behavior
- long-distance freight calculations
- interstate adjustments
- state-specific special cases
- rounding behavior
- debug logging
- mixed validation and calculation responsibilities
- ambiguous temporary variables
- duplicated luxury and distance logic

## Output

Create this report:
If `docs/reports/` does not exist, create it before writing the report.

`docs/reports/legacy-pricing-analysis.md`

The report must be written for engineers and technical leads. Keep it precise, actionable, and grounded in the code.

The report must include these sections:

1. Executive Summary
2. Identified Business Rules
3. Pricing Logic
4. Interstate Freight Rules
5. Insurance Rules
6. Inconsistent Validation Behavior
7. Hidden Edge Cases
8. Technical Risks
9. Legacy Smells
10. Suspicious Conditions
11. Architecture Concerns
12. Potential Regression Risks
13. Recommended Characterization Test Scenarios
14. Recommended Incremental Refactoring Strategy

## Reporting Guidance

When writing the report:

- reference concrete functions, branches, conditions, and values from `src/modules/pricing/legacy.ts`
- distinguish confirmed behavior from inferred intent
- call out intentional demo legacy behavior when it appears likely
- describe why each risky area is dangerous to refactor
- recommend characterization tests before any behavior changes
- keep refactoring recommendations incremental and compatible with the current API

Do not include speculative rewrites or proposed replacement code.

The goal is to help a future agent safely understand the legacy pricing engine before any test creation or refactoring begins.

# SAFETY CONSTRAINT

THIS IS AN ANALYSIS-ONLY TASK.
DO NOT MODIFY PRODUCTION CODE.
DO NOT CREATE TESTS.
DO NOT FIX BUGS.
DO NOT REFACTOR THE SYSTEM.
YOUR ONLY GOAL IS TO UNDERSTAND AND DOCUMENT THE LEGACY PRICING ENGINE.
