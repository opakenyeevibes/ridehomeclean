"use client";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export function LogoutButton({ className, compact = false }: { className?: string; compact?: boolean }) {
  const router = useRouter();
  return <button onClick={async () => { await fetch("/api/auth/logout", { method: "POST" }).catch(()=>null); localStorage.removeItem("selectedRole"); window.dispatchEvent(new Event("role-change")); router.replace("/login"); }} className={cn("flex items-center justify-center gap-2 rounded-2xl bg-[#FFF6DE] font-bold text-[#B94E35] transition active:scale-95", compact ? "px-3 py-2 text-xs" : "h-12 w-full text-sm", className)}><LogOut size={16}/>{compact ? "Keluar" : "Keluar dari akun"}</button>;
}
