"use client";
import { X } from "lucide-react";
import { Button } from "./Button";

export function Modal({ open, onClose, title, children, onConfirm, confirmText = "Ya, lanjutkan" }: { open: boolean; onClose: () => void; title: string; children: React.ReactNode; onConfirm?: () => void; confirmText?: string }) {
  if (!open) return null;
  return <div className="fixed inset-0 z-[100] grid place-items-end bg-[#10251f]/45 p-3 backdrop-blur-sm md:place-items-center" onClick={onClose}>
    <div className="w-full max-w-md animate-in rounded-[28px] bg-white p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
      <div className="mb-4 flex items-center justify-between"><h3 className="text-xl font-extrabold">{title}</h3><button aria-label="Tutup" onClick={onClose} className="grid size-10 place-items-center rounded-full bg-[#f2f5f4]"><X size={18}/></button></div>
      <div className="text-sm leading-6 text-[#667085]">{children}</div>
      <div className="mt-6 grid grid-cols-2 gap-3"><Button variant="ghost" onClick={onClose}>Kembali</Button><Button variant="danger" onClick={onConfirm}>{confirmText}</Button></div>
    </div>
  </div>;
}
