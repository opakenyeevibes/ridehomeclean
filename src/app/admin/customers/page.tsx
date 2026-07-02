import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { AdminShell } from "@/components/admin/AdminShell";
import { customers } from "@/data/users";

export default function AdminCustomersPage() {
  return <AdminShell title="Customer" desc="Daftar customer Ride N Care dari mock data."><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{customers.map((customer)=><Link href={`/admin/customers/${customer.id}`} key={customer.id} className="card p-5 transition hover:-translate-y-0.5 hover:shadow-md"><b className="block">{customer.name}</b><small className="text-[#667085]">Member sejak {customer.memberSince}</small><div className="mt-4 space-y-2 text-xs text-[#667085]"><span className="flex items-center gap-2"><Phone size={14}/>{customer.phone}</span><span className="flex items-center gap-2"><Mail size={14}/>{customer.email}</span></div><div className="mt-4 rounded-2xl bg-[#EEEEEE] p-3 text-xs"><b>{customer.addresses.length}</b> alamat tersimpan</div></Link>)}</div></AdminShell>;
}
