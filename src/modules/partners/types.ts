export type PartnerCategory = "standard" | "premium" | "insured";

export interface Partner {
  id: string;
  name: string;
  active: boolean;
  pricingMultiplier: number;
  supportedRegions: string[];
  category: PartnerCategory;
}
