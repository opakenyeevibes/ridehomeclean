"use client";
import Link from "next/link";
import { Search } from "lucide-react";
import { BrandMark } from "@/components/ui/BrandMark";
import { LocationSelector } from "@/components/ui/LocationSelector";
import { NotificationCenter } from "@/components/ui/NotificationCenter";

export function Header({ compact = false }: { compact?: boolean }) {
  return <header className="sticky top-0 z-40 mb-2 border-b border-[#D8DEDA]/75 bg-[#EEEEEE]/92 backdrop-blur-xl"><div className="mx-auto flex h-[62px] w-full max-w-7xl items-center gap-2 px-4 md:h-[70px] md:gap-3 md:px-8">
    <Link href="/" aria-label="Ride N Care Beranda" className="pressable shrink-0 rounded-xl"><BrandMark compact showName className="gap-1.5"/></Link>
    {!compact && <LocationSelector />}
    <div className="ml-auto hidden w-full max-w-xs items-center gap-2 rounded-[15px] border border-[#D8DEDA] bg-white px-4 py-2.5 text-sm text-[#8a9692] lg:flex"><Search size={17}/> Mau dirawat apa hari ini?</div>
    <NotificationCenter role="customer" />
    <Link href="/profile" aria-label="Buka profil Alya" className="pressable grid size-10 shrink-0 place-items-center rounded-[14px] border border-[#FFE394] bg-[#FFF6DE] text-[11px] font-black text-[#2FA084]">AP</Link>
  </div></header>;
}
