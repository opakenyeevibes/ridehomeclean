"use client";

import Link from "next/link";
import { useState } from "react";
import { BriefcaseBusiness, ShieldCheck, UserRound } from "lucide-react";
import { useRouter } from "next/navigation";
import type { UserRole } from "@/types";
import { BrandMark } from "@/components/ui/BrandMark";
import { RoleSelectionCard } from "@/components/auth/RoleSelectionCard";

export default function LoginPage() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState("admin@ridencare.local");
  const [password, setPassword] = useState("Admin12345!");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const goToRole = (role: UserRole) => router.replace(role === "customer" ? "/" : role === "worker" ? "/worker" : "/admin");
  const selectRole = (role: UserRole) => { localStorage.setItem("selectedRole", role); window.dispatchEvent(new Event("role-change")); goToRole(role); };

  const login = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    const response = await fetch("/api/auth/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ identifier, password }) });
    const payload = await response.json();
    setLoading(false);
    if (!response.ok || !payload.ok) {
      setError(payload.error ?? "Login gagal.");
      return;
    }
    localStorage.setItem("selectedRole", payload.data.role);
    window.dispatchEvent(new Event("role-change"));
    goToRole(payload.data.role);
  };

  return <main className="relative grid min-h-screen place-items-center overflow-hidden bg-[#EEEEEE] p-4"><span className="absolute -left-20 -top-20 size-72 rounded-full bg-[#FFE394]/35 blur-3xl"/><span className="absolute -bottom-24 -right-16 size-72 rounded-full bg-[#A7D8FF]/30 blur-3xl"/><section className="relative w-full max-w-lg"><div className="mb-7 text-center"><BrandMark showName className="justify-center"/><h1 className="mt-6 text-3xl font-black tracking-[-.04em]">Masuk ke Ride N Care</h1><p className="mt-2 text-sm text-[#667085]">Gunakan akun MySQL production atau quick role untuk demo lokal.</p></div>
    <form onSubmit={login} className="card mb-4 space-y-3 p-5">
      <label className="block"><span className="mb-2 block text-xs font-black">Email atau phone</span><input value={identifier} onChange={(event)=>setIdentifier(event.target.value)} className="h-12 w-full rounded-2xl border border-[#D8DEDA] px-4 text-sm outline-none focus:border-[#2FA084]"/></label>
      <label className="block"><span className="mb-2 block text-xs font-black">Password</span><input value={password} onChange={(event)=>setPassword(event.target.value)} type="password" className="h-12 w-full rounded-2xl border border-[#D8DEDA] px-4 text-sm outline-none focus:border-[#2FA084]"/></label>
      {error && <p className="rounded-2xl bg-red-50 p-3 text-xs font-bold text-red-600">{error}</p>}
      <button disabled={loading} className="h-12 w-full rounded-2xl bg-[#1F6F5F] text-sm font-black text-white disabled:opacity-50">{loading ? "Memproses..." : "Masuk"}</button>
      <p className="text-center text-xs text-[#667085]">Belum punya akun? <Link href="/register" className="font-black text-[#1F6F5F]">Daftar customer</Link></p>
    </form>
    <div className="space-y-3"><RoleSelectionCard role="customer" title="Dev: Customer" description="Fallback demo tanpa database." icon={UserRound} tone="#FFF6DE" onSelect={selectRole}/><RoleSelectionCard role="worker" title="Dev: Worker" description="Fallback demo tanpa database." icon={BriefcaseBusiness} tone="#FFF6DE" onSelect={selectRole}/><RoleSelectionCard role="admin" title="Dev: Admin" description="Fallback demo tanpa database." icon={ShieldCheck} tone="#FFF6DE" onSelect={selectRole}/></div><p className="mt-6 text-center text-[10px] leading-5 text-[#8B9492]">Default admin seed: admin@ridencare.local · Admin12345!</p></section></main>;
}
