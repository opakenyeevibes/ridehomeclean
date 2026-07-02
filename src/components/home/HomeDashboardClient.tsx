"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, BadgeCheck, Headphones, Search, ShieldCheck, Sparkles } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { HomeBannerSection } from "@/components/banners/HomeBannerSection";
import { ServiceCard } from "@/components/home/ServiceCard";
import { RecommendedServiceCard } from "@/components/home/RecommendedServiceCard";
import { OrderCard } from "@/components/orders/OrderCard";
import { orders } from "@/data/orders";
import { readClientServices } from "@/lib/localData";
import type { Service } from "@/types";

export function HomeDashboardClient() {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    const load = () => setServices(readClientServices());
    load();
    window.addEventListener("ride-n-care-services-updated", load);
    window.addEventListener("storage", load);
    return () => {
      window.removeEventListener("ride-n-care-services-updated", load);
      window.removeEventListener("storage", load);
    };
  }, []);

  const recommended = [services[0], services[4], services[8]].filter(Boolean) as Service[];

  return <AppShell><main className="mx-auto w-full max-w-7xl px-4 pb-32 md:px-8 md:pb-14">
    <section className="mb-4 flex items-end justify-between gap-4 pt-1 md:mb-6 md:pt-2"><div><p className="text-[10px] font-extrabold text-[#7b8884]">Selamat datang kembali, Nadia 👋</p><h1 className="mt-1 max-w-md text-xl font-black leading-[1.25] tracking-[-.03em] md:text-3xl">Halo, mau dibantu care apa hari ini?</h1><p className="mt-1.5 text-[11px] text-[#667085]">Care datang ke lokasi kamu.</p></div><span className="hidden shrink-0 items-center gap-2 rounded-2xl border border-[#D8DEDA] bg-white px-3 py-2 text-[10px] font-bold text-[#63716d] shadow-sm sm:flex"><span className="size-2 rounded-full bg-[#2FA084]"/>{services.length} layanan siap membantu</span></section>
    <HomeBannerSection/>
    <div className="mb-7 flex items-center gap-3 rounded-[20px] bg-white px-4 py-4 shadow-sm lg:hidden"><Search size={20} className="text-[#667085]"/><span className="text-sm font-medium text-[#7d8986]">Mau dirawat apa hari ini?</span></div>
    <section className="mb-10"><div className="mb-4 flex items-end justify-between"><div><span className="text-[9px] font-black tracking-[.18em] text-[#2FA084]">PILIH LAYANAN</span><h2 className="mt-1 text-lg font-black tracking-[-.02em] md:text-2xl">Semua kebutuhan care dalam satu aplikasi</h2></div><span className="hidden text-xs text-[#7a8884] md:block">{services.length} layanan siap dipesan</span></div><div className="grid grid-cols-5 gap-x-1.5 gap-y-3 min-[400px]:gap-x-2.5 min-[400px]:gap-y-4 md:grid-cols-10 md:gap-5">{services.map((service) => <ServiceCard key={service.id} service={service}/>)}</div></section>
    {recommended.length > 0 && <section className="mb-11"><div className="mb-4 flex items-end justify-between gap-3"><div><span className="text-[9px] font-black tracking-[.18em] text-[#2FA084]">REKOMENDASI</span><h2 className="mt-1 text-lg font-black tracking-[-.02em] md:text-2xl">Layanan pilihan untuk kamu</h2><p className="mt-1 text-[11px] leading-5 text-[#7a8783]">Layanan favorit di sekitar Cianjur minggu ini.</p></div><Link href="/services" className="flex shrink-0 items-center gap-1 text-[11px] font-extrabold">Lihat semua <ArrowRight size={14}/></Link></div><div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">{recommended.map((service, index)=><div key={service.id} className={index === 2 ? "col-span-2 md:col-span-1" : ""}><RecommendedServiceCard service={service} badge={index === 0 ? "Paling Laris" : index === 1 ? "Hemat" : "Premium"}/></div>)}</div></section>}
    <section className="mb-11"><div className="mb-4 flex items-end justify-between"><div><span className="text-[9px] font-black tracking-[.18em] text-[#2FA084]">LANJUTKAN AKTIVITAS</span><h2 className="mt-1 text-lg font-black tracking-[-.02em] md:text-2xl">Pesanan terbaru</h2></div><Link href="/orders" className="flex items-center gap-1 text-[11px] font-extrabold">Semua pesanan <ArrowRight size={14}/></Link></div><div className="grid gap-4 md:grid-cols-2">{orders.slice(0,2).map((order) => <OrderCard key={order.id} order={order}/>)}</div></section>
    <section className="mb-10"><div className="mb-4"><span className="text-[9px] font-black tracking-[.18em] text-[#2FA084]">TENANG, ADA RIDE N CARE</span><h2 className="mt-1 text-lg font-black tracking-[-.02em] md:text-2xl">Care tanpa was-was</h2></div><div className="grid gap-3 sm:grid-cols-3">{[{icon:BadgeCheck,title:"Partner terverifikasi",desc:"Identitas dan kemampuan partner telah kami cek."},{icon:ShieldCheck,title:"Jaminan layanan",desc:"Ada bantuan jika hasil belum sesuai standar."},{icon:Headphones,title:"Dukungan responsif",desc:"Tim kami siap membantu sebelum dan sesudah layanan."}].map(({icon:Icon,title,desc})=><article key={title} className="rounded-[22px] border border-[#D8DEDA] bg-white p-4 shadow-sm transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-md"><span className="grid size-10 place-items-center rounded-[14px] bg-[#FFF6DE] text-[#2FA084]"><Icon size={19}/></span><h3 className="mt-3 text-sm font-black">{title}</h3><p className="mt-1 text-[11px] leading-5 text-[#667085]">{desc}</p></article>)}</div></section>
    <section className="soft-grid relative overflow-hidden rounded-[28px] bg-[#2FA084] p-6 text-white shadow-[0_18px_48px_rgba(31,111,95,.18)] md:flex md:items-center md:justify-between md:p-8"><div className="relative z-10"><span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-[9px] font-black tracking-wider text-[#FFE394]"><Sparkles size={12}/> MULAI HARI INI</span><h2 className="mt-3 max-w-md text-2xl font-black leading-tight tracking-[-.03em]">Bersih, rapi, dan terawat tanpa ribet.</h2><p className="mt-2 max-w-md text-xs leading-5 text-white/60">Pilih layanan dan jadwalmu. Partner Ride N Care akan datang langsung ke lokasi.</p></div><Link href={`/services/${services[0]?.id ?? "home-cleaning"}`} className="relative z-10 mt-5 inline-flex min-h-12 items-center gap-2 rounded-2xl bg-[#FFE394] px-5 text-xs font-black text-[#2FA084] transition-[transform,background-color] duration-200 hover:bg-[#5FC58D] active:scale-95 md:mt-0">Mulai pesan <ArrowRight size={15}/></Link><span className="absolute -bottom-24 -right-16 size-56 rounded-full bg-[#2FA084]/25"/></section>
  </main></AppShell>;
}
