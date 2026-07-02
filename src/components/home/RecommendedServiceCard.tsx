import Link from "next/link";
import { ArrowUpRight, Clock3, Star } from "lucide-react";
import type { Service } from "@/types";
import { formatPrice } from "@/lib/utils";

const badgeTone = {
  "Paling Laris": "bg-[#2FA084] text-white",
  Hemat: "bg-[#FFE394] text-[#16332E]",
  Premium: "bg-[#F48F68] text-white",
};

export function RecommendedServiceCard({ service, badge }: { service: Service; badge: keyof typeof badgeTone }) {
  const Icon = service.icon;
  return <Link href={`/services/${service.id}`} className="group block h-full overflow-hidden rounded-[24px] border border-[#D8DEDA] bg-white shadow-[0_7px_24px_rgba(31,111,95,.055)] transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-1 hover:border-[#cbd9d3] hover:shadow-[0_18px_42px_rgba(31,111,95,.12)] active:scale-[.98] active:duration-100">
    <div className="relative flex h-32 items-center justify-center overflow-hidden md:h-40" style={{ background: service.color, color: service.accent }}>
      <span className="absolute -right-12 -top-14 size-36 rounded-full bg-white/35 transition-transform duration-500 group-hover:scale-125"/>
      <Icon size={54} strokeWidth={1.25} className="relative transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-105 md:size-[62px]"/>
      <span className={`absolute left-3 top-3 rounded-full px-2.5 py-1.5 text-[9px] font-black shadow-sm ${badgeTone[badge]}`}>{badge}</span>
      <span className="absolute bottom-3 right-3 flex items-center gap-1 rounded-xl bg-white/88 px-2.5 py-1.5 text-[10px] font-extrabold text-[#16332E] shadow-sm backdrop-blur"><Clock3 size={12}/>{service.duration}</span>
    </div>
    <div className="p-4 md:p-5"><div className="flex items-start justify-between gap-3"><div className="min-w-0"><h3 className="truncate text-[15px] font-black">{service.name}</h3><p className="mt-1 line-clamp-1 text-[11px] text-[#667085]">{service.tagline}</p></div><span className="flex shrink-0 items-center gap-1 rounded-lg bg-[#FFF6DE] px-2 py-1 text-[10px] font-black text-[#16332E]"><Star size={11} fill="#FFE394" strokeWidth={0}/>{service.rating}</span></div>
      <div className="mt-4 flex items-end justify-between border-t border-[#edf1ef] pt-3"><span><small className="block text-[9px] font-semibold text-[#8a9692]">Mulai dari</small><b className="text-[15px] tracking-tight">{formatPrice(service.startingPrice)}</b></span><span className="grid size-9 place-items-center rounded-xl bg-[#2FA084] text-white transition-transform duration-200 group-hover:rotate-3 group-hover:scale-105"><ArrowUpRight size={16}/></span></div>
    </div>
  </Link>;
}
