import Link from "next/link";
import { ArrowUpRight, Banknote, CheckCircle2, Clock3, ReceiptText, UserPlus } from "lucide-react";
import { AdminShell } from "@/components/admin/AdminShell";
import { AdminTable } from "@/components/admin/AdminTable";

const stats = [
  { label: "Total pesanan", value: "1.284", delta: "+12,4%", icon: ReceiptText, color: "#EAFBF3" },
  { label: "Pesanan aktif", value: "48", delta: "8 mendesak", icon: Clock3, color: "#FFF6DE" },
  { label: "Selesai", value: "1.109", delta: "86,4%", icon: CheckCircle2, color: "#EAFBF3" },
  { label: "Pendapatan", value: "Rp94,8jt", delta: "+18,2%", icon: Banknote, color: "#FFF6DE" },
  { label: "Pelanggan baru", value: "186", delta: "+24 bulan ini", icon: UserPlus, color: "#FFF6DE" },
];

export default function Admin() {
  return <AdminShell title="Selamat pagi, Ardi 👋" desc="Berikut ringkasan operasional Ride N Care hari ini.">
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">{stats.map(({ label, value, delta, icon: Icon, color }) => <div key={label} className="card p-5"><span className="grid size-10 place-items-center rounded-xl" style={{ background: color }}><Icon size={18}/></span><small className="mt-4 block font-semibold text-[#788580]">{label}</small><b className="mt-1 block text-2xl">{value}</b><span className="mt-2 block text-[10px] font-bold text-[#2FA084]">{delta}</span></div>)}</div>
    <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_280px]"><section><div className="mb-4 flex items-center justify-between"><h2 className="text-lg font-extrabold">Pesanan terbaru</h2><Link href="/admin/orders" className="flex items-center gap-1 text-xs font-bold">Lihat semua <ArrowUpRight size={14}/></Link></div><AdminTable limit={4}/></section><aside className="card h-fit p-5"><h2 className="font-extrabold">Pendapatan 7 hari</h2><div className="mt-6 flex h-40 items-end gap-2">{[42, 68, 53, 88, 72, 96, 78].map((height, index) => <div key={index} className="flex flex-1 flex-col items-center gap-2"><span className="w-full rounded-t-lg bg-[#2FA084]" style={{ height: `${height}%` }}/><small className="text-[9px] text-[#84908c]">{["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"][index]}</small></div>)}</div><div className="mt-5 rounded-2xl bg-[#FFF6DE] p-4"><small className="font-bold text-[#2FA084]">TOTAL MINGGU INI</small><b className="mt-1 block text-xl">Rp24.650.000</b></div></aside></div>
  </AdminShell>;
}
