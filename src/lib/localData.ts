"use client";

import type { ManagedService, PaymentMethod, Promo, Service } from "@/types";
import { services as defaultServices } from "@/data/services";
import { promos as defaultPromos } from "@/data/promos";
import { paymentMethods as defaultPaymentMethods } from "@/data/payment-methods";
import { categoryStyles, type CategoryStyleKey } from "@/lib/categoryStyles";

export const serviceStorageKey = "ride-n-care-services";
export const promoStorageKey = "ride-n-care-promos";
export const paymentMethodStorageKey = "ride-n-care-payment-methods";

const serviceStyleById: Record<string, CategoryStyleKey> = {
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

const safeParse = <T>(value: string | null, fallback: T): T => {
  if (!value) return fallback;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
};

export const defaultManagedServices: ManagedService[] = defaultServices.map((service, index) => ({
  id: service.id,
  name: service.name,
  shortName: service.shortName,
  category: service.category,
  description: service.description,
  tagline: service.tagline,
  rating: service.rating,
  totalReviews: service.totalReviews,
  startingPrice: service.startingPrice,
  duration: service.duration,
  packages: service.packages,
  addOns: service.addOns,
  active: service.active ?? true,
  sortOrder: index + 1,
  styleKey: serviceStyleById[service.id] ?? "custom",
}));

export const managedToService = (item: ManagedService): Service => {
  const style = categoryStyles[(item.styleKey as CategoryStyleKey) || "custom"] ?? categoryStyles.custom;
  return {
    ...item,
    icon: style.iconComponent,
    color: style.bg,
    accent: style.icon,
  };
};

export const readManagedServices = () => {
  if (typeof window === "undefined") return defaultManagedServices;
  return safeParse<ManagedService[]>(window.localStorage.getItem(serviceStorageKey), defaultManagedServices);
};

export const saveManagedServices = (items: ManagedService[]) => {
  window.localStorage.setItem(serviceStorageKey, JSON.stringify(items));
  window.dispatchEvent(new Event("ride-n-care-services-updated"));
};

export const readClientServices = () =>
  readManagedServices()
    .filter((item) => item.active)
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map(managedToService);

export const readClientService = (id: string) => readClientServices().find((service) => service.id === id) ?? readClientServices()[0] ?? defaultServices[0];

export const readPromos = () => {
  const fallback = defaultPromos.map((promo, index) => ({ ...promo, active: true, sortOrder: index + 1 }));
  if (typeof window === "undefined") return fallback;
  return safeParse<Promo[]>(window.localStorage.getItem(promoStorageKey), fallback);
};

export const savePromos = (items: Promo[]) => {
  window.localStorage.setItem(promoStorageKey, JSON.stringify(items));
  window.dispatchEvent(new Event("ride-n-care-promos-updated"));
};

export const readActivePromos = () =>
  readPromos()
    .filter((promo) => promo.active !== false)
    .sort((a, b) => (a.sortOrder ?? 1) - (b.sortOrder ?? 1));

export const readPaymentMethods = () => {
  if (typeof window === "undefined") return defaultPaymentMethods;
  return safeParse<PaymentMethod[]>(window.localStorage.getItem(paymentMethodStorageKey), defaultPaymentMethods);
};

export const savePaymentMethods = (items: PaymentMethod[]) => {
  window.localStorage.setItem(paymentMethodStorageKey, JSON.stringify(items));
  window.dispatchEvent(new Event("ride-n-care-payment-methods-updated"));
};
