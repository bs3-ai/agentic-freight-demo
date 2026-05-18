import { NextResponse } from "next/server";

import { sampleQuoteRequests } from "@/data/quotes";
import { createFreightQuote } from "@/modules/pricing/service";
import type { QuoteRequestPayload } from "@/modules/pricing/types";
import { parsePositiveNumber, parseRequiredString } from "@/lib/http";

export async function GET() {
  return NextResponse.json({
    examples: sampleQuoteRequests
  });
}

export async function POST(request: Request) {
  const body = (await request.json()) as Record<string, unknown>;

  const payload: QuoteRequestPayload = {
    vehicleId: parseRequiredString(body.vehicleId) ?? "",
    partnerId: parseRequiredString(body.partnerId) ?? "",
    originCity: parseRequiredString(body.originCity) ?? "",
    originState: parseRequiredString(body.originState) ?? "",
    destinationCity: parseRequiredString(body.destinationCity) ?? "",
    destinationState: parseRequiredString(body.destinationState) ?? "",
    distanceKm: parsePositiveNumber(body.distanceKm) ?? 0
  };

  if (
    !payload.vehicleId ||
    !payload.partnerId ||
    !payload.originCity ||
    !payload.originState ||
    !payload.destinationCity ||
    !payload.destinationState ||
    payload.distanceKm <= 0
  ) {
    return NextResponse.json({ error: "Invalid quote payload." }, { status: 400 });
  }

  const result = createFreightQuote(payload);

  if (!result.quote) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }

  return NextResponse.json({ quote: result.quote }, { status: result.status });
}
