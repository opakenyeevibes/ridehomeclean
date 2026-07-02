"use client";

import { useEffect, useState } from "react";
import { Copy, Sparkles, TicketPercent } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { readActivePromos } from "@/lib/localData";
import type { Promo } from "@/types";

export function PromosClient() {
  const [promos, setPromos] = useState<Promo[]>([]);
  useEffect(()=>{const load=()=>setPromos(readActivePromos());load();window.addEventListener("ride-n-care-promos-updated",load);window.addEventListener("storage",load);return()=>{window.removeEventListener("ride-n-care-promos-updated",load);window.removeEventListener("storage",load);};},[]);
  return <AppShell compactHeader><main className="mx-auto w-full max-w-3xl px-4 pb-32 md:px-8"><div className="mb-6"><span className="text-[10px] font-black tracking-[.16em] text-[#2FA084]">PROMO CARE</span><h1 className="mt-1 text-3xl font-black tracking-tight">Voucher untuk kamu</h1><p className="mt-2 text-sm leading-6 text-[#667085]">Pakai promo saat review pesanan. Semua voucher ini mock untuk prototype lokal.</p></div><div className="space-y-4">{promos.map((promo)=><article key={promo.id} className="relative overflow-hidden rounded-[28px] border border-[#D8DEDA] bg-white p-5 shadow-[0_14px_35px_rgba(31,111,95,.07)]"><span className="inline-flex items-center gap-1.5 rounded-full bg-[#FFF6DE] px-3 py-1 text-[9px] font-black tracking-wider text-[#2FA084]"><Sparkles size={12}/>{promo.eyebrow}</span><h2 className="mt-4 max-w-sm text-xl font-black leading-tight">{promo.title}</h2><p className="mt-1 text-sm text-[#667085]">{promo.subtitle}</p><div className="mt-5 flex items-center justify-between rounded-2xl bg-[#EEEEEE] p-3"><span className="flex items-center gap-2 text-xs font-black"><TicketPercent size={16} className="text-[#2FA084]"/>{promo.code}</span><button onClick={()=>navigator.clipboard?.writeText(promo.code)} className="flex items-center gap-1 rounded-xl bg-[#2FA084] px-3 py-2 text-[10px] font-black text-white"><Copy size={13}/>Salin</button></div><span className="absolute -right-10 -top-12 size-36 rounded-full bg-[#FFE394]/45"/></article>)}</div></main></AppShell>;
}
