import type { Partner } from "@/modules/partners/types";

export const partners: Partner[] = [
  {
    id: "partner-sudeste-standard",
    name: "Sudeste Freight",
    active: true,
    pricingMultiplier: 1.08,
    supportedRegions: ["SP", "RJ", "MG", "ES"],
    category: "standard"
  },
  {
    id: "partner-br-premium",
    name: "BR Premium Logistics",
    active: true,
    pricingMultiplier: 1.22,
    supportedRegions: ["SP", "RJ", "MG", "PR", "SC", "RS"],
    category: "premium"
  },
  {
    id: "partner-insured-national",
    name: "National Insured Transport",
    active: true,
    pricingMultiplier: 1.32,
    supportedRegions: ["SP", "RJ", "MG", "ES", "PR", "SC", "RS", "GO"],
    category: "insured"
  },
  {
    id: "partner-inactive-demo",
    name: "Legacy Inactive Carrier",
    active: false,
    pricingMultiplier: 0.91,
    supportedRegions: ["SP", "RJ"],
    category: "standard"
  }
];
