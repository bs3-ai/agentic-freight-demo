import type { Vehicle } from "@/modules/vehicles/types";

export const vehicles: Vehicle[] = [
  {
    id: "veh-economy-001",
    label: "Honda Fit 2018",
    category: "economy",
    declaredValue: 52000
  },
  {
    id: "veh-suv-001",
    label: "Toyota Corolla Cross 2022",
    category: "suv",
    declaredValue: 165000
  },
  {
    id: "veh-luxury-001",
    label: "BMW X5 2023",
    category: "luxury",
    declaredValue: 540000
  },
  {
    id: "veh-utility-001",
    label: "Fiat Toro 2021",
    category: "utility",
    declaredValue: 132000
  }
];
