"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, BriefcaseBusiness, CalendarDays, Home, UserRound, WalletCards } from "lucide-react";
import { BrandMark } from "@/components/ui/BrandMark";
import { LogoutButton } from "@/components/auth/LogoutButton";

const nav = [
  { href: "/worker", label: "Dashboard", icon: Home },
  { href: "/worker/jobs", label: "Job", icon: BriefcaseBusiness },
  { href: "/worker/schedule", label: "Jadwal", icon: CalendarDays },
  { href: "/worker/earnings", label: "Earning", icon: WalletCards },
  { href: "/worker/profile", label: "Profil", icon: UserRound },
];

export function WorkerShell({ children, title = "Worker Hub" }: { children: React.ReactNode; title?: string }) {
  const path = usePathname();
  return <main className="mx-auto min-h-screen w-full max-w-lg bg-[#EEEEEE] px-4 pb-28 pt-5"><header className="mb-5 flex items-center justify-between"><Link href="/worker"><BrandMark compact/></Link><b className="text-sm">{title}</b><button className="grid size-10 place-items-center rounded-xl bg-white shadow-sm"><Bell size={17}/></button></header>{children}<nav className="fixed inset-x-0 bottom-0 z-50 px-2.5 pb-[max(7px,env(safe-area-inset-bottom))]"><div className="mx-auto flex max-w-lg justify-around rounded-[21px] border border-white/90 bg-white/94 px-1.5 py-1.5 shadow-[0_-5px_28px_rgba(31,111,95,.11)] backdrop-blur-xl">{nav.map(({href,label,icon:Icon})=>{const active=href==="/worker"?path===href:path.startsWith(href);return <Link key={href} href={href} className={`flex min-w-[58px] flex-col items-center gap-0.5 rounded-[15px] px-1 py-1 text-[9px] font-extrabold transition active:scale-95 ${active?"bg-[#FFF6DE] text-[#2FA084]":"text-[#98A2B3]"}`}><span className="grid size-[30px] place-items-center rounded-[11px]"><Icon size={16}/></span>{label}</Link>})}</div></nav></main>;
}

export function WorkerLogout() {
  return <LogoutButton className="mt-5"/>;
}
