# Prompt 02 — Create Characterization Tests

You are working in the `ai-coding-demo` repository as an autonomous terminal coding agent.

Your task is to create characterization tests for the current legacy pricing engine:

`src/modules/pricing/legacy.ts`

The goal is to preserve CURRENT behavior before refactoring. This includes inconsistent, surprising, and incorrect legacy behavior.

The objective is NOT to fix bugs. The objective is to protect the behavior that exists today.

## Required Reading

Before creating tests, read these files in order:

1. `README.md`
2. `CLAUDE.md`
3. `AGENTS.md`
4. `docs/domain.md`
5. `docs/architecture.md`
6. `docs/reports/legacy-pricing-analysis.md`
7. `src/modules/pricing/legacy.ts`

Use the repository documentation and the legacy analysis report to decide which behaviors are regression-sensitive.

## Hard Constraints

You must NOT:

- refactor production code
- fix bugs
- change public APIs
- change business rules
- normalize inconsistent behavior
- remove duplicate logic
- rewrite the pricing engine
- update production data unless absolutely required for a test fixture

If the current behavior contradicts the domain documentation, write a characterization test that captures the current behavior.

If the current behavior appears buggy, write a characterization test that captures the bug.

## Test Location

Create characterization tests under:

`tests/pricing/characterization.test.ts`

If `tests/pricing/` does not exist, create it.

## Required Coverage Areas

The tests should capture:

- inactive partner behavior
- luxury insurance behavior
- interstate pricing
- state-specific adjustments
- rounding behavior
- boundary conditions
- duplicated logic behavior
- warnings
- long-distance thresholds

The tests must include:

- happy paths
- edge cases
- regression-sensitive scenarios
- boundary conditions

## Scenarios To Include

At minimum, cover:

- active standard partner with economy vehicle on an interstate route
- inactive partner below `100km` throws
- inactive partner at or above `100km` returns a quote and emits the legacy warning
- partner supported regions are checked only against origin state
- unsupported origin state throws
- luxury vehicle at exactly `150km` uses the legacy boundary behavior
- luxury vehicle above `150km` preserves the known `20%` insurance bug
- insured partner adds the additional `1.5%` declared-value insurance amount
- distance thresholds around `119km`, `120km`, `300km`, `301km`, `800km`, and `801km`
- premium interstate partner adjustment
- luxury interstate destination `RJ` adjustment
- `MG -> SP` standard lane adjustment using floored surcharge behavior
- `PR -> SC` lane adjustment with early rounding
- intrastate `SP -> SP` trip over `600km` extra fee behavior
- rounding-sensitive behavior where taxes and returned component values can diverge

You may add more tests if they clarify current behavior.

## Testing Guidance

When writing tests:

- call `calculateLegacyFreightQuote` directly
- use local test fixtures where needed
- keep expected values explicit
- assert component values, not only totals
- assert warnings when they are part of current behavior
- assert thrown error messages for validation behavior
- mock `console.log` so debug logs do not pollute test output
- name tests as behavior descriptions, not implementation details

Do not make the tests assert the desired future behavior. Assert the behavior that exists now.

## Validation

After creating the tests:

1. Run the full test suite.
2. Ensure all tests pass.
3. Do not change production code to make the tests pass.
4. If a test fails because your expected value is wrong, inspect the current behavior and update the test expectation to match the legacy implementation.

## Final Response

Summarize:

- which behavior is now protected
- which known bugs or inconsistencies were intentionally captured
- the test command that was run
- whether the suite passed

# SAFETY CONSTRAINT

THIS IS A CHARACTERIZATION-ONLY TASK.
DO NOT MODIFY PRODUCTION CODE.
DO NOT FIX BUGS.
DO NOT REFACTOR THE SYSTEM.
PRESERVE CURRENT LEGACY BEHAVIOR EXACTLY AS OBSERVED.
