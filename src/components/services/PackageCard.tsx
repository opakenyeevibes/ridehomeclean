import type { Package } from "@/types";
import { Check, Clock3 } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";

export function PackageCard({ item, selected, onSelect }: { item: Package; selected?: boolean; onSelect?: () => void }) {
  return <button type="button" onClick={onSelect} aria-pressed={Boolean(selected)} className={cn("pressable relative w-full rounded-[22px] border bg-white p-5 text-left", selected ? "border-[#2FA084] bg-[#fbffef] shadow-[0_10px_24px_rgba(31,111,95,.08)] ring-2 ring-[#FFE394]" : "border-[#D8DEDA] hover:border-[#cad7d2]")}>
    {item.popular && <span className="absolute -top-3 right-4 rounded-full bg-[#2FA084] px-3 py-1 text-[9px] font-black tracking-wide text-white shadow-[0_5px_12px_rgba(31,111,95,.25)]">PALING DIMINATI</span>}
    <div className="flex items-start justify-between gap-3"><div><h3 className="font-extrabold">{item.name}</h3><span className="mt-1 flex items-center gap-1 text-[11px] font-semibold text-[#7e8c88]"><Clock3 size={13}/>{item.duration}</span></div><div className="text-right"><span className="block text-[10px] text-[#7e8c88]">Mulai dari</span><strong className="text-base">{formatPrice(item.price)}</strong></div></div>
    <p className="my-4 text-xs leading-5 text-[#667085]">{item.description}</p><div className="space-y-2">{item.features.map((feature) => <span key={feature} className="flex items-center gap-2 text-xs font-semibold"><span className="grid size-5 place-items-center rounded-full bg-[#FFF6DE] text-[#2FA084]"><Check size={12} strokeWidth={3}/></span>{feature}</span>)}</div>{selected && <span className="mt-4 flex items-center justify-center rounded-xl bg-[#2FA084] py-2 text-[10px] font-extrabold text-white">Paket dipilih</span>}
  </button>;
}
