import type { FreightQuoteInput } from "@/modules/pricing/types";

export interface LegacyDistanceResult {
  distanceFee: number;
  ratePerKm: number;
}

export interface LegacyTotalsInput {
  input: FreightQuoteInput;
  originState: string;
  distanceFee: number;
  interstateAdjustment: number;
  insuranceAmount: number;
  extraFee: number;
}

export interface LegacyTotalsResult {
  partnerFeeRaw: number;
  taxesRaw: number;
  totalRaw: number;
}

export function money(value: number) {
  return Math.round(value * 100) / 100;
}

export function calculateLegacyDistance(input: FreightQuoteInput): LegacyDistanceResult {
  let ratePerKm = 2.1;

  // Base table copied from spreadsheet v7. Do not trust the order without characterization tests.
  if (input.distanceKm <= 300) {
    ratePerKm = 2.1;
  }
  if (input.distanceKm > 300) {
    ratePerKm = 1.95;
  }
  if (input.distanceKm > 800) {
    ratePerKm = 1.82;
  }

  // Duplicate rule kept from the old batch quotation job. It happens to match the branch above.
  if (input.distanceKm >= 301 && input.distanceKm <= 800) {
    ratePerKm = 1.95;
  }

  // TODO: Reconcile category surcharges with the partner tariff spreadsheet.
  if (input.vehicle.category === "suv") {
    ratePerKm = ratePerKm + 0.38;
  }

  if (input.vehicle.category === "utility") {
    ratePerKm = ratePerKm + 0.44;
  }

  if (input.vehicle.category === "luxury") {
    ratePerKm = ratePerKm + 0.72;
  }

  // Duplicated luxury branch from an emergency patch. It deliberately does nothing now.
  if (input.vehicle.category === "luxury" && input.vehicle.declaredValue > 500000) {
    ratePerKm = ratePerKm + 0;
  }

  let distanceFee = input.distanceKm * ratePerKm;

  if (input.distanceKm < 120) {
    distanceFee += 95;
  }

  return { distanceFee, ratePerKm };
}

export function calculateLegacyExtraFee(
  input: FreightQuoteInput,
  originState: string,
  destinationState: string,
  interstate: boolean
) {
  let extraFee = 0;

  if (!interstate && originState === "SP" && destinationState === "SP" && input.distanceKm > 600) {
    extraFee += 48;
  }

  return extraFee;
}

export function calculateLegacyTotals({
  input,
  originState,
  distanceFee,
  interstateAdjustment,
  insuranceAmount,
  extraFee
}: LegacyTotalsInput): LegacyTotalsResult {
  const partnerFeeRaw = distanceFee * (input.partner.pricingMultiplier - 1);

  // Inconsistent rounding: only some state patches round before taxes.
  const partnerFeeForTax =
    originState === "RJ" && input.partner.category === "premium"
      ? Math.round(partnerFeeRaw * 100) / 100
      : partnerFeeRaw;

  const taxBase = distanceFee + partnerFeeForTax + interstateAdjustment + extraFee;
  const taxesRaw = taxBase * 0.085;
  const totalRaw = distanceFee + partnerFeeRaw + interstateAdjustment + insuranceAmount + taxesRaw + extraFee;

  return { partnerFeeRaw, taxesRaw, totalRaw };
}
