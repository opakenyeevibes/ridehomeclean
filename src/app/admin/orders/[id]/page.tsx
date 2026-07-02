import { AdminShell } from "@/components/admin/AdminShell";
import { orders } from "@/data/orders";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { formatPrice } from "@/lib/utils";

export default function AdminOrderDetail({ params }: { params: { id: string } }) {
  const order = orders.find((item)=>item.id===params.id) ?? orders[0];
  return <AdminShell title={`Pesanan ${order.id}`} desc="Detail pesanan untuk operasional internal."><section className="card p-6"><div className="flex flex-wrap items-start justify-between gap-4"><div><b className="block text-xl">{order.serviceName} · {order.packageName}</b><p className="mt-1 text-sm text-[#667085]">{order.customerName} — {order.address}</p></div><StatusBadge status={order.status}/></div><div className="mt-6 grid gap-3 md:grid-cols-4">{[["Jadwal", `${order.date}, ${order.time}`],["Worker", order.workerName],["Pembayaran", `${order.paymentMethod} · ${order.paymentStatus}`],["Total", formatPrice(order.totalPrice)]].map(([label,value])=><div key={label} className="rounded-2xl bg-[#EEEEEE] p-4"><small className="text-[#667085]">{label}</small><b className="mt-1 block">{value}</b></div>)}</div><p className="mt-5 rounded-2xl bg-[#FFF6DE] p-4 text-sm text-[#2FA084]">{order.notes}</p></section></AdminShell>;
}
