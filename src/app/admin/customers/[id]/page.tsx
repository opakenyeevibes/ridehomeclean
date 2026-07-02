import { AdminShell } from "@/components/admin/AdminShell";
import { customers } from "@/data/users";
import { orders } from "@/data/orders";
import { OrderCard } from "@/components/orders/OrderCard";

export default function AdminCustomerDetail({ params }: { params: { id: string } }) {
  const customer = customers.find((item)=>item.id===params.id) ?? customers[0];
  const customerOrders = orders.filter((order)=>order.customerId===customer.id);
  return <AdminShell title={customer.name} desc="Detail customer dan riwayat pesanan."><section className="card p-6"><b className="block text-lg">{customer.name}</b><p className="mt-1 text-sm text-[#667085]">{customer.phone} · {customer.email}</p><div className="mt-4 grid gap-3 md:grid-cols-2">{customer.addresses.map((address)=><div key={address.id} className="rounded-2xl bg-[#EEEEEE] p-4 text-sm"><b>{address.label}</b><p className="mt-1 text-[#667085]">{address.address}</p></div>)}</div></section><h2 className="mb-4 mt-6 text-lg font-extrabold">Riwayat pesanan</h2><div className="grid gap-4 md:grid-cols-2">{customerOrders.map((order)=><OrderCard key={order.id} order={order}/>)}</div></AdminShell>;
}
