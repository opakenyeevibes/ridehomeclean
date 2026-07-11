"use client";

import type { Order, OrderStatus } from "@/types";
import { createPrototypeOrder, fetchPrototypeOrders, patchPrototypeOrder, saveLocalOrders } from "@/lib/prototypeOrders";

type ApiEnvelope<T> = { ok: boolean; data?: T; error?: string };

type ApiOrder = {
  id: string;
  orderCode?: string;
  customer?: { id: string; name: string };
  customerId?: string;
  worker?: { id: string; name: string } | null;
  workerId?: string | null;
  service?: { id: string; slug?: string; name: string; category?: string };
  serviceId?: string;
  package?: { id: string; name: string };
  packageName?: string;
  address?: { fullAddress?: string; city?: string; district?: string };
  status: string;
  bookingDate?: string;
  bookingTime?: string;
  paymentMethod: string;
  paymentStatus: string;
  totalPrice: number | string;
  customerNotes?: string | null;
  addOns?: Array<{ name?: string; addOn?: { name: string } }>;
};

export const dbToUiStatus = (status: string): OrderStatus => {
  const map: Record<string, OrderStatus> = {
    created: "created",
    waiting_confirmation: "waiting_confirmation",
    finding_worker: "searching",
    worker_assigned: "worker_found",
    worker_on_the_way: "on_the_way",
    arrived: "arrived",
    working: "working",
    completed: "completed",
    waiting_rating: "rating",
    finished: "completed",
    cancelled: "cancelled",
  };
  return map[status] ?? "created";
};

export const uiToDbStatus = (status: OrderStatus) => {
  const map: Record<OrderStatus, string> = {
    created: "created",
    waiting_confirmation: "waiting_confirmation",
    searching: "finding_worker",
    worker_found: "worker_assigned",
    partner_found: "worker_assigned",
    on_the_way: "worker_on_the_way",
    arrived: "arrived",
    working: "working",
    in_progress: "working",
    work_completed: "completed",
    completed: "completed",
    rating: "waiting_rating",
    cancelled: "cancelled",
    scheduled: "created",
  };
  return map[status];
};

const formatDate = (value?: string) => {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "short", year: "numeric" }).format(date);
};

export function mapApiOrder(order: ApiOrder): Order {
  const address = order.address?.fullAddress ?? "-";
  const location = [order.address?.district, order.address?.city].filter(Boolean).join(", ") || order.address?.city || "-";
  return {
    id: order.orderCode ?? order.id,
    customerId: order.customer?.id ?? order.customerId ?? "",
    customerName: order.customer?.name ?? "Customer Ride Home Care",
    workerId: order.worker?.id ?? order.workerId ?? undefined,
    workerName: order.worker?.name ?? "Belum ditentukan",
    serviceId: order.service?.slug ?? order.serviceId ?? "",
    serviceName: order.service?.name ?? "Ride Home Care",
    packageName: order.package?.name ?? order.packageName ?? "Paket layanan",
    status: dbToUiStatus(order.status),
    date: formatDate(order.bookingDate),
    time: order.bookingTime ?? "-",
    address,
    location,
    paymentMethod: order.paymentMethod,
    paymentStatus: order.paymentStatus === "paid" ? "paid" : order.paymentStatus === "refunded" ? "refunded" : "unpaid",
    totalPrice: Number(order.totalPrice),
    notes: order.customerNotes ?? "",
    addOnNames: order.addOns?.map((item) => item.name ?? item.addOn?.name).filter(Boolean) as string[] | undefined,
  };
}

async function parseEnvelope<T>(response: Response) {
  const payload = (await response.json().catch(() => null)) as ApiEnvelope<T> | null;
  if (!response.ok || !payload?.ok || payload.data === undefined) throw new Error(payload?.error ?? "Request gagal");
  return payload.data;
}

export async function fetchOrders() {
  try {
    const data = await parseEnvelope<ApiOrder[]>(await fetch("/api/orders", { cache: "no-store" }));
    const mapped = data.map(mapApiOrder);
    saveLocalOrders(mapped);
    return mapped;
  } catch {
    return fetchPrototypeOrders();
  }
}

export async function createOrder(order: Order, payload: {
  serviceId: string;
  packageId: string;
  bookingDate: string;
  bookingTime: string;
  paymentMethod: string;
  customerNotes?: string;
  addOns?: { addOnId: string; quantity?: number }[];
  address?: {
    label?: string;
    fullAddress: string;
    city?: string;
    district?: string;
    notes?: string;
  };
}) {
  try {
    const created = await parseEnvelope<ApiOrder>(await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }));
    const mapped = mapApiOrder(created);
    window.dispatchEvent(new Event("ride-home-care-orders-updated"));
    return mapped;
  } catch {
    return createPrototypeOrder(order);
  }
}

export async function updateOrderStatus(id: string, status: OrderStatus, patch?: Partial<Order>) {
  try {
    const updated = await parseEnvelope<ApiOrder>(await fetch(`/api/orders/${id}/status`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: uiToDbStatus(status) }),
    }));
    window.dispatchEvent(new Event("ride-home-care-orders-updated"));
    return mapApiOrder(updated);
  } catch {
    return patchPrototypeOrder(id, { ...patch, status });
  }
}

export async function assignOrderWorker(id: string, workerId: string, patch: Partial<Order>) {
  try {
    const updated = await parseEnvelope<ApiOrder>(await fetch(`/api/admin/orders/${id}/assign-worker`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ workerId }),
    }));
    window.dispatchEvent(new Event("ride-home-care-orders-updated"));
    return mapApiOrder(updated);
  } catch {
    return patchPrototypeOrder(id, patch);
  }
}
