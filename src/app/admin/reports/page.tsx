import { AdminShell } from "@/components/admin/AdminShell";
import { reportSummary, revenueReport } from "@/data/reports";
import { formatPrice } from "@/lib/utils";

export default function AdminReportsPage() {
  return <AdminShell title="Revenue report" desc="Laporan pendapatan dasar dari mock data."><div className="grid gap-3 md:grid-cols-4">{[["Revenue",formatPrice(reportSummary.revenue)],["Orders",reportSummary.orders],["AOV",formatPrice(reportSummary.averageOrder)],["Growth",`${reportSummary.growth}%`]].map(([label,value])=><div key={label} className="card p-5"><small className="text-[#667085]">{label}</small><b className="mt-1 block text-2xl">{value}</b></div>)}</div><section className="card mt-6 p-6"><h2 className="font-extrabold">7 hari terakhir</h2><div className="mt-6 flex h-52 items-end gap-3">{revenueReport.map((item)=><div key={item.label} className="flex flex-1 flex-col items-center gap-2"><span className="w-full rounded-t-xl bg-[#2FA084]" style={{height:`${Math.max(18,item.revenue/55000)}%`}}/><small className="text-[10px] font-bold text-[#667085]">{item.label}</small></div>)}</div></section></AdminShell>;
}
