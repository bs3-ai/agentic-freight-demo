import { partners } from "@/data/partners";

export function findPartnerById(partnerId: string) {
  return partners.find((partner) => partner.id === partnerId) ?? null;
}
