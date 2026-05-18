import { partners } from "@/data/partners";
import { vehicles } from "@/data/vehicles";
import { calculateLegacyFreightQuote } from "@/modules/pricing/legacy";

const luxuryVehicle = vehicles.find((vehicle) => vehicle.id === "veh-luxury-001")!;
const economyVehicle = vehicles.find((vehicle) => vehicle.id === "veh-economy-001")!;
const insuredPartner = partners.find((partner) => partner.id === "partner-insured-national")!;
const inactivePartner = partners.find((partner) => partner.id === "partner-inactive-demo")!;
const standardPartner = partners.find((partner) => partner.id === "partner-sudeste-standard")!;

describe("legacy pricing characterization", () => {
  beforeEach(() => {
    jest.spyOn(console, "log").mockImplementation(() => undefined);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("preserves the known luxury long-distance insurance bug", () => {
    const quote = calculateLegacyFreightQuote({
      vehicle: luxuryVehicle,
      partner: insuredPartner,
      originCity: "Sao Paulo",
      originState: "SP",
      destinationCity: "Belo Horizonte",
      destinationState: "MG",
      distanceKm: 586
    });

    expect(quote.insuranceAmount).toBe(116100);
    expect(quote.totalAmount).toBe(118544.56);
  });

  it("preserves interstate standard partner adjustments", () => {
    const quote = calculateLegacyFreightQuote({
      vehicle: economyVehicle,
      partner: standardPartner,
      originCity: "Sao Paulo",
      originState: "SP",
      destinationCity: "Rio de Janeiro",
      destinationState: "RJ",
      distanceKm: 430
    });

    expect(quote.distanceFee).toBe(838.5);
    expect(quote.interstateAdjustment).toBe(100.62);
    expect(quote.partnerFee).toBe(67.08);
    expect(quote.taxes).toBe(85.53);
    expect(quote.totalAmount).toBe(1091.73);
  });

  it("documents inactive partner inconsistency for long trips", () => {
    const quote = calculateLegacyFreightQuote({
      vehicle: economyVehicle,
      partner: inactivePartner,
      originCity: "Sao Paulo",
      originState: "SP",
      destinationCity: "Rio de Janeiro",
      destinationState: "RJ",
      distanceKm: 430
    });

    expect(quote.warnings).toContain("Legacy warning: inactive partner accepted for this scenario.");
    expect(quote.totalAmount).toBe(937.07);
  });

  it("blocks inactive partners only for short trips in the legacy implementation", () => {
    expect(() =>
      calculateLegacyFreightQuote({
        vehicle: economyVehicle,
        partner: inactivePartner,
        originCity: "Sao Paulo",
        originState: "SP",
        destinationCity: "Santos",
        destinationState: "SP",
        distanceKm: 72
      })
    ).toThrow("Inactive partner cannot generate short-distance quotes.");
  });
});
