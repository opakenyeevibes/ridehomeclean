"use client";
import { ShieldX } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";

export function AccessDenied() {
  const router = useRouter();
  return <main className="grid min-h-screen place-items-center bg-[#EEEEEE] p-5"><section className="card w-full max-w-md p-8 text-center"><span className="mx-auto grid size-16 place-items-center rounded-[22px] bg-[#FFF6DE] text-[#C4583D]"><ShieldX size={28}/></span><h1 className="mt-5 text-2xl font-black">Akses tidak tersedia</h1><p className="mt-2 text-sm leading-6 text-[#667085]">Maaf, kamu tidak punya akses ke halaman ini.</p><Button className="mt-6 w-full" onClick={() => { localStorage.removeItem("selectedRole"); window.dispatchEvent(new Event("role-change")); router.replace("/login"); }}>Pilih role lain</Button></section></main>;
}
