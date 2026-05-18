import type { FreightQuoteInput } from "@/modules/pricing/types";

export function calculateLegacyInterstateAdjustment(
  input: FreightQuoteInput,
  originState: string,
  destinationState: string,
  interstate: boolean,
  distanceFee: number
) {
  let interstateAdjustment = 0;

  if (interstate) {
    interstateAdjustment = distanceFee * 0.12;

    if (input.partner.category === "premium") {
      interstateAdjustment += 65;
    }

    // Special state patch from a 2022 RJ lane negotiation.
    if (input.vehicle.category === "luxury" && destinationState === "RJ") {
      interstateAdjustment += 140;
    }

    if (originState === "MG" && destinationState === "SP" && input.partner.category === "standard") {
      interstateAdjustment += Math.floor(distanceFee * 0.03);
    }

    // PR lane was added in billing, then copied here with no shared policy object.
    if (originState === "PR" && destinationState === "SC") {
      interstateAdjustment = Math.round((interstateAdjustment + 22) * 100) / 100;
    }
  }

  return interstateAdjustment;
}
