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
import { fetchServices } from "@/lib/servicesData";
import type { Service } from "@/types";

export function HomeDashboardClient() {
  const [services, setServices] = useState<Service[]>([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const load = () => {
      fetchServices().then(setServices).catch(() => null);
    };
    load();
    window.addEventListener("ride-n-care-services-updated", load);
    window.addEventListener("storage", load);
    return () => {
      window.removeEventListener("ride-n-care-services-updated", load);
      window.removeEventListener("storage", load);
    };
  }, []);

  const filteredServices = services.filter((service) => {
    const keyword = `${service.name} ${service.shortName} ${service.category} ${service.tagline} ${service.description}`.toLowerCase();
    return !query.trim() || keyword.includes(query.trim().toLowerCase());
  });
  const recommendedSource = query.trim() ? filteredServices : services;
  const recommended = [recommendedSource[0], recommendedSource[4], recommendedSource[8]].filter(Boolean) as Service[];

  return <AppShell><main className="mx-auto w-full max-w-7xl px-4 pb-32 md:px-8 md:pb-14">
    <section className="mb-4 flex items-end justify-between gap-4 pt-1 md:mb-6 md:pt-2"><div><p className="text-[10px] font-extrabold text-[#7b8884]">Selamat datang kembali, Nadia 👋</p><h1 className="mt-1 max-w-md text-xl font-black leading-[1.25] tracking-[-.03em] md:text-3xl">Halo, mau dibantu care apa hari ini?</h1><p className="mt-1.5 text-[11px] text-[#667085]">Home care datang ke lokasi kamu.</p></div><span className="hidden shrink-0 items-center gap-2 rounded-2xl border border-[#D8DEDA] bg-white px-3 py-2 text-[10px] font-bold text-[#63716d] shadow-sm sm:flex"><span className="size-2 rounded-full bg-[#2FA084]"/>{services.length} layanan siap membantu</span></section>
    <HomeBannerSection/>
    <label className="mb-7 flex items-center gap-3 rounded-[20px] border border-white bg-white px-4 py-4 shadow-sm transition focus-within:border-[#D8DEDA] focus-within:shadow-[0_10px_26px_rgba(31,111,95,.10)] lg:hidden">
      <Search size={20} className="shrink-0 text-[#667085]"/>
      <input value={query} onChange={(event)=>setQuery(event.target.value)} placeholder="Mau dirawat apa hari ini?" className="app-search-input min-w-0 flex-1 appearance-none border-0 bg-transparent p-0 text-sm font-medium text-[#16332E] outline-none ring-0 placeholder:text-[#7d8986] focus:border-0 focus:outline-none focus:ring-0"/>
      {query && <button type="button" onClick={()=>setQuery("")} className="rounded-full bg-[#EEF3F1] px-2 py-1 text-[10px] font-black text-[#667085]">Reset</button>}
    </label>
    <section className="mb-10"><div className="mb-4 flex items-end justify-between"><div><span className="text-[9px] font-black tracking-[.18em] text-[#2FA084]">PILIH LAYANAN</span><h2 className="mt-1 text-lg font-black tracking-[-.02em] md:text-2xl">{query ? `Hasil untuk “${query}”` : "Semua kebutuhan care dalam satu aplikasi"}</h2></div><span className="hidden text-xs text-[#7a8884] md:block">{filteredServices.length} layanan siap dipesan</span></div>{filteredServices.length ? <div className="grid grid-cols-5 gap-x-1.5 gap-y-3 min-[400px]:gap-x-2.5 min-[400px]:gap-y-4 md:grid-cols-10 md:gap-5">{filteredServices.map((service) => <ServiceCard key={service.id} service={service}/>)}</div> : <div className="rounded-[24px] border border-[#D8DEDA] bg-white p-5 text-center shadow-sm"><b className="block text-sm">Layanan belum ditemukan</b><p className="mt-1 text-xs text-[#667085]">Coba kata lain seperti Home Care, Auto Care, Kamar, atau Premium.</p><button onClick={()=>setQuery("")} className="mt-4 rounded-2xl bg-[#1F6F5F] px-4 py-2 text-xs font-black text-white">Lihat semua layanan</button></div>}</section>
    {recommended.length > 0 && <section className="mb-11"><div className="mb-4 flex items-end justify-between gap-3"><div><span className="text-[9px] font-black tracking-[.18em] text-[#2FA084]">REKOMENDASI</span><h2 className="mt-1 text-lg font-black tracking-[-.02em] md:text-2xl">Layanan pilihan untuk kamu</h2><p className="mt-1 text-[11px] leading-5 text-[#7a8783]">Layanan favorit di sekitar Cianjur minggu ini.</p></div><Link href="/services" className="flex shrink-0 items-center gap-1 text-[11px] font-extrabold">Lihat semua <ArrowRight size={14}/></Link></div><div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">{recommended.map((service, index)=><div key={service.id} className={index === 2 ? "col-span-2 md:col-span-1" : ""}><RecommendedServiceCard service={service} badge={index === 0 ? "Paling Laris" : index === 1 ? "Hemat" : "Premium"}/></div>)}</div></section>}
    <section className="mb-11"><div className="mb-4 flex items-end justify-between"><div><span className="text-[9px] font-black tracking-[.18em] text-[#2FA084]">LANJUTKAN AKTIVITAS</span><h2 className="mt-1 text-lg font-black tracking-[-.02em] md:text-2xl">Pesanan terbaru</h2></div><Link href="/orders" className="flex items-center gap-1 text-[11px] font-extrabold">Semua pesanan <ArrowRight size={14}/></Link></div><div className="grid gap-4 md:grid-cols-2">{orders.slice(0,2).map((order) => <OrderCard key={order.id} order={order}/>)}</div></section>
    <section className="mb-10"><div className="mb-4"><span className="text-[9px] font-black tracking-[.18em] text-[#2FA084]">TENANG, ADA RIDE HOME CARE</span><h2 className="mt-1 text-lg font-black tracking-[-.02em] md:text-2xl">Care tanpa was-was</h2></div><div className="grid gap-3 sm:grid-cols-3">{[{icon:BadgeCheck,title:"Partner terverifikasi",desc:"Identitas dan kemampuan partner telah kami cek."},{icon:ShieldCheck,title:"Jaminan layanan",desc:"Ada bantuan jika hasil belum sesuai standar."},{icon:Headphones,title:"Dukungan responsif",desc:"Tim kami siap membantu sebelum dan sesudah layanan."}].map(({icon:Icon,title,desc})=><article key={title} className="rounded-[22px] border border-[#D8DEDA] bg-white p-4 shadow-sm transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-md"><span className="grid size-10 place-items-center rounded-[14px] bg-[#FFF6DE] text-[#2FA084]"><Icon size={19}/></span><h3 className="mt-3 text-sm font-black">{title}</h3><p className="mt-1 text-[11px] leading-5 text-[#667085]">{desc}</p></article>)}</div></section>
    <section className="soft-grid relative overflow-hidden rounded-[28px] bg-[#2FA084] p-6 text-white shadow-[0_18px_48px_rgba(31,111,95,.18)] md:flex md:items-center md:justify-between md:p-8"><div className="relative z-10"><span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-[9px] font-black tracking-wider text-[#FFE394]"><Sparkles size={12}/> MULAI HARI INI</span><h2 className="mt-3 max-w-md text-2xl font-black leading-tight tracking-[-.03em]">Bersih, rapi, dan terawat tanpa ribet.</h2><p className="mt-2 max-w-md text-xs leading-5 text-white/60">Pilih layanan dan jadwalmu. Partner Ride Home Care akan datang langsung ke lokasi.</p></div><Link href={`/services/${services[0]?.id ?? "home-cleaning"}`} className="relative z-10 mt-5 inline-flex min-h-12 items-center gap-2 rounded-2xl bg-[#FFE394] px-5 text-xs font-black text-[#2FA084] transition-[transform,background-color] duration-200 hover:bg-[#5FC58D] active:scale-95 md:mt-0">Mulai pesan <ArrowRight size={15}/></Link><span className="absolute -bottom-24 -right-16 size-56 rounded-full bg-[#2FA084]/25"/></section>
  </main></AppShell>;
}
