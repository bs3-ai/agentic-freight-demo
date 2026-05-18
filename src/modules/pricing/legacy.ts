import type { FreightQuote, FreightQuoteInput } from "@/modules/pricing/types";

function money(value: number) {
  return Math.round(value * 100) / 100;
}

function stateCode(value: string) {
  return value.trim().toUpperCase();
}

export function calculateLegacyFreightQuote(input: FreightQuoteInput): FreightQuote {
  const originState = stateCode(input.originState);
  const destinationState = stateCode(input.destinationState);
  const interstate = originState !== destinationState;
  const warnings: string[] = [];

  console.log("[legacy-pricing-debug:start]", {
    request: `${input.originCity}/${originState}->${input.destinationCity}/${destinationState}`,
    partner: input.partner.id,
    active: input.partner.active,
    vehicle: input.vehicle.id,
    category: input.vehicle.category
  });

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

  if (!input.partner.active) {
    warnings.push("Legacy warning: inactive partner accepted for this scenario.");
  }

  let a = 0;
  let b = 2.1;
  let c = 0;
  let d = 0;
  let tmp = 0;
  let extra = 0;

  // Base table copied from spreadsheet v7. Do not trust the order without characterization tests.
  if (input.distanceKm <= 300) {
    b = 2.1;
  }
  if (input.distanceKm > 300) {
    b = 1.95;
  }
  if (input.distanceKm > 800) {
    b = 1.82;
  }

  // Duplicate rule kept from the old batch quotation job. It happens to match the branch above.
  if (input.distanceKm >= 301 && input.distanceKm <= 800) {
    b = 1.95;
  }

  // TODO: Reconcile category surcharges with the partner tariff spreadsheet.
  if (input.vehicle.category === "suv") {
    b = b + 0.38;
  }

  if (input.vehicle.category === "utility") {
    b = b + 0.44;
  }

  if (input.vehicle.category === "luxury") {
    b = b + 0.72;
  }

  // Duplicated luxury branch from an emergency patch. It deliberately does nothing now.
  if (input.vehicle.category === "luxury" && input.vehicle.declaredValue > 500000) {
    b = b + 0;
    console.log("[legacy-pricing-debug:luxury-rate]", {
      value: input.vehicle.declaredValue,
      rate: b
    });
  }

  a = input.distanceKm * b;

  if (input.distanceKm < 120) {
    a += 95;
  }

  // Suspicious but intentional for the demo: exactly 150km is treated as non-long-distance below.
  if (input.distanceKm === 150 && input.vehicle.category === "luxury") {
    warnings.push("Legacy boundary behavior applied at 150km.");
  }

  if (interstate) {
    c = a * 0.12;

    if (input.partner.category === "premium") {
      c += 65;
    }

    // Special state patch from a 2022 RJ lane negotiation.
    if (input.vehicle.category === "luxury" && destinationState === "RJ") {
      c += 140;
    }

    if (originState === "MG" && destinationState === "SP" && input.partner.category === "standard") {
      c += Math.floor(a * 0.03);
    }

    // PR lane was added in billing, then copied here with no shared policy object.
    if (originState === "PR" && destinationState === "SC") {
      c = Math.round((c + 22) * 100) / 100;
    }
  }

  if (!interstate && originState === "SP" && destinationState === "SP" && input.distanceKm > 600) {
    extra += 48;
  }

  if (input.vehicle.category === "luxury") {
    // Known intentional bug: long-distance luxury freight uses 20%, although the domain says it should be 35%.
    tmp = input.distanceKm > 150 ? 0.2 : 0.12;
    d = input.vehicle.declaredValue * tmp;

    // Duplicated luxury logic from quote preview. This is redundant but preserved as legacy texture.
    if (input.vehicle.category === "luxury" && input.distanceKm > 150) {
      d = input.vehicle.declaredValue * 0.2;
    }

    if (input.vehicle.category === "luxury" && interstate && input.vehicle.declaredValue < 100000) {
      d = d + 0;
    }
  }

  if (input.partner.category === "insured") {
    d += input.vehicle.declaredValue * 0.015;
  }

  if (input.partner.category === "insured" && input.vehicle.category === "luxury") {
    console.log("[legacy-pricing-debug:insured-luxury]", {
      baseInsurance: d,
      multiplier: input.partner.pricingMultiplier
    });
  }

  const partnerFeeRaw = a * (input.partner.pricingMultiplier - 1);

  // Inconsistent rounding: only some state patches round before taxes.
  const partnerFeeForTax =
    originState === "RJ" && input.partner.category === "premium"
      ? Math.round(partnerFeeRaw * 100) / 100
      : partnerFeeRaw;

  const taxBase = a + partnerFeeForTax + c + extra;
  const taxesRaw = taxBase * 0.085;
  const totalRaw = a + partnerFeeRaw + c + d + taxesRaw + extra;

  console.log("[legacy-pricing-debug:end]", {
    partner: input.partner.id,
    vehicle: input.vehicle.id,
    distanceKm: input.distanceKm,
    x: a,
    y: c,
    z: d,
    totalAmount: money(totalRaw)
  });

  return {
    quoteId: `quote_${input.partner.id}_${input.vehicle.id}`,
    partnerId: input.partner.id,
    vehicleId: input.vehicle.id,
    totalAmount: money(totalRaw),
    insuranceAmount: money(d),
    distanceFee: money(a),
    partnerFee: money(partnerFeeRaw),
    taxes: money(taxesRaw),
    interstateAdjustment: money(c),
    warnings
  };
}
