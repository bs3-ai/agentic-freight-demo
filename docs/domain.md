# Freight Quotation Domain

This document describes the fictional business domain used throughout the AI Coding Demo repository.

The domain intentionally contains realistic business rules, legacy inconsistencies and operational edge cases to support demonstrations of AI-assisted engineering workflows.

---

# Platform Overview

The platform simulates a vehicle freight quotation system.

Customers request freight quotations to transport vehicles between cities and states using logistics partners integrated into the platform.

The system calculates pricing based on:
- vehicle type
- distance
- origin state
- destination state
- partner category
- insurance requirements

---

# Core Entities

## Vehicle

Represents the vehicle being transported.

Important fields:
- category
- declared value
- origin city
- destination city
- distance in kilometers

Example categories:
- economy
- suv
- luxury
- utility

---

## Partner

Represents a logistics operator capable of transporting vehicles.

Important fields:
- active status
- pricing multiplier
- supported regions
- partner category

Example partner categories:
- standard
- premium
- insured

---

## Freight Quote

Represents a calculated freight quotation.

Important fields:
- total amount
- insurance amount
- distance fee
- partner fee
- taxes
- interstate adjustments

---

# Pricing Rules

## Base Distance Pricing

Freight cost increases proportionally with total distance.

The legacy implementation contains:
- hardcoded distance thresholds
- duplicated calculations
- inconsistent rounding behavior

---

## Interstate Freight Rules

Freight crossing state borders applies additional pricing adjustments.

The rules vary based on:
- origin state
- destination state
- partner category
- vehicle category

Some rules are intentionally hardcoded in the legacy module.

---

## Luxury Vehicle Insurance

Luxury vehicles require mandatory insurance calculations.

Insurance should increase for:
- high-value vehicles
- long-distance transportation
- interstate freight

Known legacy issue:
Luxury vehicles above 150km incorrectly apply a 20% insurance multiplier instead of 35%.

This bug is intentionally preserved for demonstration purposes.

---

# Inactive Partner Restrictions

Inactive logistics partners must never generate valid quotations.

The legacy module inconsistently validates partner activity status.

This inconsistency is intentionally included to support:
- characterization testing
- bug discovery
- AI-assisted code review demonstrations

---

# Legacy Technical Problems

The pricing module intentionally contains several realistic anti-patterns.

Examples:
- oversized functions
- business logic mixed with formatting
- debug logging
- magic numbers
- duplicated conditions
- hidden edge cases
- inconsistent naming
- poor separation of concerns

These issues exist intentionally for educational demonstrations.

---

# Expected Refactoring Goals

The repository demonstrations aim to show how AI agents can safely:

- analyze legacy business logic
- document technical debt
- preserve behavior using characterization tests
- isolate pricing policies
- separate validation logic
- extract insurance rules
- improve maintainability incrementally

---

# Important Constraints

Agents must:
- preserve API contracts
- avoid broad rewrites
- create tests before changing behavior
- document assumptions
- validate edge cases

The repository intentionally favors:
- incremental refactoring
- deterministic validation
- architecture preservation

over:
- aggressive rewrites
- speculative cleanup
- large uncontrolled changes

---

# Demonstration Objectives

This domain exists to support demonstrations of:

- AI-assisted legacy analysis
- characterization testing
- refactoring workflows
- automated code review
- harness engineering
- CI/CD validation
- multi-agent collaboration

The business domain itself is fictional.

The engineering workflows are the real focus of the repository.
