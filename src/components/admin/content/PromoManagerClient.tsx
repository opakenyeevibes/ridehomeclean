"use client";

import { useEffect, useState } from "react";
import { Copy, Plus, Save, Trash2 } from "lucide-react";
import type { Promo } from "@/types";
import { promoStorageKey, readPromos, savePromos } from "@/lib/localData";

const inputClass = "h-11 w-full rounded-2xl border border-[#D8DEDA] bg-white px-3 text-sm outline-none focus:border-[#2FA084]";

const newPromo = (count: number): Promo => ({
  id: `promo-${Date.now()}`,
  eyebrow: "PROMO BARU",
  title: "Judul promo baru",
  subtitle: "Deskripsi singkat promo.",
  code: "CAREBARU",
  tone: "mint",
  active: true,
  sortOrder: count + 1,
});

export function PromoManagerClient() {
  const [items, setItems] = useState<Promo[]>([]);

  useEffect(() => {
    const timer = window.setTimeout(() => setItems(readPromos()), 0);
    return () => window.clearTimeout(timer);
  }, []);

  const persist = (next: Promo[]) => { setItems(next); savePromos(next); };
  const update = (id: string, patch: Partial<Promo>) => persist(items.map((item)=>item.id===id?{...item,...patch}:item));
  const duplicate = (promo: Promo) => persist([{...promo,id:`${promo.id}-copy-${items.length+1}`,title:`${promo.title} Copy`,active:false,sortOrder:items.length+1},...items]);
  const remove = (id: string) => persist(items.filter((item)=>item.id!==id));
  const reset = () => { window.localStorage.removeItem(promoStorageKey); const next = readPromos(); setItems(next); window.dispatchEvent(new Event("ride-n-care-promos-updated")); };

  return <div className="space-y-5">
    <div className="flex flex-wrap items-center justify-between gap-3"><div><h2 className="text-lg font-extrabold">Promo & Voucher</h2><p className="mt-1 text-xs text-[#667085]">Voucher aktif akan tampil di halaman promo customer.</p></div><div className="flex gap-2"><button onClick={reset} className="h-11 rounded-xl border border-[#D8DEDA] bg-white px-4 text-xs font-black text-[#667085]">Reset</button><button onClick={()=>persist([newPromo(items.length),...items])} className="inline-flex h-11 items-center gap-2 rounded-xl bg-[#1F6F5F] px-4 text-xs font-black text-white"><Plus size={16}/>Tambah promo</button></div></div>
    <div className="grid gap-4 md:grid-cols-2">{items.sort((a,b)=>(a.sortOrder??1)-(b.sortOrder??1)).map((promo)=><article key={promo.id} className="card p-5">
      <div className="mb-4 flex items-center justify-between"><span className="rounded-full bg-[#EAFBF3] px-3 py-1 text-[10px] font-black text-[#1F6F5F]">{promo.active === false ? "Nonaktif" : "Aktif"}</span><div className="flex gap-2"><button onClick={()=>duplicate(promo)} className="grid size-8 place-items-center rounded-lg bg-[#EEEEEE]"><Copy size={14}/></button><button onClick={()=>remove(promo.id)} className="grid size-8 place-items-center rounded-lg bg-red-50 text-red-600"><Trash2 size={14}/></button></div></div>
      <div className="grid gap-3">
        <input className={inputClass} value={promo.eyebrow} onChange={(e)=>update(promo.id,{eyebrow:e.target.value})} placeholder="Eyebrow"/>
        <input className={inputClass} value={promo.title} onChange={(e)=>update(promo.id,{title:e.target.value})} placeholder="Judul"/>
        <input className={inputClass} value={promo.subtitle} onChange={(e)=>update(promo.id,{subtitle:e.target.value})} placeholder="Subtitle"/>
        <div className="grid grid-cols-3 gap-3"><input className={inputClass} value={promo.code} onChange={(e)=>update(promo.id,{code:e.target.value})}/><input className={inputClass} type="number" value={promo.sortOrder ?? 1} onChange={(e)=>update(promo.id,{sortOrder:Number(e.target.value)})}/><label className="flex items-center gap-2 text-xs font-bold"><input type="checkbox" checked={promo.active !== false} onChange={(e)=>update(promo.id,{active:e.target.checked})}/>Aktif</label></div>
      </div>
    </article>)}</div>
    <p className="inline-flex items-center gap-2 rounded-2xl bg-[#FFF6DE] px-4 py-3 text-xs font-bold text-[#1F6F5F]"><Save size={14}/> Perubahan otomatis tersimpan.</p>
  </div>;
}
