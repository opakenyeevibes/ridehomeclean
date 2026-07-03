"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import type { UserRole } from "@/types";
import { BrandMark } from "@/components/ui/BrandMark";
import { GoogleAuthButton } from "@/components/auth/GoogleAuthButton";

export default function LoginPage() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const goToRole = (role: UserRole) => router.replace(role === "customer" ? "/" : role === "worker" ? "/worker" : "/admin");

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

  return <main className="relative grid min-h-screen place-items-center overflow-hidden bg-[#EEEEEE] p-4"><span className="absolute -left-20 -top-20 size-72 rounded-full bg-[#FFE394]/35 blur-3xl"/><span className="absolute -bottom-24 -right-16 size-72 rounded-full bg-[#A7D8FF]/30 blur-3xl"/><section className="relative w-full max-w-lg"><div className="mb-7 text-center"><BrandMark showName className="justify-center"/><h1 className="mt-6 text-3xl font-black tracking-[-.04em]">Masuk ke Ride Home Care</h1><p className="mt-2 text-sm text-[#667085]">Masuk untuk booking layanan home care langsung ke lokasi kamu.</p></div>
    <form onSubmit={login} className="card space-y-3 p-5">
      <GoogleAuthButton label="Masuk cepat dengan Google" />
      <div className="flex items-center gap-3 py-1"><span className="h-px flex-1 bg-[#E5EAE8]"/><span className="text-[10px] font-black tracking-[.12em] text-[#98A2B3]">ATAU MASUK MANUAL</span><span className="h-px flex-1 bg-[#E5EAE8]"/></div>
      <label className="block"><span className="mb-2 block text-xs font-black">Email atau phone</span><input value={identifier} onChange={(event)=>setIdentifier(event.target.value)} placeholder="contoh: nama@email.com" className="h-12 w-full rounded-2xl border border-[#D8DEDA] px-4 text-sm outline-none focus:border-[#2FA084]"/></label>
      <label className="block"><span className="mb-2 block text-xs font-black">Password</span><input value={password} onChange={(event)=>setPassword(event.target.value)} type="password" className="h-12 w-full rounded-2xl border border-[#D8DEDA] px-4 text-sm outline-none focus:border-[#2FA084]"/></label>
      {error && <p className="rounded-2xl bg-red-50 p-3 text-xs font-bold text-red-600">{error}</p>}
      <button disabled={loading} className="h-12 w-full rounded-2xl bg-[#1F6F5F] text-sm font-black text-white disabled:opacity-50">{loading ? "Memproses..." : "Masuk"}</button>
      <p className="text-center text-xs text-[#667085]">Belum punya akun? <Link href="/register" className="font-black text-[#1F6F5F]">Daftar customer</Link></p>
    </form>
    <p className="mt-6 text-center text-[10px] leading-5 text-[#8B9492]">Akses admin dan partner memakai akun internal sesuai role.</p></section></main>;
}
