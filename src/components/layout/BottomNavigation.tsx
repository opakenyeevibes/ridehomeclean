"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { House, ReceiptText, TicketPercent, UserRound } from "lucide-react";

const nav = [{ href: "/", label: "Beranda", icon: House }, { href: "/orders", label: "Pesanan", icon: ReceiptText }, { href: "/promos", label: "Promo", icon: TicketPercent }, { href: "/profile", label: "Profil", icon: UserRound }];
export function BottomNavigation() {
  const pathname = usePathname();
  return <nav aria-label="Navigasi utama" className="fixed inset-x-0 bottom-0 z-50 px-2.5 pb-[max(7px,env(safe-area-inset-bottom))] md:hidden"><div className="mx-auto flex max-w-lg justify-around rounded-[21px] border border-white/90 bg-white/94 px-1.5 py-1.5 shadow-[0_-5px_28px_rgba(31,111,95,.11)] backdrop-blur-xl">{nav.map(({ href, label, icon: Icon }) => { const active = href === "/" ? pathname === "/" : pathname.startsWith(href); return <Link aria-current={active ? "page" : undefined} key={href} href={href} className={`relative flex min-w-[60px] flex-col items-center gap-0.5 rounded-[15px] px-2 py-1 text-[9px] font-extrabold transition-all active:scale-95 ${active ? "bg-[#EAFBF3] text-[#1F6F5F]" : "text-[#98A2B3]"}`}><span className={`relative grid size-[30px] place-items-center rounded-[11px] transition-all duration-300 ${active ? "text-[#1F6F5F]" : "bg-transparent"}`}><Icon size={17} strokeWidth={active ? 2.6 : 2}/>{active && <span className="absolute -right-0.5 -top-0.5 size-1.5 rounded-full bg-[#6FCF97] ring-2 ring-white"/>}</span>{label}</Link>; })}</div></nav>;
}
