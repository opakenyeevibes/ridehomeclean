import Link from "next/link";
import { ChevronRight, CircleHelp, CreditCard, Gift, Mail, MapPin, Phone, ShieldCheck, UserRound } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { LogoutButton } from "@/components/auth/LogoutButton";
import { currentCustomer } from "@/data/users";

const menu = [
  { icon: MapPin, title: "Alamat tersimpan", desc: "Kelola alamat rumah dan kantor", href: "/profile/addresses" },
  { icon: CreditCard, title: "Metode pembayaran", desc: "QRIS, tunai, transfer, e-wallet", href: "/profile/payments" },
  { icon: Gift, title: "Promo & voucher", desc: "Voucher aktif untuk pesananmu", href: "/promos" },
  { icon: CircleHelp, title: "Pusat bantuan", desc: "Kami siap membantu", href: "/help" },
  { icon: ShieldCheck, title: "Syarat & privasi", desc: "Ketentuan layanan Ride Home Care", href: "/help" },
];

export default function Profile() {
  const initials = currentCustomer.name.split(" ").map((part) => part[0]).join("");
  return <AppShell><main className="mx-auto w-full max-w-3xl px-4 pb-32 md:px-8"><section className="soft-grid relative overflow-hidden rounded-[30px] bg-[#2FA084] p-6 text-white"><div className="flex items-center gap-4"><span className="grid size-20 place-items-center rounded-[24px] bg-[#FFF6DE] text-xl font-black text-[#2FA084]">{initials}</span><div><span className="text-[10px] font-bold tracking-wider text-[#FFE394]">MEMBER SEJAK {currentCustomer.memberSince}</span><h1 className="mt-1 text-2xl font-black">{currentCustomer.name}</h1><span className="text-xs text-white/60">Customer Ride Home Care</span></div></div></section><section className="card -mt-2 p-5"><div className="grid gap-4 md:grid-cols-3"><span className="flex items-center gap-3"><UserRound size={17} className="text-[#2FA084]"/><span><small className="block text-[#84908c]">Nama</small><b className="text-xs">{currentCustomer.name}</b></span></span><span className="flex items-center gap-3"><Phone size={17} className="text-[#2FA084]"/><span><small className="block text-[#84908c]">Telepon</small><b className="text-xs">{currentCustomer.phone}</b></span></span><span className="flex items-center gap-3"><Mail size={17} className="text-[#2FA084]"/><span><small className="block text-[#84908c]">Email</small><b className="text-xs">{currentCustomer.email}</b></span></span></div></section><div className="mt-6 space-y-3">{menu.map(({icon:Icon,title,desc,href})=><Link href={href} key={title} className="card flex w-full items-center gap-4 p-4 text-left transition hover:-translate-y-0.5 hover:shadow-md active:scale-[.99]"><span className="grid size-11 place-items-center rounded-2xl bg-[#FFF6DE] text-[#2FA084]"><Icon size={19}/></span><span className="flex-1"><b className="block text-sm">{title}</b><small className="text-[#7b8884]">{desc}</small></span><ChevronRight size={17} className="text-[#9aa4a1]"/></Link>)}</div><LogoutButton className="mt-6"/></main></AppShell>;
}
