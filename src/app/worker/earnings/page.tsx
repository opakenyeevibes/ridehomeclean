import { WalletCards } from "lucide-react";
import { WorkerShell } from "@/components/worker/WorkerShell";
import { currentWorker } from "@/data/workers";
import { formatPrice } from "@/lib/utils";

export default function WorkerEarningsPage() {
  return <WorkerShell title="Penghasilan"><section className="soft-grid rounded-[30px] bg-[#2FA084] p-6 text-white"><WalletCards className="text-[#FFE394]"/><small className="mt-5 block text-white/60">Penghasilan hari ini</small><h1 className="mt-1 text-4xl font-black">{formatPrice(currentWorker.earningsToday)}</h1><p className="mt-2 text-sm text-white/60">Estimasi masuk setelah job selesai diverifikasi.</p></section><div className="mt-5 grid grid-cols-2 gap-3"><div className="card p-5"><small className="text-[#667085]">Total semua waktu</small><b className="mt-1 block text-lg">{formatPrice(currentWorker.earningsTotal)}</b></div><div className="card p-5"><small className="text-[#667085]">Job selesai</small><b className="mt-1 block text-lg">{currentWorker.completedJobs}</b></div></div></WorkerShell>;
}
