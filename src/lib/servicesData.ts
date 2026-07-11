"use client";

import { categoryStyles } from "@/lib/categoryStyles";
import { readClientService, readClientServices } from "@/lib/localData";
import type { AddOn, Package, Service } from "@/types";

type ApiService = {
  id: string;
  slug: string;
  name: string;
  category: string;
  description: string;
  icon?: string | null;
  startingPrice: number | string;
  duration: string;
  rating: number | string;
  totalReviews: number;
  packages?: Array<{
    id: string;
    name: string;
    price: number | string;
    duration: string;
    description: string;
    includes: string[] | unknown;
    sortOrder?: number;
  }>;
  addOns?: Array<{
    id: string;
    name: string;
    price: number | string;
    description?: string | null;
  }>;
};

const styleKeyBySlug: Record<string, keyof typeof categoryStyles> = {
  "home-cleaning": "home",
  "room-cleaning": "room",
  bathroom: "bathroom",
  garden: "outdoor",
  "car-wash": "car",
  "bike-wash": "motor",
  "deep-clean": "deepClean",
  office: "office",
  premium: "premium",
  custom: "custom",
};

const normalizeIncludes = (value: unknown) => Array.isArray(value) ? value.map(String) : [];

export function mapApiService(item: ApiService): Service {
  const fallback = readClientService(item.slug);
  const styleKey = styleKeyBySlug[item.slug] ?? "home";
  const style = categoryStyles[styleKey];
  const packages: Package[] = item.packages?.length
    ? item.packages.map((pkg, index) => ({
      id: pkg.id,
      name: pkg.name,
      price: Number(pkg.price),
      duration: pkg.duration,
      description: pkg.description,
      features: normalizeIncludes(pkg.includes),
      popular: index === 1,
      recommendedWorkers: fallback?.packages.find((localPkg) => localPkg.name === pkg.name)?.recommendedWorkers,
      minWorkers: fallback?.packages.find((localPkg) => localPkg.name === pkg.name)?.minWorkers,
    }))
    : fallback?.packages ?? [];
  const addOns: AddOn[] = item.addOns?.length
    ? item.addOns.map((addon) => ({
      id: addon.id,
      name: addon.name,
      price: Number(addon.price),
      duration: addon.description ?? "+30 mnt",
      active: true,
    }))
    : fallback?.addOns ?? [];

  return {
    id: item.slug,
    name: item.name,
    shortName: fallback?.shortName ?? item.name,
    category: item.category,
    description: item.description,
    tagline: fallback?.tagline ?? "Care datang ke lokasi kamu.",
    rating: Number(item.rating),
    totalReviews: item.totalReviews,
    startingPrice: Number(item.startingPrice),
    duration: item.duration,
    color: style.bg,
    accent: style.icon,
    icon: style.iconComponent,
    packages,
    addOns,
    active: true,
    pricingUnit: fallback?.pricingUnit,
    quantityRule: fallback?.quantityRule,
    workerRule: fallback?.workerRule,
    crewRule: fallback?.crewRule,
    customQuoteOnly: fallback?.customQuoteOnly,
    deprecated: fallback?.deprecated,
  };
}

export async function fetchServices() {
  try {
    const response = await fetch("/api/services", { cache: "no-store" });
    const payload = await response.json().catch(() => null);
    if (!response.ok || !payload?.ok || !Array.isArray(payload.data)) throw new Error("Services API gagal");
    return payload.data.map(mapApiService) as Service[];
  } catch {
    return readClientServices();
  }
}

export async function fetchService(id: string) {
  try {
    const response = await fetch(`/api/services/${id}`, { cache: "no-store" });
    const payload = await response.json().catch(() => null);
    if (!response.ok || !payload?.ok || !payload.data) throw new Error("Service API gagal");
    return mapApiService(payload.data as ApiService);
  } catch {
    return readClientService(id);
  }
}
