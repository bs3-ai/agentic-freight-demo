import { findPartnerById } from "@/modules/partners/repository";
import { calculateLegacyFreightQuote } from "@/modules/pricing/legacy";
import type { FreightQuote, QuoteRequestPayload } from "@/modules/pricing/types";
import { findVehicleById } from "@/modules/vehicles/repository";

export interface QuoteResult {
  quote: FreightQuote | null;
  error: string | null;
  status: number;
}

export function createFreightQuote(payload: QuoteRequestPayload): QuoteResult {
  const vehicle = findVehicleById(payload.vehicleId);
  const partner = findPartnerById(payload.partnerId);

  if (!vehicle) {
    return { quote: null, error: "Vehicle not found.", status: 404 };
  }

  if (!partner) {
    return { quote: null, error: "Partner not found.", status: 404 };
  }

  try {
    const quote = calculateLegacyFreightQuote({
      vehicle,
      partner,
      originCity: payload.originCity,
      originState: payload.originState,
      destinationCity: payload.destinationCity,
      destinationState: payload.destinationState,
      distanceKm: payload.distanceKm
    });

    return { quote, error: null, status: 200 };
  } catch (error) {
    return {
      quote: null,
      error: error instanceof Error ? error.message : "Unable to calculate quote.",
      status: 400
    };
  }
}
