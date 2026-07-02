import { CreditCard, QrCode, Smartphone } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { paymentMethods } from "@/data/payment-methods";

export default function ProfilePaymentsPage() {
  const icons = [QrCode, CreditCard, Smartphone];
  return <AppShell compactHeader><main className="mx-auto w-full max-w-3xl px-4 pb-32 md:px-8"><div className="mb-6"><span className="text-[10px] font-black tracking-[.16em] text-[#2FA084]">PEMBAYARAN</span><h1 className="mt-1 text-3xl font-black tracking-tight">Metode pembayaran</h1><p className="mt-2 text-sm text-[#667085]">Disiapkan untuk integrasi QRIS, transfer, dan e-wallet nanti.</p></div><div className="space-y-3">{paymentMethods.map((method, index)=>{const Icon=icons[index%icons.length];return <article key={method.id} className="card flex items-center gap-4 p-5"><span className="grid size-12 place-items-center rounded-2xl bg-[#FFF6DE] text-[#2FA084]"><Icon size={20}/></span><div className="flex-1"><b className="block">{method.name}</b><small className="text-[#667085]">{method.enabled ? "Tersedia untuk prototype lokal" : "Fitur ini disiapkan untuk rilis berikutnya"}</small></div><span className="rounded-full bg-[#FFF6DE] px-2.5 py-1 text-[9px] font-black text-[#2FA084]">{method.enabled ? "AKTIF" : "SEGERA"}</span></article>})}</div></main></AppShell>;
}
