import Link from "next/link";
import {
  ArrowUpRight,
  Banknote,
  CheckCircle2,
  Clock3,
  ReceiptText,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  UserPlus,
  UsersRound,
} from "lucide-react";
import { AdminShell } from "@/components/admin/AdminShell";
import { AdminTable } from "@/components/admin/AdminTable";

const stats = [
  { label: "Total pesanan", value: "1.284", delta: "+12,4%", icon: ReceiptText, color: "#EAFBF3" },
  { label: "Pesanan aktif", value: "48", delta: "8 mendesak", icon: Clock3, color: "#FFF6DE" },
  { label: "Selesai", value: "1.109", delta: "86,4%", icon: CheckCircle2, color: "#EAFBF3" },
  { label: "Pendapatan", value: "Rp94,8jt", delta: "+18,2%", icon: Banknote, color: "#FFF6DE" },
  { label: "Pelanggan baru", value: "186", delta: "+24 bulan ini", icon: UserPlus, color: "#FFF6DE" },
];

const orderBreakdown = [
  { label: "Menunggu", value: 14, percent: "29%", color: "#FFE394" },
  { label: "Menuju lokasi", value: 12, percent: "25%", color: "#8BDFDD" },
  { label: "Dikerjakan", value: 22, percent: "46%", color: "#2FA084" },
];

const topCustomers = [
  { name: "Alya Putri", meta: "18 pesanan", value: "Rp2,49jt", progress: 82 },
  { name: "Raka Pratama", meta: "11 pesanan", value: "Rp1,82jt", progress: 64 },
  { name: "Nadia Salsabila", meta: "9 pesanan", value: "Rp1,25jt", progress: 52 },
  { name: "Dewi Anggraini", meta: "7 pesanan", value: "Rp918rb", progress: 44 },
];

const funnel = [
  { label: "Kunjungan layanan", value: "18.420", drop: "-34%" },
  { label: "Mulai booking", value: "12.100", drop: "-40%" },
  { label: "Pilih jadwal", value: "7.250", drop: "-45%" },
  { label: "Pilih bayar", value: "3.980", drop: "-27%" },
  { label: "Pesanan dibuat", value: "2.140", drop: "+18%" },
];

const activities = [
  "Pesanan Home Care baru dari Alya Putri",
  "Worker Budi Santoso menerima jadwal jam 10.00",
  "Promo FIRST CARE digunakan 24 kali hari ini",
  "Auto Care butuh follow-up pembayaran QRIS",
  "Custom Care masuk untuk estimasi rumah renovasi",
];

export default function Admin() {
  return (
    <AdminShell title="Selamat pagi, Ardi 👋" desc="Berikut ringkasan operasional Ride Home Care hari ini.">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {stats.map(({ label, value, delta, icon: Icon, color }) => (
          <div key={label} className="card min-h-[172px] p-6 shadow-[0_14px_36px_rgba(22,51,46,.055)]">
            <span className="grid size-10 place-items-center rounded-[14px] text-[#16332E]" style={{ background: color }}>
              <Icon size={18} />
            </span>
            <small className="mt-5 block text-xs font-extrabold tracking-[.01em] text-[#788580]">{label}</small>
            <b className="mt-2 block text-[28px] font-black leading-none tracking-[-.04em]">{value}</b>
            <span className="mt-3 block text-[10px] font-black text-[#2FA084]">{delta}</span>
          </div>
        ))}
      </div>

      <div className="mt-7 grid gap-7 xl:grid-cols-[1.1fr_.9fr]">
        <section className="card p-6 shadow-[0_14px_36px_rgba(22,51,46,.055)]">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <span className="text-[10px] font-black uppercase tracking-[.18em] text-[#2FA084]">Order Statistics</span>
              <h2 className="mt-2 text-3xl font-black tracking-[-.05em]">48 pesanan aktif</h2>
              <p className="mt-1 text-xs leading-5 text-[#667085]">Ringkasan status pekerjaan yang sedang berjalan hari ini.</p>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-[#EAFBF3] px-3 py-2 text-[10px] font-black text-[#1F6F5F]">
              <TrendingUp size={13} /> +8,2%
            </span>
          </div>
          <div className="mt-7 grid gap-4 md:grid-cols-3">
            {orderBreakdown.map((item) => (
              <div key={item.label} className="rounded-[22px] border border-[#D8DEDA] bg-[#FAFCFB] p-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-[#667085]">{item.label}</span>
                  <span className="size-2.5 rounded-full" style={{ background: item.color }} />
                </div>
                <b className="mt-3 block text-3xl tracking-[-.04em]">{item.value}</b>
                <span className="mt-1 text-[10px] font-black text-[#2FA084]">{item.percent}</span>
                <div className="mt-4 h-2 overflow-hidden rounded-full bg-[#EEF2F0]">
                  <span className="block h-full rounded-full" style={{ width: item.percent, background: item.color }} />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="card p-6 shadow-[0_14px_36px_rgba(22,51,46,.055)]">
          <div className="flex items-center justify-between">
            <h2 className="font-black tracking-[-.02em]">Performa layanan</h2>
            <span className="rounded-full bg-[#FFF6DE] px-3 py-1.5 text-[10px] font-black text-[#1F6F5F]">MTD</span>
          </div>
          <div className="mt-7 flex h-44 items-end gap-3">
            {[42, 68, 53, 88, 72, 96, 78].map((height, index) => (
              <div key={index} className="flex flex-1 flex-col items-center gap-2">
                <span className="w-full rounded-t-xl bg-gradient-to-t from-[#1F6F5F] to-[#6FCF97]" style={{ height: `${height}%` }} />
                <small className="text-[9px] text-[#84908c]">{["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"][index]}</small>
              </div>
            ))}
          </div>
          <div className="mt-5 rounded-[22px] bg-[#FFF6DE] p-5 ring-1 ring-[#FFE394]/55">
            <small className="font-black tracking-[.08em] text-[#2FA084]">TOTAL MINGGU INI</small>
            <b className="mt-2 block text-2xl tracking-[-.04em]">Rp24.650.000</b>
          </div>
        </section>
      </div>

      <div className="mt-7 grid gap-7 xl:grid-cols-[1fr_340px]">
        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-black tracking-[-.03em]">Pesanan terbaru</h2>
            <Link href="/admin/orders" className="flex items-center gap-1 rounded-full px-2 py-1 text-xs font-black transition hover:bg-white">
              Lihat semua <ArrowUpRight size={14} />
            </Link>
          </div>
          <AdminTable limit={4} />
        </section>

        <aside className="space-y-7">
          <section className="card p-6 shadow-[0_14px_36px_rgba(22,51,46,.055)]">
            <div className="flex items-center gap-2">
              <UsersRound size={18} className="text-[#2FA084]" />
              <h2 className="font-black tracking-[-.02em]">Pelanggan teratas</h2>
            </div>
            <div className="mt-5 space-y-4">
              {topCustomers.map((item) => (
                <div key={item.name}>
                  <div className="flex items-center justify-between gap-3">
                    <span>
                      <b className="block text-sm">{item.name}</b>
                      <small className="text-[11px] text-[#667085]">{item.meta}</small>
                    </span>
                    <b className="text-xs">{item.value}</b>
                  </div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#EEF2F0]">
                    <span className="block h-full rounded-full bg-[#2FA084]" style={{ width: `${item.progress}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="card p-6 shadow-[0_14px_36px_rgba(22,51,46,.055)]">
            <div className="flex items-center gap-2">
              <ShieldCheck size={18} className="text-[#2FA084]" />
              <h2 className="font-black tracking-[-.02em]">Booking funnel</h2>
            </div>
            <div className="mt-5 space-y-3">
              {funnel.map((item) => (
                <div key={item.label} className="flex items-center justify-between rounded-2xl bg-[#FAFCFB] px-3 py-2.5 ring-1 ring-[#D8DEDA]/70">
                  <span>
                    <b className="block text-xs">{item.label}</b>
                    <small className="text-[10px] text-[#667085]">{item.value}</small>
                  </span>
                  <span className={`text-[10px] font-black ${item.drop.startsWith("+") ? "text-[#2FA084]" : "text-[#98A2B3]"}`}>{item.drop}</span>
                </div>
              ))}
            </div>
          </section>
        </aside>
      </div>

      <section className="mt-7 card p-6 shadow-[0_14px_36px_rgba(22,51,46,.055)]">
        <div className="flex items-center gap-2">
          <Sparkles size={18} className="text-[#2FA084]" />
          <h2 className="font-black tracking-[-.02em]">Aktivitas terbaru</h2>
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-5">
          {activities.map((activity, index) => (
            <div key={activity} className="rounded-[20px] border border-[#D8DEDA] bg-[#FAFCFB] p-4">
              <span className="grid size-8 place-items-center rounded-xl bg-[#EAFBF3] text-[10px] font-black text-[#1F6F5F]">{index + 1}</span>
              <p className="mt-3 text-xs font-bold leading-5">{activity}</p>
              <small className="mt-2 block text-[10px] text-[#98A2B3]">{index === 0 ? "2 menit lalu" : `${index * 12 + 7} menit lalu`}</small>
            </div>
          ))}
        </div>
      </section>
    </AdminShell>
  );
}
