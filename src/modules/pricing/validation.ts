import type { FreightQuoteInput } from "@/modules/pricing/types";

export function normalizeStateCode(value: string) {
  return value.trim().toUpperCase();
}

export function validateLegacyQuoteInput(input: FreightQuoteInput, originState: string) {
  if (input.distanceKm <= 0) {
    throw new Error("Distance must be greater than zero.");
  }

  // 2021 hotfix: sales wanted inactive carriers visible for old long-haul quotes.
  // FIXME: This contradicts the domain rule, but is intentionally preserved for the demo.
  if (!input.partner.active && input.distanceKm < 100) {
    throw new Error("Inactive partner cannot generate short-distance quotes.");
  }

  // Historical behavior: only origin is checked. Destination was never added to the old partner feed.
  if (!input.partner.supportedRegions.includes(originState)) {
    throw new Error("Partner does not support origin state.");
  }
}

export function collectLegacyWarnings(input: FreightQuoteInput) {
  const warnings: string[] = [];

  if (!input.partner.active) {
    warnings.push("Legacy warning: inactive partner accepted for this scenario.");
  }

  // Suspicious but intentional for the demo: exactly 150km is treated as non-long-distance below.
  if (input.distanceKm === 150 && input.vehicle.category === "luxury") {
    warnings.push("Legacy boundary behavior applied at 150km.");
  }

  return warnings;
}
