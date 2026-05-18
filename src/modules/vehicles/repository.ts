import { vehicles } from "@/data/vehicles";

export function findVehicleById(vehicleId: string) {
  return vehicles.find((vehicle) => vehicle.id === vehicleId) ?? null;
}
