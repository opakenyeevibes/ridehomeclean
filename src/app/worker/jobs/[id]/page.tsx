"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Clock3, MapPin, Navigation, Phone, UserRound } from "lucide-react";
import { WorkerShell } from "@/components/worker/WorkerShell";
import { Button } from "@/components/ui/Button";
import { orders } from "@/data/orders";
import { formatPrice } from "@/lib/utils";

const actions = ["Saya menuju lokasi", "Saya sudah sampai", "Mulai pengerjaan", "Selesaikan pekerjaan"];

export default function WorkerJobDetail({ params }: { params: { id: string } }) {
  const order = orders.find((item)=>item.id===params.id) ?? orders[0];
  const [stage, setStage] = useState(0);
  return <WorkerShell title="Detail Job"><Link href="/worker/jobs" className="mb-5 inline-flex items-center gap-2 text-xs font-bold text-[#667085]"><ArrowLeft size={16}/> Kembali</Link><section className="soft-grid rounded-[28px] bg-[#2FA084] p-6 text-white"><span className="rounded-full bg-[#FFE394] px-3 py-1 text-[10px] font-black text-[#2FA084]">{stage>=4?"SELESAI":"JOB AKTIF"}</span><h1 className="mt-4 text-2xl font-black">{order.serviceName}</h1><p className="mt-1 text-sm text-white/60">{order.packageName} · {formatPrice(order.totalPrice)}</p></section><div className="card mt-4 p-5"><h3 className="font-extrabold">Customer & lokasi</h3><div className="mt-4 flex items-center gap-3"><span className="grid size-11 place-items-center rounded-xl bg-[#FFF6DE]"><UserRound size={19}/></span><span className="flex-1"><b className="block text-sm">{order.customerName}</b><small className="text-[#7d8985]">Customer Ride N Care</small></span><button className="grid size-10 place-items-center rounded-xl bg-[#FFF6DE] text-[#2FA084]"><Phone size={16}/></button></div><div className="my-4 border-t border-[#D8DEDA]"/><span className="flex gap-3 text-sm"><MapPin size={18} className="shrink-0 text-[#2FA084]"/><span><b>{order.address}</b><small className="mt-1 block text-[#7d8985]">{order.notes}</small></span></span><Button variant="secondary" className="mt-5 w-full"><Navigation size={16}/>Buka petunjuk arah</Button></div><div className="card mt-4 p-5"><h3 className="font-extrabold">Checklist pekerjaan</h3><div className="mt-4 space-y-3">{["Cek area bersama customer","Siapkan perlengkapan","Kerjakan sesuai paket","Finishing dan pengecekan","Minta konfirmasi customer"].map((x,i)=><label key={x} className="flex items-center gap-3 text-sm"><input type="checkbox" checked={i<stage} readOnly className="size-4 accent-[#2FA084]"/>{x}</label>)}</div></div>{stage<4?<Button className="mt-4 w-full" onClick={()=>setStage(stage+1)}><Clock3 size={16}/>{actions[stage]}</Button>:<div className="mt-4 rounded-2xl bg-[#FFF6DE] p-4 text-center text-sm font-bold text-[#2FA084]"><CheckCircle2 className="mr-2 inline" size={17}/>Pekerjaan selesai dan siap menunggu rating</div>}</WorkerShell>;
}
