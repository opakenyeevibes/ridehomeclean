"use client";

import type { ManagedService, PaymentMethod, Promo, Service } from "@/types";
import { services as defaultServices } from "@/data/services";
import { promos as defaultPromos } from "@/data/promos";
import { paymentMethods as defaultPaymentMethods } from "@/data/payment-methods";
import { categoryStyles, type CategoryStyleKey } from "@/lib/categoryStyles";
import { defaultManagedServices } from "@/lib/defaultManagedServices";

export const serviceStorageKey = "ride-n-care-services";
export const promoStorageKey = "ride-n-care-promos";
export const paymentMethodStorageKey = "ride-n-care-payment-methods";

const safeParse = <T>(value: string | null, fallback: T): T => {
  if (!value) return fallback;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
};

const normalizeManagedServices = (items: ManagedService[]) => {
  const defaultById = new Map(defaultManagedServices.map((item) => [item.id, item]));
  const seen = new Set<string>();
  const normalized = items.map((item) => {
    const fallback = defaultById.get(item.id);
    seen.add(item.id);
    if (!fallback || (item.quantityRule && item.workerRule && item.pricingUnit)) return item;
    return {
      ...fallback,
      active: item.active ?? fallback.active,
      sortOrder: item.sortOrder ?? fallback.sortOrder,
      styleKey: item.styleKey ?? fallback.styleKey,
    };
  });
  return [
    ...normalized,
    ...defaultManagedServices.filter((item) => !seen.has(item.id)),
  ].sort((a, b) => a.sortOrder - b.sortOrder);
};

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
  return normalizeManagedServices(safeParse<ManagedService[]>(window.localStorage.getItem(serviceStorageKey), defaultManagedServices));
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

export const readClientService = (id: string) => readClientServices().find((service) => service.id === id) ?? null;

export const readFallbackClientService = () => readClientServices()[0] ?? defaultServices[0];

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
