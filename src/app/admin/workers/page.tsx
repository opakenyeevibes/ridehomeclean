import Link from "next/link";
import { BriefcaseBusiness, Star } from "lucide-react";
import { AdminShell } from "@/components/admin/AdminShell";
import { workers } from "@/data/workers";

export default function AdminWorkers(){
  return <AdminShell title="Workers lapangan" desc="Kelola kualitas, status, dan performa worker Ride N Care."><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{workers.map(w=><Link href={`/admin/workers/${w.id}`} key={w.id} className="card p-5 transition hover:-translate-y-0.5 hover:shadow-md"><div className="flex items-center gap-3"><span className="grid size-14 place-items-center rounded-2xl bg-[#FFF6DE] font-black text-[#2FA084]">{w.initials}</span><span className="flex-1"><b className="block">{w.name}</b><small className="text-[#7d8985]">{w.skills.join(" · ")}</small></span><span className="rounded-full bg-[#FFF6DE] px-2 py-1 text-[9px] font-black text-[#2FA084]">{w.status}</span></div><div className="mt-5 grid grid-cols-2 divide-x divide-[#e5eae8] rounded-2xl bg-[#EEEEEE] p-3 text-center"><span><b className="flex items-center justify-center gap-1"><Star size={13} fill="#FFE394" strokeWidth={0}/>{w.rating}</b><small className="text-[9px] text-[#7d8985]">Rating</small></span><span><b className="flex items-center justify-center gap-1"><BriefcaseBusiness size={13}/>{w.completedJobs}</b><small className="text-[9px] text-[#7d8985]">Pekerjaan</small></span></div></Link>)}</div></AdminShell>
}
