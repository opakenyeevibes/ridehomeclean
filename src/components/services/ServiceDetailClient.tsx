"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft, Check, Clock3, Info, ShieldCheck, Star } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { PackageCard } from "@/components/services/PackageCard";
import { Button } from "@/components/ui/Button";
import { readClientService } from "@/lib/localData";
import { formatPrice } from "@/lib/utils";
import type { Service } from "@/types";

export function ServiceDetailClient({ id }: { id: string }) {
  const [service, setService] = useState<Service | null>(null);

  useEffect(() => {
    const load = () => setService(readClientService(id));
    load();
    window.addEventListener("ride-n-care-services-updated", load);
    window.addEventListener("storage", load);
    return () => {
      window.removeEventListener("ride-n-care-services-updated", load);
      window.removeEventListener("storage", load);
    };
  }, [id]);

  if (!service) return <AppShell compactHeader><main className="mx-auto w-full max-w-6xl px-4 pb-44 md:px-8 md:pb-28"><div className="card h-72 animate-pulse p-6"/></main></AppShell>;
  const Icon = service.icon;

  return <AppShell compactHeader><main className="mx-auto w-full max-w-6xl px-4 pb-44 md:px-8 md:pb-28">
    <Link href="/" className="mb-4 inline-flex items-center gap-2 text-xs font-bold text-[#667085]"><ArrowLeft size={16}/> Kembali ke beranda</Link>
    <section className="relative overflow-hidden rounded-[32px] p-6 md:min-h-80 md:p-10" style={{background: service.color}}><div className="relative z-10 max-w-xl"><span className="rounded-full bg-white/70 px-3 py-1.5 text-[10px] font-black tracking-wider" style={{color: service.accent}}>{service.category.toUpperCase()}</span><h1 className="mt-5 text-3xl font-black tracking-[-.04em] md:text-5xl">{service.name}</h1><p className="mt-3 max-w-lg text-sm leading-6 text-[#43524e] md:text-base">{service.description}</p><div className="mt-6 flex flex-wrap gap-2"><span className="flex items-center gap-1.5 rounded-xl bg-white/70 px-3 py-2 text-xs font-bold"><Star size={14} fill="#FFE394" strokeWidth={0}/>{service.rating} ({service.totalReviews.toLocaleString("id-ID")})</span><span className="flex items-center gap-1.5 rounded-xl bg-white/70 px-3 py-2 text-xs font-bold"><Clock3 size={14}/>{service.duration}</span><span className="rounded-xl bg-white/70 px-3 py-2 text-xs font-bold">Mulai {formatPrice(service.startingPrice)}</span></div></div><div className="absolute -bottom-14 -right-10 grid size-64 place-items-center rounded-full bg-white/30 md:right-8 md:size-72"><Icon size={110} strokeWidth={1} style={{color: service.accent}}/></div></section>
    <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_300px]"><div><div className="mb-5"><span className="text-[10px] font-black tracking-[.16em] text-[#2FA084]">PAKET CARE</span><h2 className="mt-1 text-2xl font-black">Pilih sesuai kebutuhanmu</h2></div><div className="grid gap-4 md:grid-cols-3">{service.packages.map((item) => <PackageCard key={item.id} item={item}/>)}</div><div className="card mt-8 p-6"><h2 className="text-lg font-extrabold">Yang perlu kamu tahu</h2><div className="mt-5 grid gap-4 text-sm text-[#586762] md:grid-cols-2"><span className="flex gap-3"><Check className="mt-0.5 text-[#2FA084]" size={18}/> Partner membawa perlengkapan sesuai layanan.</span><span className="flex gap-3"><ShieldCheck className="mt-0.5 text-[#2FA084]" size={18}/> Dilindungi jaminan layanan.</span><span className="flex gap-3"><Info className="mt-0.5 text-[#2FA084]" size={18}/> Harga dapat berubah sesuai add-on.</span><span className="flex gap-3"><Clock3 className="mt-0.5 text-[#2FA084]" size={18}/> Durasi merupakan estimasi.</span></div></div></div>
    <aside className="h-fit rounded-[28px] bg-[#2FA084] p-6 text-white shadow-[0_18px_42px_rgba(31,111,95,.18)] lg:sticky lg:top-24"><span className="text-[10px] font-black tracking-[.14em] text-[#FFE394]">SIAP MULAI CARE?</span><h3 className="mt-2 text-2xl font-black">Care datang ke lokasi kamu.</h3><p className="mt-2 text-xs leading-5 text-white/65">Pilih paket, lokasi, dan jadwal sesuai kebutuhanmu.</p><Link href={`/booking/${service.id}`} className="mt-6 block"><Button variant="secondary" className="w-full">Pesan Sekarang</Button></Link></aside></div>
    <div className="fixed inset-x-2.5 bottom-[calc(72px+env(safe-area-inset-bottom))] z-40 rounded-[20px] border border-[#D8DEDA] bg-white/94 p-2.5 shadow-[0_-8px_30px_rgba(31,111,95,.13)] backdrop-blur-xl md:hidden"><div className="mx-auto flex max-w-lg items-center gap-3"><span className="min-w-0 flex-1 pl-1"><small className="block text-[8px] font-black tracking-wide text-[#83908c]">MULAI DARI</small><b className="block truncate text-sm">{formatPrice(service.startingPrice)}</b></span><Link href={`/booking/${service.id}`} className="min-w-[190px]"><Button className="min-h-11 w-full rounded-[14px]">Pesan Sekarang</Button></Link></div></div>
  </main></AppShell>;
}
