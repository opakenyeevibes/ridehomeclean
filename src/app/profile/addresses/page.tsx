import { MapPin } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { currentCustomer } from "@/data/users";

export default function AddressesPage() {
  return <AppShell compactHeader><main className="mx-auto w-full max-w-3xl px-4 pb-32 md:px-8"><div className="mb-6"><span className="text-[10px] font-black tracking-[.16em] text-[#2FA084]">ALAMAT</span><h1 className="mt-1 text-3xl font-black tracking-tight">Alamat tersimpan</h1><p className="mt-2 text-sm text-[#667085]">Pilih alamat agar partner Ride Home Care mudah datang ke lokasi kamu.</p></div><div className="space-y-3">{currentCustomer.addresses.map((address)=><article key={address.id} className="card flex gap-4 p-5"><span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-[#FFF6DE] text-[#2FA084]"><MapPin size={20}/></span><div><div className="flex items-center gap-2"><b>{address.label}</b>{address.primary&&<span className="rounded-full bg-[#2FA084] px-2 py-1 text-[9px] font-black text-[#FFE394]">UTAMA</span>}</div><p className="mt-1 text-sm leading-6 text-[#667085]">{address.address}</p>{address.notes&&<small className="mt-1 block text-[#8a9692]">{address.notes}</small>}</div></article>)}</div></main></AppShell>;
}
