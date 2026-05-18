import type { Partner } from "@/modules/partners/types";
import type { Vehicle } from "@/modules/vehicles/types";

export interface FreightQuoteInput {
  vehicle: Vehicle;
  partner: Partner;
  originCity: string;
  originState: string;
  destinationCity: string;
  destinationState: string;
  distanceKm: number;
}

export interface FreightQuote {
  quoteId: string;
  partnerId: string;
  vehicleId: string;
  totalAmount: number;
  insuranceAmount: number;
  distanceFee: number;
  partnerFee: number;
  taxes: number;
  interstateAdjustment: number;
  warnings: string[];
}

export interface QuoteRequestPayload {
  vehicleId: string;
  partnerId: string;
  originCity: string;
  originState: string;
  destinationCity: string;
  destinationState: string;
  distanceKm: number;
}
