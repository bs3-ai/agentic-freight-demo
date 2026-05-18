import { createFreightQuote } from "@/modules/pricing/service";

describe("quote service contract", () => {
  beforeEach(() => {
    jest.spyOn(console, "log").mockImplementation(() => undefined);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("returns a stable quote envelope for valid payloads", () => {
    const result = createFreightQuote({
      vehicleId: "veh-economy-001",
      partnerId: "partner-sudeste-standard",
      originCity: "Sao Paulo",
      originState: "SP",
      destinationCity: "Rio de Janeiro",
      destinationState: "RJ",
      distanceKm: 430
    });

    expect(result.status).toBe(200);
    expect(result.error).toBeNull();
    expect(result.quote).toMatchObject({
      partnerId: "partner-sudeste-standard",
      vehicleId: "veh-economy-001",
      totalAmount: 1091.73
    });
  });

  it("keeps unknown vehicles out of the pricing module", () => {
    const result = createFreightQuote({
      vehicleId: "missing",
      partnerId: "partner-sudeste-standard",
      originCity: "Sao Paulo",
      originState: "SP",
      destinationCity: "Rio de Janeiro",
      destinationState: "RJ",
      distanceKm: 430
    });

    expect(result).toEqual({
      quote: null,
      error: "Vehicle not found.",
      status: 404
    });
  });
});
