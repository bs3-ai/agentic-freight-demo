# Legacy Pricing Analysis

## 1. Executive Summary

`src/modules/pricing/legacy.ts` contains a single exported function, `calculateLegacyFreightQuote`, that performs validation, pricing, insurance calculation, interstate adjustments, warning generation, debug logging, rounding, and response shaping in one procedural flow.

The module is functional and returns the expected `FreightQuote` contract, but it intentionally contains several high-risk legacy characteristics: magic numbers, ambiguous temporary variables, duplicated logic, inconsistent validation, state-specific patches, debug logs inside domain code, and inconsistent rounding behavior.

The most important behaviors to protect before any refactoring are:

- inactive partners are blocked only when `distanceKm < 100`
- partner supported regions are checked only against `originState`
- luxury vehicles above `150km` use a `20%` insurance multiplier, despite the documented correct value being `35%`
- interstate freight applies a `12%` adjustment to distance fee, plus state and partner-specific patches
- output rounding happens only at the final return for most values, with selective earlier rounding for one interstate state patch and one tax path

This module should not be corrected or decomposed until characterization tests capture the current behavior across distance boundaries, vehicle categories, partner categories, state lanes, inactive partner cases, and rounding-sensitive scenarios.

## 2. Identified Business Rules

Confirmed behavior in `calculateLegacyFreightQuote`:

- Distance must be greater than zero. `distanceKm <= 0` throws `"Distance must be greater than zero."`
- Inactive partners are rejected only for short trips where `!partner.active && distanceKm < 100`.
- Partner region support is checked only against the normalized origin state.
- Inactive partners accepted for longer trips add the warning `"Legacy warning: inactive partner accepted for this scenario."`
- Vehicle category changes the per-kilometer rate:
  - `suv` adds `0.38`
  - `utility` adds `0.44`
  - `luxury` adds `0.72`
- Short trips under `120km` add `95` to the distance fee.
- Interstate trips apply additional adjustments.
- Partner category affects pricing:
  - `premium` adds `65` to interstate adjustment
  - `insured` adds `1.5%` of declared vehicle value to insurance
- The final quote includes `totalAmount`, `insuranceAmount`, `distanceFee`, `partnerFee`, `taxes`, `interstateAdjustment`, and `warnings`.

Inferred intent:

- Comments refer to sales hotfixes, old spreadsheets, quote preview duplication, billing patches, and state lane negotiations. These appear intentionally legacy for the live demo and should be preserved until explicitly refactored under test coverage.

## 3. Pricing Logic

The base per-kilometer rate is stored in ambiguous variable `b`.

Confirmed distance tiers:

- `distanceKm <= 300`: `b = 2.1`
- `distanceKm > 300`: `b = 1.95`
- `distanceKm > 800`: `b = 1.82`
- duplicated rule for `distanceKm >= 301 && distanceKm <= 800`: `b = 1.95`

The distance fee is stored in variable `a` and calculated as:

- `a = distanceKm * b`
- if `distanceKm < 120`, add `95`

The partner fee is:

- `partnerFeeRaw = a * (partner.pricingMultiplier - 1)`

Taxes are:

- `taxBase = a + partnerFeeForTax + c + extra`
- `taxesRaw = taxBase * 0.085`

The final total is:

- `totalRaw = a + partnerFeeRaw + c + d + taxesRaw + extra`

Risk:

- The pricing flow is correct only by reading variable evolution across the function. Variables `a`, `b`, `c`, `d`, `tmp`, and `extra` obscure meaning and make refactoring error-prone.

## 4. Interstate Freight Rules

Interstate freight is detected with:

- `originState !== destinationState`

When interstate is true:

- `c = a * 0.12`
- if partner category is `premium`, add `65`
- if vehicle category is `luxury` and destination state is `RJ`, add `140`
- if origin is `MG`, destination is `SP`, and partner category is `standard`, add `Math.floor(a * 0.03)`
- if origin is `PR` and destination is `SC`, set `c = Math.round((c + 22) * 100) / 100`

Risks:

- Interstate rules are hardcoded directly in the main pricing function.
- State lane patches use different rounding behavior.
- The `MG -> SP` standard rule floors the surcharge, while the `PR -> SC` rule rounds to cents immediately.
- There is no explicit policy object or separation between general interstate logic and lane-specific exceptions.

## 5. Insurance Rules

Luxury insurance is calculated in variable `d`.

Confirmed behavior:

- if vehicle category is `luxury`, `tmp = distanceKm > 150 ? 0.2 : 0.12`
- `d = declaredValue * tmp`
- duplicated luxury branch repeats the long-distance rule:
  - if `luxury && distanceKm > 150`, `d = declaredValue * 0.2`
- if partner category is `insured`, add `declaredValue * 0.015`

Known bug:

- Domain documentation says luxury vehicles above `150km` should use `35%`, but legacy code uses `20%`.
- This is explicitly commented as intentional and must be protected with characterization tests before correction.

Additional risk:

- `distanceKm === 150` is not long-distance because the condition uses `> 150`, not `>= 150`.
- A warning is added for luxury vehicles at exactly `150km`, but the insurance still uses the `12%` path.

## 6. Inconsistent Validation Behavior

Confirmed inconsistencies:

- Inactive partners are blocked only when `distanceKm < 100`.
- Inactive partners can generate quotes for `distanceKm >= 100`, with only a warning.
- Partner supported regions are checked only against `originState`.
- `destinationState` is not checked against `partner.supportedRegions`.

Why this is dangerous:

- The domain states inactive partners must never generate quotations, but the current behavior allows long-haul inactive partner quotes.
- A refactor that centralizes partner validation could accidentally "fix" this and break characterization expectations.
- Checking destination region support later may change quote availability and API behavior.

## 7. Hidden Edge Cases

Important edge cases visible in the code:

- `distanceKm <= 0` throws.
- `distanceKm = 99` with inactive partner throws.
- `distanceKm = 100` with inactive partner does not throw.
- `distanceKm = 119` receives the short-trip `95` fee.
- `distanceKm = 120` does not receive the short-trip fee.
- `distanceKm = 150` luxury adds a warning and uses `12%` insurance.
- `distanceKm = 151` luxury uses the known-bug `20%` insurance.
- `distanceKm = 300`, `301`, `800`, and `801` cross duplicated distance tier logic.
- `originState` and `destinationState` are trimmed and uppercased before comparison.
- `MG -> SP` standard interstate trips use a floored surcharge.
- `PR -> SC` interstate trips round adjustment before final return.
- `RJ` origin with `premium` partner rounds partner fee before tax, but returns the unrounded partner fee.
- Intrastate `SP -> SP` trips over `600km` add `48` via `extra`.

## 8. Technical Risks

- Mixed responsibilities: validation, pricing, insurance, warnings, logging, rounding, and DTO creation happen in one function.
- Debug logging is inside domain logic, which violates the architecture preference to keep business rules isolated from logging concerns.
- Magic numbers are not named or documented as policy values.
- Ambiguous variables make semantic preservation difficult.
- Branch order affects behavior, especially for distance tiers and duplicated luxury insurance.
- Rounding is inconsistent and may produce subtle differences when extracted.
- State-specific rules are embedded as conditional branches rather than isolated policies.
- Comments indicate historical patches, but there is no source of truth for whether they are still required.

## 9. Legacy Smells

Observed legacy smells:

- large procedural function
- ambiguous temporary variables: `a`, `b`, `c`, `d`, `tmp`, `extra`
- magic numbers: `100`, `120`, `150`, `300`, `301`, `800`, `2.1`, `1.95`, `1.82`, `0.38`, `0.44`, `0.72`, `95`, `0.12`, `65`, `140`, `0.03`, `22`, `48`, `0.2`, `0.015`, `0.085`
- duplicated distance rule for `301..800`
- duplicated luxury long-distance insurance logic
- no-op branches such as `b = b + 0` and `d = d + 0`
- historical patch comments
- `TODO` and `FIXME` markers inside core pricing flow
- debug logs using internal names like `x`, `y`, `z`
- direct string construction for `quoteId`

## 10. Suspicious Conditions

Suspicious but likely intentional for the demo:

- `!partner.active && distanceKm < 100`: contradicts domain rule that inactive partners must never generate quotations.
- `partner.supportedRegions.includes(originState)`: only origin state is validated.
- `distanceKm === 150 && luxury`: adds a warning for the boundary but does not change the insurance path.
- `distanceKm > 150 ? 0.2 : 0.12`: preserves the known luxury insurance bug.
- duplicated `luxury && distanceKm > 150` branch resets `d` to the same `20%` calculation.
- `luxury && interstate && declaredValue < 100000`: no-op branch for a luxury vehicle with a low declared value.
- `originState === "RJ" && premium`: rounds partner fee for tax only, not for returned `partnerFee`.
- `b = b + 0`: no-op in a high-value luxury branch that only logs.

These should be covered or explicitly documented before refactoring because they may be mistaken for dead code or obvious bugs.

## 11. Architecture Concerns

The module stays inside the correct pricing domain path, but it violates several intended architecture boundaries:

- Domain logic includes `console.log` calls.
- Validation is not isolated from calculation.
- Partner validation rules are embedded in pricing instead of a partner validation module.
- Insurance logic is embedded in the main freight calculation.
- Interstate policy logic is embedded in the same procedural flow as distance pricing.
- Return contract formatting and rounding happen alongside business calculations.

The API contract is preserved today because `calculateLegacyFreightQuote` returns a `FreightQuote`, but future extraction must maintain that compatibility layer.

## 12. Potential Regression Risks

High-risk regression areas:

- Changing inactive partner validation to match the domain rule would break current behavior for long trips.
- Adding destination region validation would reject quotes currently allowed.
- Replacing `> 150` with `>= 150` would change luxury insurance at exactly `150km`.
- Correcting the luxury insurance multiplier from `20%` to `35%` would significantly change totals.
- Removing duplicated branches may alter logs, warnings, or branch ordering if done carelessly.
- Moving rounding earlier or later can change cents-level totals.
- Extracting state rules without preserving `Math.floor` and `Math.round` placement can change interstate adjustments.
- Removing debug logs may change presentation expectations if the demo relies on visible legacy behavior during build or runtime.

## 13. Recommended Characterization Test Scenarios

Before refactoring, add characterization tests for:

- active standard partner, economy vehicle, interstate `SP -> RJ`, medium distance
- inactive partner at `99km` throws
- inactive partner at `100km` returns a quote with warning
- partner supports origin but not destination, quote still succeeds
- partner does not support origin, quote throws
- luxury vehicle at `150km` uses `12%` insurance and emits boundary warning
- luxury vehicle at `151km` uses `20%` insurance
- luxury long-distance insured partner adds both `20%` luxury insurance and `1.5%` insured partner amount
- distance boundaries at `119`, `120`, `300`, `301`, `800`, and `801`
- premium interstate partner adds `65`
- luxury interstate to `RJ` adds `140`
- `MG -> SP` standard lane applies `Math.floor(a * 0.03)`
- `PR -> SC` lane applies `+22` and rounds interstate adjustment early
- intrastate `SP -> SP` over `600km` adds `48`
- `RJ` origin with premium partner rounds partner fee for tax but returns raw rounded-at-output partner fee

Tests should assert both component values and total amount, because totals depend on ordering and rounding.

## 14. Recommended Incremental Refactoring Strategy

Recommended future sequence after characterization tests exist:

1. Preserve `calculateLegacyFreightQuote` as the compatibility entry point.
2. Introduce named local concepts for `distanceFee`, `ratePerKm`, `interstateAdjustment`, `insuranceAmount`, and `extraFee` without changing behavior.
3. Extract validation checks behind functions that intentionally preserve current inconsistencies.
4. Extract distance tier calculation, including duplicated boundary behavior.
5. Extract vehicle category surcharge logic.
6. Extract interstate adjustment logic, preserving state-specific rounding and floor behavior.
7. Extract luxury and insured-partner insurance logic, preserving the known `20%` bug until a separate bug-fix task.
8. Extract rounding and response shaping last, after all component totals are covered.
9. Only after behavior-preserving refactoring is complete, open separate explicit tasks for correcting known domain bugs.

The first refactoring milestone should improve readability without changing any public output shape or business behavior.
