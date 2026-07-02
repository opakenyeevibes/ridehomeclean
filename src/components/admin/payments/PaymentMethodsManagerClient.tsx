"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import type { PaymentMethod } from "@/types";
import { paymentMethodStorageKey, readPaymentMethods, savePaymentMethods } from "@/lib/localData";

const inputClass = "h-11 w-full rounded-2xl border border-[#D8DEDA] bg-white px-3 text-sm outline-none focus:border-[#2FA084]";

export function PaymentMethodsManagerClient() {
  const [items, setItems] = useState<PaymentMethod[]>([]);

  useEffect(() => {
    const timer = window.setTimeout(() => setItems(readPaymentMethods()), 0);
    return () => window.clearTimeout(timer);
  }, []);

  const persist = (next: PaymentMethod[]) => { setItems(next); savePaymentMethods(next); };
  const update = (id: string, patch: Partial<PaymentMethod>) => persist(items.map((item)=>item.id===id?{...item,...patch}:item));
  const add = () => persist([{id:`pay-${Date.now()}`,name:"Metode Baru",enabled:true,description:"Deskripsi metode pembayaran"},...items]);
  const reset = () => { window.localStorage.removeItem(paymentMethodStorageKey); const next = readPaymentMethods(); setItems(next); window.dispatchEvent(new Event("ride-n-care-payment-methods-updated")); };

  return <div className="space-y-5">
    <div className="flex flex-wrap items-center justify-between gap-3"><div><h2 className="text-lg font-extrabold">Payment Methods</h2><p className="mt-1 text-xs text-[#667085]">Metode aktif akan muncul di step pembayaran customer.</p></div><div className="flex gap-2"><button onClick={reset} className="h-11 rounded-xl border border-[#D8DEDA] bg-white px-4 text-xs font-black text-[#667085]">Reset</button><button onClick={add} className="inline-flex h-11 items-center gap-2 rounded-xl bg-[#1F6F5F] px-4 text-xs font-black text-white"><Plus size={16}/>Tambah metode</button></div></div>
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{items.map((method)=><article key={method.id} className="card p-5">
      <div className="mb-4 flex items-center justify-between"><span className={`rounded-full px-3 py-1 text-[10px] font-black ${method.enabled?"bg-[#EAFBF3] text-[#1F6F5F]":"bg-slate-100 text-slate-500"}`}>{method.enabled?"Aktif":"Nonaktif"}</span><button onClick={()=>persist(items.filter((item)=>item.id!==method.id))} className="grid size-8 place-items-center rounded-lg bg-red-50 text-red-600"><Trash2 size={14}/></button></div>
      <div className="space-y-3"><input className={inputClass} value={method.name} onChange={(e)=>update(method.id,{name:e.target.value})}/><input className={inputClass} value={method.description ?? ""} onChange={(e)=>update(method.id,{description:e.target.value})} placeholder="Deskripsi"/><label className="flex items-center gap-2 text-xs font-bold"><input type="checkbox" checked={method.enabled} onChange={(e)=>update(method.id,{enabled:e.target.checked})}/>Tampil di customer</label></div>
    </article>)}</div>
  </div>;
}
