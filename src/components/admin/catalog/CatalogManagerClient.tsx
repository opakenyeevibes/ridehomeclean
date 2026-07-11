"use client";

import { useEffect, useMemo, useState } from "react";
import { Clock3, Copy, EyeOff, Pencil, Plus, Save, Star, Trash2, X } from "lucide-react";
import type { AddOn, ManagedService, Package } from "@/types";
import { categoryStyles } from "@/lib/categoryStyles";
import { managedToService, readManagedServices, saveManagedServices, serviceStorageKey } from "@/lib/localData";
import { defaultManagedServices } from "@/lib/defaultManagedServices";
import { cn, formatPrice } from "@/lib/utils";

const inputClass = "h-11 w-full rounded-2xl border border-[#D8DEDA] bg-white px-3 text-sm outline-none transition focus:border-[#2FA084] focus:ring-2 focus:ring-[#6FCF97]/35";
const areaClass = "min-h-24 w-full resize-none rounded-2xl border border-[#D8DEDA] bg-white p-3 text-sm outline-none transition focus:border-[#2FA084] focus:ring-2 focus:ring-[#6FCF97]/35";

const newPackage = (index: number): Package => ({
  id: `pkg-${Date.now()}-${index}`,
  name: "Basic Care",
  price: 75000,
  duration: "2 jam",
  description: "Deskripsi paket layanan.",
  features: ["Area utama dirawat", "Finishing dan pengecekan"],
});

const newAddOn = (index: number): AddOn => ({
  id: `addon-${Date.now()}-${index}`,
  name: "Add-on baru",
  price: 25000,
  duration: "+30 mnt",
});

const newService = (count: number): ManagedService => ({
  id: `service-${Date.now()}`,
  name: "Layanan Baru",
  shortName: "Baru",
  category: "Home Care",
  description: "Deskripsi layanan baru yang akan tampil di halaman customer.",
  tagline: "Tagline singkat layanan",
  rating: 4.8,
  totalReviews: 120,
  startingPrice: 75000,
  duration: "2–3 jam",
  pricingUnit: "per_order",
  quantityRule: { label: "Jumlah kebutuhan", unit: "area", min: 1, max: 5, helper: "Sesuaikan jumlah agar estimasi lebih akurat." },
  workerRule: { min: 1, recommended: 1, max: 3, allowManual: true },
  packages: [newPackage(1)],
  addOns: [newAddOn(1)],
  active: true,
  sortOrder: count + 1,
  styleKey: "home",
});

function Field({ label, children, hint }: { label: string; children: React.ReactNode; hint?: string }) {
  return <label className="block"><span className="mb-2 block text-xs font-black text-[#16332E]">{label}</span>{children}{hint && <small className="mt-1.5 block text-[10px] leading-4 text-[#98A2B3]">{hint}</small>}</label>;
}

export function CatalogManagerClient({ mode = "services" }: { mode?: "services" | "packages" }) {
  const [items, setItems] = useState<ManagedService[]>(defaultManagedServices);
  const [editing, setEditing] = useState<ManagedService | null>(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const localItems = readManagedServices();
      setItems(localItems);
      fetch("/api/prototype/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: localItems }),
      }).catch(() => null);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  const persist = (next: ManagedService[]) => {
    setItems(next);
    saveManagedServices(next);
    fetch("/api/prototype/services", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: next }),
    }).catch(() => null);
  };

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return [...items]
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .filter((item) => !q || `${item.name} ${item.category} ${item.shortName}`.toLowerCase().includes(q));
  }, [items, query]);

  const saveEditing = () => {
    if (!editing) return;
    const next = items.some((item) => item.id === editing.id)
      ? items.map((item) => (item.id === editing.id ? editing : item))
      : [editing, ...items];
    persist(next);
    setEditing(null);
  };

  const duplicate = (service: ManagedService) => {
    persist([{ ...service, id: `${service.id}-copy-${items.length + 1}`, name: `${service.name} Copy`, shortName: `${service.shortName} Copy`, active: false, sortOrder: items.length + 1 }, ...items]);
  };

  const remove = (id: string) => {
    if (window.confirm("Hapus layanan ini dari katalog lokal?")) persist(items.filter((item) => item.id !== id));
  };

  const toggle = (id: string) => persist(items.map((item) => (item.id === id ? { ...item, active: !item.active } : item)));
  const reset = () => {
    if (window.confirm("Reset semua layanan dan paket ke data awal?")) {
      window.localStorage.removeItem(serviceStorageKey);
      setItems(defaultManagedServices);
      fetch("/api/prototype/services", { method: "DELETE" }).catch(() => null);
      window.dispatchEvent(new Event("ride-n-care-services-updated"));
    }
  };

  const syncCustomer = () => {
    persist(items);
    window.alert("Data layanan sudah disinkronkan ke customer app lokal.");
  };

  return <div className="space-y-5">
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div>
        <h2 className="text-lg font-extrabold">{mode === "packages" ? "Package Management" : "Service Management"}</h2>
        <p className="mt-1 text-xs text-[#667085]">Perubahan tersimpan lokal dan dipakai di homepage, katalog, detail layanan, dan booking flow.</p>
      </div>
      <div className="flex flex-wrap gap-2">
        <button onClick={syncCustomer} className="h-11 rounded-xl border border-[#6FCF97] bg-[#E6F6EF] px-4 text-xs font-black text-[#1F6F5F]">Sync customer</button>
        <button onClick={reset} className="h-11 rounded-xl border border-[#D8DEDA] bg-white px-4 text-xs font-black text-[#667085]">Reset</button>
        <button onClick={() => setEditing(newService(items.length))} className="flex h-11 items-center gap-2 rounded-xl bg-[#1F6F5F] px-4 text-xs font-black text-white"><Plus size={16}/>Tambah layanan</button>
      </div>
    </div>

    <input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Cari layanan..." className="h-12 w-full rounded-2xl border border-[#D8DEDA] bg-white px-4 text-sm outline-none focus:border-[#2FA084] md:max-w-md"/>

    {mode === "packages" ? <PackageList items={filtered} onEdit={setEditing}/> : (
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((service) => {
          const visual = managedToService(service);
          const Icon = visual.icon;
          return <article key={service.id} className={cn("card p-5", !service.active && "opacity-60")}>
            <div className="flex items-start gap-3">
              <span className="grid size-12 place-items-center rounded-2xl" style={{ background: visual.color, color: visual.accent }}><Icon size={21}/></span>
              <span className="min-w-0 flex-1"><b className="block">{service.name}</b><small className="text-[#7e8b87]">{service.category} · Order {service.sortOrder}</small></span>
              <span className={cn("rounded-full px-2.5 py-1 text-[9px] font-black", service.active ? "bg-[#EAFBF3] text-[#1F6F5F]" : "bg-slate-100 text-slate-500")}>{service.active ? "Aktif" : "Nonaktif"}</span>
            </div>
            <div className="mt-5 flex items-center justify-between border-t border-[#edf1ef] pt-4 text-xs"><span className="flex items-center gap-1"><Star size={12}/>{service.rating}</span><span className="flex items-center gap-1"><Clock3 size={12}/>{service.duration}</span><b>{formatPrice(service.startingPrice)}</b></div>
            <div className="mt-4 flex flex-wrap gap-2">
              <button onClick={()=>setEditing(service)} className="grid size-9 place-items-center rounded-xl border border-[#D8DEDA] bg-white text-[#1F6F5F]" aria-label="Edit"><Pencil size={15}/></button>
              <button onClick={()=>duplicate(service)} className="grid size-9 place-items-center rounded-xl border border-[#D8DEDA] bg-white text-[#1F6F5F]" aria-label="Duplicate"><Copy size={15}/></button>
              <button onClick={()=>toggle(service.id)} className="grid size-9 place-items-center rounded-xl border border-[#D8DEDA] bg-white text-[#1F6F5F]" aria-label="Toggle"><EyeOff size={15}/></button>
              <button onClick={()=>remove(service.id)} className="grid size-9 place-items-center rounded-xl border border-red-100 bg-red-50 text-red-600" aria-label="Delete"><Trash2 size={15}/></button>
            </div>
          </article>;
        })}
      </div>
    )}

    {editing && <ServiceEditor value={editing} onChange={setEditing} onClose={()=>setEditing(null)} onSave={saveEditing}/>}
  </div>;
}

function PackageList({ items, onEdit }: { items: ManagedService[]; onEdit: (service: ManagedService) => void }) {
  return <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{items.flatMap((service) => service.packages.map((pkg) => (
    <article key={`${service.id}-${pkg.id}`} className="card p-5">
      <small className="font-black tracking-wider text-[#2FA084]">{service.name}</small>
      <b className="mt-2 block">{pkg.name}</b>
      <p className="mt-1 text-xs leading-5 text-[#667085]">{pkg.description}</p>
      <div className="mt-4 flex items-center justify-between text-xs"><span>{pkg.duration}</span><b>{formatPrice(pkg.price)}</b></div>
      <button onClick={()=>onEdit(service)} className="mt-4 h-10 rounded-xl bg-[#EAFBF3] px-4 text-xs font-black text-[#1F6F5F]">Edit paket layanan ini</button>
    </article>
  )))}</div>;
}

function ServiceEditor({ value, onChange, onClose, onSave }: { value: ManagedService; onChange: (value: ManagedService) => void; onClose: () => void; onSave: () => void }) {
  const set = <K extends keyof ManagedService>(key: K, next: ManagedService[K]) => onChange({ ...value, [key]: next });
  const updatePackage = (index: number, next: Package) => set("packages", value.packages.map((item, i) => (i === index ? next : item)));
  const updateAddOn = (index: number, next: AddOn) => set("addOns", value.addOns.map((item, i) => (i === index ? next : item)));

  return <div className="fixed inset-0 z-[140] overflow-y-auto bg-[#10251f]/55 p-4 backdrop-blur-sm">
    <div className="mx-auto my-6 max-w-5xl rounded-[30px] bg-white p-5 shadow-2xl md:p-6">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div><h3 className="text-xl font-black">Edit layanan & paket</h3><p className="mt-1 text-xs text-[#667085]">Data ini akan dipakai customer app setelah disimpan.</p></div>
        <button onClick={onClose} className="grid size-10 place-items-center rounded-xl bg-[#EEEEEE]"><X size={17}/></button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Nama layanan"><input className={inputClass} value={value.name} onChange={(e)=>set("name", e.target.value)}/></Field>
        <Field label="Label pendek"><input className={inputClass} value={value.shortName} onChange={(e)=>set("shortName", e.target.value)}/></Field>
        <Field label="Kategori"><input className={inputClass} value={value.category} onChange={(e)=>set("category", e.target.value)}/></Field>
        <Field label="Icon warna"><select className={inputClass} value={value.styleKey} onChange={(e)=>set("styleKey", e.target.value)}>{Object.keys(categoryStyles).map((key)=><option key={key} value={key}>{key}</option>)}</select></Field>
        <Field label="Harga mulai"><input className={inputClass} type="number" value={value.startingPrice} onChange={(e)=>set("startingPrice", Number(e.target.value))}/></Field>
        <Field label="Durasi"><input className={inputClass} value={value.duration} onChange={(e)=>set("duration", e.target.value)}/></Field>
        <Field label="Rating"><input className={inputClass} type="number" step="0.1" value={value.rating} onChange={(e)=>set("rating", Number(e.target.value))}/></Field>
        <Field label="Total review"><input className={inputClass} type="number" value={value.totalReviews} onChange={(e)=>set("totalReviews", Number(e.target.value))}/></Field>
        <Field label="Urutan tampil"><input className={inputClass} type="number" value={value.sortOrder} onChange={(e)=>set("sortOrder", Number(e.target.value))}/></Field>
        <label className="flex items-center gap-3 rounded-2xl border border-[#D8DEDA] bg-white px-4 py-3 text-sm font-bold"><input type="checkbox" checked={value.active} onChange={(e)=>set("active", e.target.checked)} className="size-4 accent-[#1F6F5F]"/>Aktif tampil di customer</label>
        <div className="md:col-span-2"><Field label="Tagline"><input className={inputClass} value={value.tagline} onChange={(e)=>set("tagline", e.target.value)}/></Field></div>
        <div className="md:col-span-2"><Field label="Deskripsi"><textarea className={areaClass} value={value.description} onChange={(e)=>set("description", e.target.value)}/></Field></div>
      </div>

      <div className="mt-7 rounded-[24px] bg-[#EEEEEE] p-4">
        <div className="flex items-center justify-between"><h4 className="font-black">Paket layanan</h4><button onClick={()=>set("packages", [...value.packages, newPackage(value.packages.length + 1)])} className="rounded-xl bg-white px-3 py-2 text-xs font-black text-[#1F6F5F]"><Plus size={14} className="inline"/> Tambah paket</button></div>
        <div className="mt-4 grid gap-3">
          {value.packages.map((pkg, index)=><div key={pkg.id} className="rounded-2xl bg-white p-4">
            <div className="grid gap-3 md:grid-cols-4">
              <input className={inputClass} value={pkg.name} onChange={(e)=>updatePackage(index,{...pkg,name:e.target.value})} placeholder="Nama paket"/>
              <input className={inputClass} type="number" value={pkg.price} onChange={(e)=>updatePackage(index,{...pkg,price:Number(e.target.value)})} placeholder="Harga"/>
              <input className={inputClass} value={pkg.duration} onChange={(e)=>updatePackage(index,{...pkg,duration:e.target.value})} placeholder="Durasi"/>
              <label className="flex items-center gap-2 text-xs font-bold"><input type="checkbox" checked={Boolean(pkg.popular)} onChange={(e)=>updatePackage(index,{...pkg,popular:e.target.checked})}/>Popular</label>
            </div>
            <textarea className={`${areaClass} mt-3`} value={pkg.description} onChange={(e)=>updatePackage(index,{...pkg,description:e.target.value})} placeholder="Deskripsi paket"/>
            <input className={`${inputClass} mt-3`} value={pkg.features.join(", ")} onChange={(e)=>updatePackage(index,{...pkg,features:e.target.value.split(",").map((item)=>item.trim()).filter(Boolean)})} placeholder="Checklist, pisahkan koma"/>
            <button onClick={()=>set("packages", value.packages.filter((_, i)=>i!==index))} className="mt-2 text-xs font-black text-red-600">Hapus paket</button>
          </div>)}
        </div>
      </div>

      <div className="mt-5 rounded-[24px] bg-[#EEEEEE] p-4">
        <div className="flex items-center justify-between"><h4 className="font-black">Add-ons</h4><button onClick={()=>set("addOns", [...value.addOns, newAddOn(value.addOns.length + 1)])} className="rounded-xl bg-white px-3 py-2 text-xs font-black text-[#1F6F5F]"><Plus size={14} className="inline"/> Tambah add-on</button></div>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {value.addOns.map((addon, index)=><div key={addon.id} className="rounded-2xl bg-white p-4">
            <input className={inputClass} value={addon.name} onChange={(e)=>updateAddOn(index,{...addon,name:e.target.value})} placeholder="Nama add-on"/>
            <div className="mt-3 grid grid-cols-2 gap-3"><input className={inputClass} type="number" value={addon.price} onChange={(e)=>updateAddOn(index,{...addon,price:Number(e.target.value)})}/><input className={inputClass} value={addon.duration} onChange={(e)=>updateAddOn(index,{...addon,duration:e.target.value})}/></div>
            <button onClick={()=>set("addOns", value.addOns.filter((_, i)=>i!==index))} className="mt-2 text-xs font-black text-red-600">Hapus add-on</button>
          </div>)}
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-2"><button onClick={onClose} className="h-11 rounded-xl border border-[#D8DEDA] px-4 text-xs font-black">Batal</button><button onClick={onSave} className="inline-flex h-11 items-center gap-2 rounded-xl bg-[#1F6F5F] px-4 text-xs font-black text-white"><Save size={15}/>Simpan perubahan</button></div>
    </div>
  </div>;
}
