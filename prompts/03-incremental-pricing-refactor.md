# Prompt 03 — Incremental Pricing Refactor

You are working in the `ai-coding-demo` repository as an autonomous terminal coding agent.

Your task is to incrementally refactor the legacy pricing engine located at:

`src/modules/pricing/legacy.ts`

The repository already contains characterization tests that define the CURRENT expected behavior of the system.

Your goal is NOT to modernize behavior.
Your goal is to improve maintainability while preserving runtime behavior exactly.

## Required Reading

Before making changes, read:

1. `README.md`
2. `CLAUDE.md`
3. `AGENTS.md`
4. `docs/domain.md`
5. `docs/architecture.md`
6. `docs/reports/legacy-pricing-analysis.md`
7. `tests/pricing/characterization.test.ts`
8. `src/modules/pricing/legacy.ts`

## Hard Constraints

You must NOT:

- change public APIs
- change runtime behavior
- fix known bugs
- normalize inconsistent behavior
- remove legacy quirks captured by tests
- rewrite the module from scratch
- change the `FreightQuote` contract

The characterization tests are the source of truth.

If the code appears wrong but the tests protect it, preserve the behavior.

## Refactoring Goals

Improve maintainability incrementally by:

- extracting pricing responsibilities
- isolating insurance calculations
- isolating interstate adjustments
- isolating validation logic
- improving naming
- reducing procedural complexity
- reducing duplicated logic where behavior can be preserved safely

## Preferred Refactoring Strategy

Prefer:

1. small extractions
2. compatibility layers
3. pure functions
4. isolated policies
5. explicit naming
6. incremental commits

Avoid:

- large rewrites
- architecture replacement
- speculative cleanup
- broad formatting-only changes

## Suggested Target Structure

You may introduce:

```txt
src/modules/pricing/
├── legacy.ts
├── validation.ts
├── insurance.ts
├── interstate.ts
├── calculation.ts
├── policies/
└── index.ts
```

This structure is a suggestion, not a requirement. Use only the files that materially reduce risk and improve clarity.

## Refactoring Guidance

Keep `calculateLegacyFreightQuote` as the compatibility entry point.

Recommended sequence:

1. Run the characterization tests before changing code.
2. Extract validation behavior exactly as-is.
3. Extract distance rate and distance fee calculation exactly as-is.
4. Extract interstate adjustment logic exactly as-is.
5. Extract insurance calculation exactly as-is, including the known luxury insurance bug.
6. Extract tax and total calculation only after component behavior is covered.
7. Keep response shaping compatible with the current `FreightQuote` return contract.
8. Run tests after each meaningful extraction.

Preserve all currently characterized quirks, including:

- inactive partners are blocked only below `100km`
- partner supported regions are checked only against origin state
- luxury vehicles above `150km` use `20%` insurance instead of `35%`
- exactly `150km` luxury freight keeps the current boundary behavior
- state-specific interstate adjustments
- inconsistent rounding behavior
- warning behavior
- debug logging behavior, unless tests explicitly prove it is safe to isolate without behavior change

## Validation

After refactoring:

1. Run the full test suite.
2. Run TypeScript validation.
3. Run the production build.

Required commands:

```sh
npm test
npm run typecheck
npm run build
```

All commands must pass before the task is complete.

## Final Response

Summarize:

- files changed
- which responsibilities were extracted
- how behavior preservation was verified
- any legacy quirks intentionally preserved
- any remaining risks or follow-up refactoring opportunities

# SAFETY CONSTRAINT

THIS IS A BEHAVIOR-PRESERVING REFACTORING TASK.
DO NOT FIX BUGS.
DO NOT MODERNIZE BUSINESS RULES.
DO NOT CHANGE PUBLIC CONTRACTS.
THE CHARACTERIZATION TESTS ARE THE SOURCE OF TRUTH.
