import Link from "next/link";
import { ChevronRight, MapPin } from "lucide-react";
import { WorkerShell } from "@/components/worker/WorkerShell";
import { orders } from "@/data/orders";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { formatPrice } from "@/lib/utils";

export default function WorkerJobsPage() {
  return <WorkerShell title="Daftar Job"><div className="mb-5"><span className="text-[10px] font-black tracking-[.16em] text-[#2FA084]">JOB RIDE N CARE</span><h1 className="mt-1 text-2xl font-black">Pekerjaan tersedia</h1></div><div className="space-y-3">{orders.slice(0,3).map((order)=><Link href={`/worker/jobs/${order.id}`} key={order.id} className="card block p-5 transition hover:-translate-y-0.5 active:scale-[.99]"><div className="flex items-start justify-between gap-3"><div><small className="font-black text-[#8a9692]">{order.id}</small><h2 className="mt-1 font-black">{order.serviceName}</h2><p className="text-xs text-[#667085]">{order.customerName} · {order.packageName}</p></div><StatusBadge status={order.status}/></div><p className="mt-4 flex gap-2 text-xs text-[#667085]"><MapPin size={15}/>{order.address}</p><div className="mt-4 flex items-center justify-between"><b>{formatPrice(order.totalPrice)}</b><span className="flex items-center gap-1 text-xs font-black">Detail <ChevronRight size={14}/></span></div></Link>)}</div></WorkerShell>;
}
