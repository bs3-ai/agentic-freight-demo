import type { FreightQuote, FreightQuoteInput } from "@/modules/pricing/types";
import {
  calculateLegacyDistance,
  calculateLegacyExtraFee,
  calculateLegacyTotals,
  money
} from "@/modules/pricing/calculation";
import { calculateLegacyInsuranceAmount } from "@/modules/pricing/insurance";
import { calculateLegacyInterstateAdjustment } from "@/modules/pricing/interstate";
import {
  collectLegacyWarnings,
  normalizeStateCode,
  validateLegacyQuoteInput
} from "@/modules/pricing/validation";

export function calculateLegacyFreightQuote(input: FreightQuoteInput): FreightQuote {
  const originState = normalizeStateCode(input.originState);
  const destinationState = normalizeStateCode(input.destinationState);
  const interstate = originState !== destinationState;

  console.log("[legacy-pricing-debug:start]", {
    request: `${input.originCity}/${originState}->${input.destinationCity}/${destinationState}`,
    partner: input.partner.id,
    active: input.partner.active,
    vehicle: input.vehicle.id,
    category: input.vehicle.category
  });

  validateLegacyQuoteInput(input, originState);

  const warnings = collectLegacyWarnings(input);
  const { distanceFee, ratePerKm } = calculateLegacyDistance(input);

  if (input.vehicle.category === "luxury" && input.vehicle.declaredValue > 500000) {
    console.log("[legacy-pricing-debug:luxury-rate]", {
      value: input.vehicle.declaredValue,
      rate: ratePerKm
    });
  }

  const interstateAdjustment = calculateLegacyInterstateAdjustment(
    input,
    originState,
    destinationState,
    interstate,
    distanceFee
  );
  const extraFee = calculateLegacyExtraFee(input, originState, destinationState, interstate);
  const insuranceAmount = calculateLegacyInsuranceAmount(input, interstate);

  if (input.partner.category === "insured" && input.vehicle.category === "luxury") {
    console.log("[legacy-pricing-debug:insured-luxury]", {
      baseInsurance: insuranceAmount,
      multiplier: input.partner.pricingMultiplier
    });
  }

  const { partnerFeeRaw, taxesRaw, totalRaw } = calculateLegacyTotals({
    input,
    originState,
    distanceFee,
    interstateAdjustment,
    insuranceAmount,
    extraFee
  });

  console.log("[legacy-pricing-debug:end]", {
    partner: input.partner.id,
    vehicle: input.vehicle.id,
    distanceKm: input.distanceKm,
    x: distanceFee,
    y: interstateAdjustment,
    z: insuranceAmount,
    totalAmount: money(totalRaw)
  });

  return {
    quoteId: `quote_${input.partner.id}_${input.vehicle.id}`,
    partnerId: input.partner.id,
    vehicleId: input.vehicle.id,
    totalAmount: money(totalRaw),
    insuranceAmount: money(insuranceAmount),
    distanceFee: money(distanceFee),
    partnerFee: money(partnerFeeRaw),
    taxes: money(taxesRaw),
    interstateAdjustment: money(interstateAdjustment),
    warnings
  };
}
