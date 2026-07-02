"use client";
import type { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";
import type { UserRole } from "@/types";

export function RoleSelectionCard({ role, title, description, icon: Icon, onSelect, tone }: { role: UserRole; title: string; description: string; icon: LucideIcon; onSelect: (role: UserRole) => void; tone: string }) {
  return <button onClick={() => onSelect(role)} className="group flex w-full items-center gap-4 rounded-[24px] border border-[#D8DEDA] bg-white p-5 text-left shadow-sm transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-1 hover:border-[#FFE394] hover:shadow-lg active:scale-[.98]"><span className="grid size-13 shrink-0 place-items-center rounded-[17px]" style={{ background: tone }}><Icon size={23}/></span><span className="min-w-0 flex-1"><b className="block text-base font-black">{title}</b><span className="mt-1 block text-xs leading-5 text-[#667085]">{description}</span></span><span className="grid size-9 shrink-0 place-items-center rounded-xl bg-[#2FA084] text-[#FFE394] transition-transform group-hover:translate-x-1"><ArrowRight size={16}/></span></button>;
}
