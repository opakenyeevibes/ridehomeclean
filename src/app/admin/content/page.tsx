import Link from "next/link";
import { Images, Megaphone, TicketPercent } from "lucide-react";
import { AdminShell } from "@/components/admin/AdminShell";

const modules = [
  { href: "/admin/content/banners", title: "Banner Management", desc: "Kelola homepage main banner, side promo, image banner, dan template banner.", icon: Images, tone: "#EAFBF3" },
  { href: "/admin/promos", title: "Promo & Voucher", desc: "Kelola kode promo dan campaign ringan.", icon: TicketPercent, tone: "#FFF6DE" },
  { href: "/admin/services", title: "Service Highlight", desc: "Atur layanan yang ingin ditonjolkan di katalog.", icon: Megaphone, tone: "#8BDFDD" },
];

export default function AdminContentPage() {
  return <AdminShell title="Content Management" desc="Kelola konten yang tampil di aplikasi customer Ride Home Care."><div className="grid gap-4 md:grid-cols-3">{modules.map(({href,title,desc,icon:Icon,tone})=><Link href={href} key={title} className="card p-5 transition hover:-translate-y-0.5 hover:shadow-md"><span className="grid size-12 place-items-center rounded-2xl text-[#1F6F5F]" style={{background:tone}}><Icon size={21}/></span><h2 className="mt-5 text-lg font-black">{title}</h2><p className="mt-2 text-sm leading-6 text-[#667085]">{desc}</p></Link>)}</div></AdminShell>;
}
