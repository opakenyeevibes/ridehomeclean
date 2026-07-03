"use client";

import type { Order } from "@/types";
import { orders as defaultOrders } from "@/data/orders";

export const orderStorageKey = "ride-home-care-orders";

const safeParse = <T>(value: string | null, fallback: T): T => {
  if (!value) return fallback;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
};

export const readLocalOrders = () => {
  if (typeof window === "undefined") return defaultOrders;
  return safeParse<Order[]>(window.localStorage.getItem(orderStorageKey), defaultOrders);
};

export const saveLocalOrders = (items: Order[]) => {
  window.localStorage.setItem(orderStorageKey, JSON.stringify(items));
  window.dispatchEvent(new Event("ride-home-care-orders-updated"));
};

export async function fetchPrototypeOrders() {
  const response = await fetch("/api/prototype/orders", { cache: "no-store" });
  if (!response.ok) return readLocalOrders();
  const payload = await response.json();
  if (!payload?.ok || !Array.isArray(payload.data)) return readLocalOrders();
  saveLocalOrders(payload.data);
  return payload.data as Order[];
}

export async function createPrototypeOrder(order: Order) {
  const response = await fetch("/api/prototype/orders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ order }),
  });
  const payload = response.ok ? await response.json() : null;
  const next = payload?.ok && Array.isArray(payload.data) ? payload.data as Order[] : [order, ...readLocalOrders()];
  saveLocalOrders(next);
  return order;
}

export async function patchPrototypeOrder(id: string, patch: Partial<Order>) {
  const response = await fetch("/api/prototype/orders", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, patch }),
  });
  const payload = response.ok ? await response.json() : null;
  const next = payload?.ok && Array.isArray(payload.data)
    ? payload.data as Order[]
    : readLocalOrders().map((item) => item.id === id ? { ...item, ...patch } : item);
  saveLocalOrders(next);
  return next;
}
