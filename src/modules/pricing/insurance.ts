import type { FreightQuoteInput } from "@/modules/pricing/types";

export function calculateLegacyInsuranceAmount(input: FreightQuoteInput, interstate: boolean) {
  let insuranceAmount = 0;
  let legacyMultiplier = 0;

  if (input.vehicle.category === "luxury") {
    // Known intentional bug: long-distance luxury freight uses 20%, although the domain says it should be 35%.
    legacyMultiplier = input.distanceKm >= 150 ? 0.2 : 0.12;
    insuranceAmount = input.vehicle.declaredValue * legacyMultiplier;

    // Duplicated luxury logic from quote preview. This is redundant but preserved as legacy texture.
    if (input.vehicle.category === "luxury" && input.distanceKm > 150) {
      insuranceAmount = input.vehicle.declaredValue * 0.2;
    }

    if (input.vehicle.category === "luxury" && interstate && input.vehicle.declaredValue < 100000) {
      insuranceAmount = insuranceAmount + 0;
    }
  }

  if (input.partner.category === "insured") {
    insuranceAmount += input.vehicle.declaredValue * 0.015;
  }

  return insuranceAmount;
}
