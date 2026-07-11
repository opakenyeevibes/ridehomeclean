"use client";

import { useEffect, useState } from "react";
import { MoreHorizontal } from "lucide-react";
import { orders as initial } from "@/data/orders";
import { workers } from "@/data/workers";
import { formatPrice, statusLabels } from "@/lib/utils";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { assignOrderWorker, fetchOrders, updateOrderStatus } from "@/lib/ordersData";
import { saveLocalOrders } from "@/lib/prototypeOrders";
import type { Order, OrderStatus } from "@/types";

type WorkerOption = { id: string; name: string };

const statuses: OrderStatus[] = ["created", "waiting_confirmation", "searching", "worker_found", "on_the_way", "arrived", "working", "work_completed", "completed", "rating", "scheduled", "cancelled"];

export function AdminTable({ limit }: { limit?: number }) {
  const [data, setData] = useState<Order[]>(initial);
  const [filter, setFilter] = useState("all");
  const [workerOptions, setWorkerOptions] = useState<WorkerOption[]>(workers.map((worker) => ({ id: worker.id, name: worker.name })));

  useEffect(() => {
    fetchOrders().then(setData).catch(() => null);
    fetch("/api/admin/workers", { cache: "no-store" })
      .then((response) => response.ok ? response.json() : null)
      .then((payload) => {
        if (payload?.ok && Array.isArray(payload.data)) setWorkerOptions(payload.data.map((worker: WorkerOption) => ({ id: worker.id, name: worker.name })));
      })
      .catch(() => null);
    const sync = () => fetchOrders().then(setData).catch(() => null);
    window.addEventListener("ride-home-care-orders-updated", sync);
    return () => window.removeEventListener("ride-home-care-orders-updated", sync);
  }, []);

  const shown = data.filter((order) => filter === "all" || order.status === filter).slice(0, limit);
  const persist = (next: Order[]) => {
    setData(next);
    saveLocalOrders(next);
  };
  const change = (id: string, status: OrderStatus) => {
    persist(data.map((order) => (order.id === id ? { ...order, status } : order)));
    updateOrderStatus(id, status).then(() => fetchOrders().then(setData)).catch(() => null);
  };
  const assign = (id: string, workerId: string) => {
    const worker = workerOptions.find((item) => item.id === workerId);
    const patch = {
      workerId: workerId || undefined,
      workerName: worker?.name ?? "Belum ditentukan",
      status: workerId ? ("worker_found" as OrderStatus) : ("searching" as OrderStatus),
    };
    persist(data.map((order) => (order.id === id ? { ...order, ...patch } : order)));
    assignOrderWorker(id, workerId, patch).then(() => fetchOrders().then(setData)).catch(() => null);
  };

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <select value={filter} onChange={(event) => setFilter(event.target.value)} className="h-11 rounded-2xl border border-[#D8DEDA] bg-white px-4 text-xs font-black outline-none shadow-[0_8px_18px_rgba(22,51,46,.035)] transition focus:border-[#2FA084]">
          <option value="all">Semua status</option>
          {statuses.map((status) => (
            <option key={status} value={status}>
              {statusLabels[status]}
            </option>
          ))}
        </select>
        <span className="text-[10px] font-bold text-[#84908c]">{shown.length} pesanan</span>
      </div>

      <div className="overflow-x-auto rounded-[24px] border border-[#D8DEDA] bg-white shadow-[0_14px_36px_rgba(22,51,46,.045)]">
        <table className="w-full min-w-[1080px] text-left">
          <thead className="bg-[#F4F7F5] text-[10px] font-black uppercase tracking-[.18em] text-[#75827e]">
            <tr>
              <th className="px-5 py-4">ID Pesanan</th>
              <th className="px-3 py-4">Layanan</th>
              <th className="px-3 py-4">Pelanggan</th>
              <th className="px-3 py-4">Worker</th>
              <th className="px-3 py-4">Jadwal</th>
              <th className="px-3 py-4">Total</th>
              <th className="px-3 py-4">Status</th>
              <th className="px-4 py-4" />
            </tr>
          </thead>
          <tbody>
            {shown.map((order) => (
              <tr key={order.id} className="border-t border-[#edf1ef] text-xs transition hover:bg-[#FAFCFB]">
                <td className="px-5 py-4 font-black">{order.id}</td>
                <td className="px-3 py-4">
                  <b className="block">{order.serviceName}</b>
                  <small className="text-[#7d8985]">{order.packageName}</small>
                </td>
                <td className="px-3 py-4">
                  <b className="block">{order.customerName}</b>
                  <small className="text-[#7d8985]">{order.location}</small>
                </td>
                <td className="px-3 py-4">
                  <select value={order.workerId ?? ""} onChange={(event) => assign(order.id, event.target.value)} className="h-9 w-40 rounded-xl border border-[#D8DEDA] bg-white px-3 text-[10px] font-black outline-none transition focus:border-[#2FA084]">
                    <option value="">Belum ditentukan</option>
                    {workerOptions.map((worker) => (
                      <option key={worker.id} value={worker.id}>
                        {worker.name}
                      </option>
                    ))}
                  </select>
                  <small className="mt-1.5 block text-[#7d8985]">{order.workerName}</small>
                </td>
                <td className="px-3 py-4">
                  {order.date}
                  <small className="mt-0.5 block text-[#7d8985]">{order.time}</small>
                </td>
                <td className="px-3 py-4 font-black">{formatPrice(order.totalPrice)}</td>
                <td className="px-3 py-4">
                  <div className="flex min-w-[178px] flex-col items-start gap-2">
                    <select aria-label="Ubah status" value={order.status} onChange={(event) => change(order.id, event.target.value as OrderStatus)} className="h-9 w-full rounded-xl border border-[#D8DEDA] bg-white px-3 text-[10px] font-black outline-none transition focus:border-[#2FA084]">
                      {statuses.map((status) => (
                        <option key={status} value={status}>
                          {statusLabels[status]}
                        </option>
                      ))}
                    </select>
                    <StatusBadge status={order.status} />
                  </div>
                </td>
                <td className="px-4 py-4">
                  <button type="button" className="grid size-8 place-items-center rounded-xl transition hover:bg-[#f0f3f2]">
                    <MoreHorizontal size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
