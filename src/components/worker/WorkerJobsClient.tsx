"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronRight, MapPin } from "lucide-react";
import { orders as initialOrders } from "@/data/orders";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { formatPrice } from "@/lib/utils";
import { fetchPrototypeOrders } from "@/lib/prototypeOrders";
import type { Order } from "@/types";

export function WorkerJobsClient() {
  const [orders, setOrders] = useState<Order[]>(initialOrders);

  useEffect(() => {
    fetchPrototypeOrders().then(setOrders).catch(() => null);
    const sync = () => fetchPrototypeOrders().then(setOrders).catch(() => null);
    window.addEventListener("ride-home-care-orders-updated", sync);
    return () => window.removeEventListener("ride-home-care-orders-updated", sync);
  }, []);

  const jobs = orders.filter((order) => order.status !== "completed" && order.status !== "cancelled").slice(0, 8);

  return (
    <div className="space-y-3">
      {jobs.map((order) => (
        <Link href={`/worker/jobs/${order.id}`} key={order.id} className="card block p-5 transition hover:-translate-y-0.5 active:scale-[.99]">
          <div className="flex items-start justify-between gap-3">
            <div>
              <small className="font-black text-[#8a9692]">{order.id}</small>
              <h2 className="mt-1 font-black">{order.serviceName}</h2>
              <p className="text-xs text-[#667085]">{order.customerName} · {order.packageName}</p>
            </div>
            <StatusBadge status={order.status}/>
          </div>
          <p className="mt-4 flex gap-2 text-xs text-[#667085]"><MapPin size={15}/>{order.address}</p>
          <div className="mt-4 flex items-center justify-between"><b>{formatPrice(order.totalPrice)}</b><span className="flex items-center gap-1 text-xs font-black">Detail <ChevronRight size={14}/></span></div>
        </Link>
      ))}
    </div>
  );
}
