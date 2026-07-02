import { CalendarDays } from "lucide-react";
import { WorkerShell } from "@/components/worker/WorkerShell";
import { orders } from "@/data/orders";

export default function WorkerSchedulePage() {
  return <WorkerShell title="Jadwal"><div className="mb-5"><span className="text-[10px] font-black tracking-[.16em] text-[#2FA084]">HARI INI</span><h1 className="mt-1 text-2xl font-black">Jadwal kerja</h1></div><div className="space-y-3">{orders.slice(0,3).map((order)=><article key={order.id} className="card flex gap-4 p-5"><span className="grid size-12 place-items-center rounded-2xl bg-[#FFF6DE] text-[#2FA084]"><CalendarDays size={19}/></span><div><b className="block">{order.time} WIB · {order.serviceName}</b><small className="text-[#667085]">{order.customerName} — {order.address}</small></div></article>)}</div></WorkerShell>;
}
