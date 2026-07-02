import { Mail, Phone, Star } from "lucide-react";
import { WorkerLogout, WorkerShell } from "@/components/worker/WorkerShell";
import { currentWorker } from "@/data/workers";

export default function WorkerProfilePage() {
  return <WorkerShell title="Profil Worker"><section className="soft-grid rounded-[30px] bg-[#2FA084] p-6 text-white"><span className="grid size-20 place-items-center rounded-[24px] bg-[#FFF6DE] text-xl font-black text-[#2FA084]">{currentWorker.initials}</span><h1 className="mt-4 text-2xl font-black">{currentWorker.name}</h1><p className="text-sm text-white/60">{currentWorker.skills.join(" · ")}</p></section><div className="card mt-5 p-5"><span className="flex items-center gap-3 text-sm"><Phone size={17} className="text-[#2FA084]"/>{currentWorker.phone}</span><span className="mt-3 flex items-center gap-3 text-sm"><Mail size={17} className="text-[#2FA084]"/>{currentWorker.email ?? "Belum diisi"}</span><span className="mt-3 flex items-center gap-3 text-sm"><Star size={17} className="text-[#FFE394]" fill="#FFE394" strokeWidth={0}/>{currentWorker.rating} dari {currentWorker.completedJobs} pekerjaan</span></div><WorkerLogout/></WorkerShell>;
}
