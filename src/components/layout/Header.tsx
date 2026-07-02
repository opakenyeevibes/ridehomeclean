"use client";
import Link from "next/link";
import { Bell, ChevronDown, MapPin, Search } from "lucide-react";
import { BrandMark } from "@/components/ui/BrandMark";

export function Header({ compact = false }: { compact?: boolean }) {
  return <header className="sticky top-0 z-40 mb-2 border-b border-[#D8DEDA]/75 bg-[#EEEEEE]/92 backdrop-blur-xl"><div className="mx-auto flex h-[62px] w-full max-w-7xl items-center gap-2 px-4 md:h-[70px] md:gap-3 md:px-8">
    <Link href="/" aria-label="Ride N Care Beranda" className="pressable shrink-0 rounded-xl"><BrandMark compact showName className="gap-1.5"/></Link>
    {!compact && <button className="pressable flex min-w-0 max-w-[150px] flex-1 items-center gap-1.5 rounded-[15px] border border-[#D8DEDA] bg-white px-2 py-2 text-left shadow-sm sm:max-w-[190px] sm:gap-2 sm:px-3"><MapPin size={14} className="shrink-0 text-[#2FA084]"/><span className="min-w-0 flex-1"><span className="block text-[8px] font-black tracking-[.09em] text-[#83908c]">LOKASI</span><span className="block truncate text-[10px] font-extrabold sm:text-xs">Cianjur, Jawa Barat</span></span><ChevronDown size={12} className="shrink-0 text-[#7c8985]"/></button>}
    <div className="ml-auto hidden w-full max-w-xs items-center gap-2 rounded-[15px] border border-[#D8DEDA] bg-white px-4 py-2.5 text-sm text-[#8a9692] lg:flex"><Search size={17}/> Mau dirawat apa hari ini?</div>
    <button aria-label="Notifikasi" className="pressable relative ml-auto grid size-10 shrink-0 place-items-center rounded-[14px] border border-[#D8DEDA] bg-white shadow-sm"><Bell size={18}/><span className="absolute right-2 top-1.5 size-2 rounded-full bg-[#2FA084] ring-2 ring-white"/></button>
    <Link href="/profile" aria-label="Buka profil Alya" className="pressable grid size-10 shrink-0 place-items-center rounded-[14px] border border-[#FFE394] bg-[#FFF6DE] text-[11px] font-black text-[#2FA084]">AP</Link>
  </div></header>;
}
