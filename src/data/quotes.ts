import type { QuoteRequestPayload } from "@/modules/pricing/types";

export const sampleQuoteRequests: QuoteRequestPayload[] = [
  {
    vehicleId: "veh-economy-001",
    partnerId: "partner-sudeste-standard",
    originCity: "Sao Paulo",
    originState: "SP",
    destinationCity: "Rio de Janeiro",
    destinationState: "RJ",
    distanceKm: 430
  },
  {
    vehicleId: "veh-luxury-001",
    partnerId: "partner-insured-national",
    originCity: "Sao Paulo",
    originState: "SP",
    destinationCity: "Belo Horizonte",
    destinationState: "MG",
    distanceKm: 586
  }
];
