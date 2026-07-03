"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { BrandMark } from "@/components/ui/BrandMark";
import { GoogleAuthButton } from "@/components/auth/GoogleAuthButton";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const register = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    const response = await fetch("/api/auth/register", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, email, phone, password, role: "customer" }) });
    const payload = await response.json();
    setLoading(false);
    if (!response.ok || !payload.ok) {
      setError(payload.error ?? "Registrasi gagal.");
      return;
    }
    localStorage.setItem("selectedRole", "customer");
    window.dispatchEvent(new Event("role-change"));
    router.replace("/");
  };

  return <main className="grid min-h-screen place-items-center bg-[#EEEEEE] p-4"><section className="w-full max-w-md"><div className="mb-6 text-center"><BrandMark showName className="justify-center"/><h1 className="mt-6 text-3xl font-black">Daftar Customer</h1><p className="mt-2 text-sm text-[#667085]">Daftar cepat pakai Google atau isi data manual.</p></div><form onSubmit={register} className="card space-y-3 p-5"><GoogleAuthButton label="Daftar langsung dengan Google" /><div className="flex items-center gap-3 py-1"><span className="h-px flex-1 bg-[#E5EAE8]"/><span className="text-[10px] font-black tracking-[.12em] text-[#98A2B3]">ATAU ISI MANUAL</span><span className="h-px flex-1 bg-[#E5EAE8]"/></div>{[["Nama",name,setName,"text"],["Email",email,setEmail,"email"],["Phone",phone,setPhone,"tel"],["Password",password,setPassword,"password"]].map(([label,value,setter,type])=><label key={String(label)} className="block"><span className="mb-2 block text-xs font-black">{String(label)}</span><input value={String(value)} onChange={(event)=>(setter as React.Dispatch<React.SetStateAction<string>>)(event.target.value)} type={String(type)} className="h-12 w-full rounded-2xl border border-[#D8DEDA] px-4 text-sm outline-none focus:border-[#2FA084]"/></label>)}{error && <p className="rounded-2xl bg-red-50 p-3 text-xs font-bold text-red-600">{error}</p>}<button disabled={loading} className="h-12 w-full rounded-2xl bg-[#1F6F5F] text-sm font-black text-white disabled:opacity-50">{loading ? "Memproses..." : "Daftar"}</button><p className="text-center text-xs text-[#667085]">Sudah punya akun? <Link href="/login" className="font-black text-[#1F6F5F]">Masuk</Link></p></form></section></main>;
}
