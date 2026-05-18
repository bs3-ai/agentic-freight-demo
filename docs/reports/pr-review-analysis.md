# Pull Request Review Analysis

## 1. Executive Summary

Reviewed branch: `demo/02-ai-review`

Compared against base branch: `origin/demo/01-safe-refactor`

This PR contains a high-risk pricing behavior change in `src/modules/pricing/insurance.ts`. The luxury insurance condition changed from `distanceKm > 150` to `distanceKm >= 150`, which changes the quote output for luxury vehicles at exactly `150km`.

This is not a behavior-preserving refactor. It changes a boundary condition explicitly identified as regression-sensitive in `docs/reports/legacy-pricing-analysis.md`.

Recommendation: do not merge this PR as-is.

## 2. High-Risk Findings

### High: Luxury insurance now treats exactly 150km as long-distance

File: `src/modules/pricing/insurance.ts:9`

Current PR condition:

```ts
legacyMultiplier = input.distanceKm >= 150 ? 0.2 : 0.12;
```

Base branch condition:

```ts
legacyMultiplier = input.distanceKm > 150 ? 0.2 : 0.12;
```

Operational impact:

- Luxury quotes at exactly `150km` now use `20%` insurance instead of `12%`.
- For a declared value of `540000`, base luxury insurance changes from `64800` to `108000`.
- The `FreightQuote` shape is preserved, so API contract checks can pass while pricing changes silently.

Why this is dangerous:

- The legacy analysis explicitly says `distanceKm = 150` should use the `12%` path and emit a boundary warning.
- The domain says the known legacy issue applies above `150km`, not at `150km`.
- The change looks like a small cleanup but modifies business behavior.

## 3. Business Logic Concerns

The branch changes the legacy insurance rule for luxury vehicles.

Previously:

- `distanceKm = 150` used `12%`
- `distanceKm > 150` used the known-bug `20%`

Now:

- `distanceKm >= 150` uses `20%`

This expands the known bug to include the boundary value. That is a pricing change and should not be included in a review/refactor workflow that must preserve current behavior.

## 4. Boundary Condition Risks

The affected boundary is exactly `150km`, one of the cases called out in the analysis report.

Legacy behavior:

- `149km`: `12%`
- `150km`: `12%`
- `151km`: `20%`

PR behavior:

- `149km`: `12%`
- `150km`: `20%`
- `151km`: `20%`

There is also a suspicious internal mismatch in `src/modules/pricing/insurance.ts`:

- line 9 uses `>= 150`
- line 13 still uses `> 150`

That leaves duplicated luxury logic with different boundary semantics.

## 5. Architecture Review

No public API contract change is visible:

- `calculateLegacyFreightQuote` remains the entry point.
- The returned `FreightQuote` shape is unchanged.
- Pricing code remains inside `src/modules/pricing`.

The architectural issue is workflow safety:

- characterization tests are supposed to protect current behavior before refactoring;
- this PR changes a protected business condition;
- no test was added to document or justify the changed behavior.

## 6. Regression Risk Analysis

Regression risk is high for luxury quotes at exactly `150km`.

Affected fields:

- `insuranceAmount`
- `totalAmount`

Likely unaffected fields:

- `distanceFee`
- `partnerFee`
- `interstateAdjustment`
- `taxes`
- `warnings`

This is a hidden regression because the quote still succeeds and returns the same contract shape.

## 7. Test Coverage Concerns

Current characterization file:

`tests/characterization/legacy-pricing.test.ts`

Current tests cover:

- luxury long-distance insurance at `586km`
- interstate standard partner pricing
- inactive partner long-trip warning behavior
- inactive partner short-trip rejection

Missing coverage for this PR:

- luxury vehicle at exactly `150km`
- luxury vehicle at `151km`
- explicit assertion that `150km` uses `12%`
- assertion that the `150km` warning remains aligned with the insurance behavior

Validation run:

```sh
npm test
```

Result:

- passed, 2 suites
- passed, 6 tests

The passing suite does not prove behavior preservation because the changed boundary is untested.

## 8. Recommended Follow-up Actions

1. Revert `src/modules/pricing/insurance.ts:9` from `>= 150` back to `> 150`.
2. Add characterization tests for luxury vehicles at `149km`, `150km`, and `151km`.
3. At `150km`, assert both `insuranceAmount` and the warning `"Legacy boundary behavior applied at 150km."`
4. Keep the known `20%` luxury insurance bug only for distances above `150km` until a separate explicit bug-fix task.
5. Treat future edits to pricing boundaries as business logic changes, not cleanup.
