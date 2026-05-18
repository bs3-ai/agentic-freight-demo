export type VehicleCategory = "economy" | "suv" | "luxury" | "utility";

export interface Vehicle {
  id: string;
  label: string;
  category: VehicleCategory;
  declaredValue: number;
}
