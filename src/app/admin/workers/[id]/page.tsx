import { Star } from "lucide-react";
import { AdminShell } from "@/components/admin/AdminShell";
import { workers } from "@/data/workers";
import { orders } from "@/data/orders";
import { formatPrice } from "@/lib/utils";

export default function AdminWorkerDetail({ params }: { params: { id: string } }) {
  const worker = workers.find((item)=>item.id===params.id) ?? workers[0];
  const workerOrders = orders.filter((order)=>order.workerId===worker.id);
  return <AdminShell title={worker.name} desc="Profil, performa, dan job worker."><section className="card p-6"><div className="flex items-center gap-4"><span className="grid size-16 place-items-center rounded-2xl bg-[#FFF6DE] font-black text-[#2FA084]">{worker.initials}</span><div><b className="block text-lg">{worker.name}</b><p className="text-sm text-[#667085]">{worker.skills.join(" · ")}</p></div></div><div className="mt-5 grid gap-3 md:grid-cols-4"><div className="rounded-2xl bg-[#EEEEEE] p-4"><small>Status</small><b className="block">{worker.status}</b></div><div className="rounded-2xl bg-[#EEEEEE] p-4"><small>Rating</small><b className="flex items-center gap-1"><Star size={14} fill="#FFE394" strokeWidth={0}/>{worker.rating}</b></div><div className="rounded-2xl bg-[#EEEEEE] p-4"><small>Job selesai</small><b className="block">{worker.completedJobs}</b></div><div className="rounded-2xl bg-[#EEEEEE] p-4"><small>Penghasilan</small><b className="block">{formatPrice(worker.earningsTotal)}</b></div></div></section><h2 className="mb-4 mt-6 text-lg font-extrabold">Job terkait</h2><div className="grid gap-3">{workerOrders.map((order)=><div key={order.id} className="card p-4 text-sm"><b>{order.id} · {order.serviceName}</b><p className="text-[#667085]">{order.customerName} — {order.date}, {order.time}</p></div>)}</div></AdminShell>;
}
