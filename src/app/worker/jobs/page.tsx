import { WorkerShell } from "@/components/worker/WorkerShell";
import { WorkerJobsClient } from "@/components/worker/WorkerJobsClient";

export default function WorkerJobsPage() {
  return <WorkerShell title="Daftar Job"><div className="mb-5"><span className="text-[10px] font-black tracking-[.16em] text-[#2FA084]">JOB RIDE HOME CARE</span><h1 className="mt-1 text-2xl font-black">Pekerjaan tersedia</h1></div><WorkerJobsClient/></WorkerShell>;
}
