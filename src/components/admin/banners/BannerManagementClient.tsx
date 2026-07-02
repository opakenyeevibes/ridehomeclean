"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Copy, Eye, Pencil, Plus, Trash2 } from "lucide-react";
import type { Banner } from "@/types";
import { bannerStorageKey, defaultBanners } from "@/data/banners";
import { BannerPreview } from "@/components/banners/BannerPreview";

const typeLabels = { main_banner: "Main Hero", side_banner: "Side Promo" };

function loadBanners() {
  try {
    const stored = localStorage.getItem(bannerStorageKey);
    return stored ? JSON.parse(stored) as Banner[] : defaultBanners;
  } catch {
    return defaultBanners;
  }
}

function saveBanners(banners: Banner[]) {
  localStorage.setItem(bannerStorageKey, JSON.stringify(banners));
}

export function BannerManagementClient() {
  const [banners, setBanners] = useState<Banner[]>(defaultBanners);
  const [preview, setPreview] = useState<Banner | null>(null);
  useEffect(() => {
    const timer = window.setTimeout(() => setBanners(loadBanners()), 0);
    return () => window.clearTimeout(timer);
  }, []);
  const update = (next: Banner[]) => { setBanners(next); saveBanners(next); };
  const toggle = (id: string) => update(banners.map((banner)=>banner.id===id?{...banner,isActive:!banner.isActive,updatedAt:new Date().toISOString().slice(0,10)}:banner));
  const duplicate = (banner: Banner) => update([{...banner,id:`BNR-${Date.now()}`,internalTitle:`${banner.internalTitle} Copy`,isActive:false,sortOrder:banner.sortOrder+1,createdAt:new Date().toISOString().slice(0,10),updatedAt:new Date().toISOString().slice(0,10)},...banners]);
  const remove = (id: string) => update(banners.filter((banner)=>banner.id!==id));
  return <div className="space-y-5">
    <div className="flex flex-wrap items-center justify-between gap-3"><div><h2 className="text-lg font-extrabold">Banner Management</h2><p className="mt-1 text-xs text-[#667085]">Kelola homepage main banner dan side promo tanpa edit kode.</p></div><Link href="/admin/content/banners/new" className="inline-flex h-11 items-center gap-2 rounded-xl bg-[#1F6F5F] px-4 text-xs font-black text-white"><Plus size={16}/>Buat banner</Link></div>
    <div className="grid gap-4 xl:grid-cols-2">{[...banners].sort((a,b)=>a.sortOrder-b.sortOrder).map((banner)=><article key={banner.id} className="card overflow-hidden p-4"><div className="grid gap-4 md:grid-cols-[180px_1fr]"><div className="h-32 overflow-hidden rounded-2xl bg-[#EEEEEE]"><BannerPreview banner={banner} viewport="mobile" className="h-full min-h-0 scale-[.68] origin-top-left md:w-[265px]"/></div><div className="min-w-0"><div className="flex items-start justify-between gap-3"><div><span className="text-[10px] font-black tracking-wider text-[#98A2B3]">{banner.id}</span><h3 className="mt-1 font-black">{banner.internalTitle}</h3><p className="mt-1 text-xs text-[#667085]">{typeLabels[banner.bannerType]} · {banner.mode === "image" ? "Media Upload" : "Template Mode"} · Order {banner.sortOrder}</p></div><button onClick={()=>toggle(banner.id)} className={`rounded-full px-3 py-1 text-[10px] font-black ${banner.isActive?"bg-[#EAFBF3] text-[#1F6F5F]":"bg-slate-100 text-slate-500"}`}>{banner.isActive?"Aktif":"Nonaktif"}</button></div><div className="mt-4 grid grid-cols-2 gap-2 text-[11px] text-[#667085]"><span>Mulai: <b>{banner.startDate || "-"}</b></span><span>Selesai: <b>{banner.endDate || "-"}</b></span></div><div className="mt-4 flex flex-wrap gap-2"><button onClick={()=>setPreview(banner)} className="grid size-9 place-items-center rounded-xl border border-[#D8DEDA] bg-white text-[#1F6F5F]" aria-label="Preview"><Eye size={15}/></button><Link href={`/admin/content/banners/${banner.id}`} className="grid size-9 place-items-center rounded-xl border border-[#D8DEDA] bg-white text-[#1F6F5F]" aria-label="Edit"><Pencil size={15}/></Link><button onClick={()=>duplicate(banner)} className="grid size-9 place-items-center rounded-xl border border-[#D8DEDA] bg-white text-[#1F6F5F]" aria-label="Duplicate"><Copy size={15}/></button><button onClick={()=>remove(banner.id)} className="grid size-9 place-items-center rounded-xl border border-red-100 bg-red-50 text-red-600" aria-label="Delete"><Trash2 size={15}/></button></div></div></div></article>)}</div>
    {preview && <div className="fixed inset-0 z-[120] grid place-items-center bg-[#10251f]/55 p-4 backdrop-blur-sm" onClick={()=>setPreview(null)}><div className="w-full max-w-4xl rounded-[30px] bg-white p-5 shadow-2xl" onClick={(event)=>event.stopPropagation()}><div className="mb-4 flex items-center justify-between"><div><h3 className="font-black">{preview.internalTitle}</h3><p className="text-xs text-[#667085]">Live preview homepage</p></div><button onClick={()=>setPreview(null)} className="rounded-xl bg-[#EEEEEE] px-3 py-2 text-xs font-black">Tutup</button></div><BannerPreview banner={preview}/></div></div>}
  </div>;
}
