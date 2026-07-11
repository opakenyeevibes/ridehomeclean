import type { AddOn, Package, Service } from "@/types";

export type BookingCalculation = {
  basePrice: number;
  addOnPrice: number;
  urgentFee: number;
  crewFee: number;
  platformFee: number;
  total: number;
  recommendedWorkers: number;
  minimumWorkers: number;
  estimatedMinutes: number;
  reason: string;
};

const platformFee = 5000;
const urgentFeeValue = 25000;

export function getAvailableAddOns(service: Service, packageId: string) {
  return service.addOns.filter((addon) => {
    if (addon.active === false) return false;
    if (addon.serviceIds?.length && !addon.serviceIds.includes(service.id)) return false;
    if (addon.packageIds?.length && !addon.packageIds.includes(packageId)) return false;
    return true;
  });
}

export function calculateBasePrice(service: Service, selectedPackage: Package, quantity: number) {
  const safeQuantity = Math.max(service.quantityRule?.min ?? 1, quantity);
  if (service.pricingUnit === "quote") return selectedPackage.price;
  if (service.pricingUnit && !["per_order", "quote"].includes(service.pricingUnit)) return selectedPackage.price * safeQuantity;
  return selectedPackage.price + Math.max(0, safeQuantity - 1) * Math.round(service.startingPrice * 0.55);
}

export function parseTeamCount(team: string, fallback: number) {
  if (team.startsWith("Tim")) return Number.parseInt(team.replace(/\D/g, ""), 10) || fallback;
  return Number.parseInt(team, 10) || fallback;
}

export function getRecommendedWorkers(service: Service, selectedPackage: Package, quantity: number, selectedAddOns: AddOn[]) {
  const crewRule = service.crewRule ?? { baseCapacity: 2, additionalCrewFee: 50000, reason: "Jumlah partner mengikuti kapasitas pekerjaan." };
  const packageWorkers = selectedPackage.recommendedWorkers ?? selectedPackage.minWorkers ?? 1;
  const quantityWorkers = Math.ceil(Math.max(1, quantity) / Math.max(1, crewRule.baseCapacity));
  const addOnWorkers = selectedAddOns.reduce((sum, addon) => sum + (addon.additionalWorkerRequirement ?? 0), 0);
  const minWorkers = Math.max(service.workerRule?.min ?? 1, selectedPackage.minWorkers ?? 1);
  const recommended = Math.max(minWorkers, service.workerRule?.recommended ?? 1, packageWorkers, quantityWorkers + addOnWorkers);
  return Math.min(service.workerRule?.max ?? recommended, recommended);
}

export function calculateBooking({
  service,
  selectedPackage,
  quantity,
  selectedAddOns,
  teamCount,
  urgent,
}: {
  service: Service;
  selectedPackage: Package;
  quantity: number;
  selectedAddOns: AddOn[];
  teamCount: number;
  urgent: boolean;
}): BookingCalculation {
  const basePrice = calculateBasePrice(service, selectedPackage, quantity);
  const addOnPrice = selectedAddOns.reduce((sum, addon) => sum + addon.price, 0);
  const urgentFee = urgent ? urgentFeeValue : 0;
  const minimumWorkers = getRecommendedWorkers(service, selectedPackage, quantity, selectedAddOns);
  const appliedTeamCount = Math.max(teamCount, minimumWorkers);
  const crewRule = service.crewRule ?? { baseCapacity: 2, additionalCrewFee: 50000, reason: "Jumlah partner mengikuti kapasitas pekerjaan." };
  const crewFee = Math.max(0, appliedTeamCount - minimumWorkers) * crewRule.additionalCrewFee;
  const estimatedMinutes = selectedAddOns.reduce((sum, addon) => sum + (addon.estimatedMinutes ?? 0), 0);
  return {
    basePrice,
    addOnPrice,
    urgentFee,
    crewFee,
    platformFee,
    total: basePrice + addOnPrice + urgentFee + crewFee + platformFee,
    recommendedWorkers: appliedTeamCount,
    minimumWorkers,
    estimatedMinutes,
    reason: crewRule.reason,
  };
}
