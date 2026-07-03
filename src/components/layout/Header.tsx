"use client";
import Link from "next/link";
import { useState } from "react";
import { Search } from "lucide-react";
import { BrandMark } from "@/components/ui/BrandMark";
import { LocationSelector } from "@/components/ui/LocationSelector";
import { NotificationCenter } from "@/components/ui/NotificationCenter";

export function Header({ compact = false }: { compact?: boolean }) {
  const [query, setQuery] = useState("");
  const submitSearch = (event: React.FormEvent) => {
    event.preventDefault();
    const target = query.trim() ? `/services?q=${encodeURIComponent(query.trim())}` : "/services";
    window.location.href = target;
  };
  return <header className="sticky top-0 z-40 mb-2 border-b border-[#D8DEDA]/75 bg-[#EEEEEE]/92 backdrop-blur-xl"><div className="mx-auto flex h-[62px] w-full max-w-7xl items-center gap-2 px-4 md:h-[70px] md:gap-3 md:px-8">
    <Link href="/" aria-label="Ride Home Care Beranda" className="pressable shrink-0 rounded-xl"><BrandMark compact showName className="gap-1.5"/></Link>
    {!compact && <LocationSelector />}
    <form onSubmit={submitSearch} className="ml-auto hidden w-full max-w-xs items-center gap-2 rounded-[15px] border border-[#D8DEDA] bg-white px-4 py-2.5 text-sm text-[#8a9692] transition focus-within:border-[#C8D3CE] focus-within:shadow-[0_10px_24px_rgba(31,111,95,.09)] lg:flex">
      <Search size={17} className="shrink-0"/>
      <input value={query} onChange={(event)=>setQuery(event.target.value)} placeholder="Mau dirawat apa hari ini?" className="app-search-input min-w-0 flex-1 appearance-none border-0 bg-transparent p-0 outline-none ring-0 placeholder:text-[#8a9692] focus:border-0 focus:outline-none focus:ring-0"/>
    </form>
    <NotificationCenter role="customer" />
    <Link href="/profile" aria-label="Buka profil Alya" className="pressable grid size-10 shrink-0 place-items-center rounded-[14px] border border-[#FFE394] bg-[#FFF6DE] text-[11px] font-black text-[#2FA084]">AP</Link>
  </div></header>;
}
