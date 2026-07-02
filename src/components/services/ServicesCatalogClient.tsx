"use client";

import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { ServiceCard } from "@/components/home/ServiceCard";
import { readClientServices } from "@/lib/localData";
import type { Service } from "@/types";

export function ServicesCatalogClient() {
  const [services, setServices] = useState<Service[]>([]);
  const [query, setQuery] = useState("");

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

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return services.filter((service) => !q || `${service.name} ${service.category} ${service.shortName}`.toLowerCase().includes(q));
  }, [query, services]);

  return <AppShell compactHeader><main className="mx-auto w-full max-w-6xl px-4 pb-32 md:px-8"><div className="mb-6"><span className="text-[10px] font-black tracking-[.16em] text-[#2FA084]">KATALOG CARE</span><h1 className="mt-1 text-3xl font-black tracking-tight">Pilih layanan Ride N Care</h1><p className="mt-2 text-sm leading-6 text-[#667085]">Semua kebutuhan care harian, outdoor, kendaraan, dan ruang kerja dalam satu aplikasi.</p></div><label className="mb-5 flex h-13 items-center gap-3 rounded-[20px] border border-[#D8DEDA] bg-white px-4 shadow-sm"><Search size={18} className="text-[#667085]"/><input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Cari Home Care, Auto Care, Deep Clean..." className="w-full bg-transparent text-sm outline-none"/></label><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{filtered.map((service)=><ServiceCard key={service.id} service={service}/>)}</div></main></AppShell>;
}
