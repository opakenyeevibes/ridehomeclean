import { ChevronRight, Headphones, MessageCircleQuestion, ShieldCheck } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";

const topics = ["Cara mengubah jadwal", "Kebijakan pembatalan", "Jaminan hasil layanan", "Metode pembayaran", "Hubungi tim Ride N Care"];

export default function HelpPage() {
  return <AppShell compactHeader><main className="mx-auto w-full max-w-3xl px-4 pb-32 md:px-8"><section className="soft-grid rounded-[30px] bg-[#2FA084] p-6 text-white"><Headphones className="text-[#FFE394]"/><h1 className="mt-4 text-3xl font-black tracking-tight">Ada yang bisa kami bantu?</h1><p className="mt-2 text-sm leading-6 text-white/65">Pusat bantuan Ride N Care untuk customer, booking, pembayaran, dan layanan.</p></section><div className="mt-5 space-y-3">{topics.map((topic, index)=><button key={topic} className="card flex w-full items-center gap-3 p-4 text-left"><span className="grid size-10 place-items-center rounded-2xl bg-[#FFF6DE] text-[#2FA084]">{index < 2 ? <MessageCircleQuestion size={18}/> : <ShieldCheck size={18}/>}</span><b className="flex-1 text-sm">{topic}</b><ChevronRight size={16} className="text-[#9aa4a1]"/></button>)}</div></main></AppShell>;
}
