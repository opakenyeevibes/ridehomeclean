"use client";
import { useEffect, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import type { UserRole } from "@/types";
import { AccessDenied } from "./AccessDenied";
import { LoadingState } from "@/components/ui/LoadingState";

const subscribe = (callback: () => void) => {
  window.addEventListener("storage", callback);
  window.addEventListener("role-change", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("role-change", callback);
  };
};

const getRoleSnapshot = () => localStorage.getItem("selectedRole") ?? "missing";
const getServerSnapshot = () => "checking";

export function ProtectedRoute({ role, children }: { role: UserRole; children: React.ReactNode }) {
  const router = useRouter();
  const selected = useSyncExternalStore(subscribe, getRoleSnapshot, getServerSnapshot);
  useEffect(() => {
    if (selected !== "missing") return;
    let active = true;
    fetch("/api/auth/me")
      .then((response) => response.ok ? response.json() : null)
      .then((payload) => {
        if (!active) return;
        if (payload?.ok && payload.data?.role) {
          localStorage.setItem("selectedRole", payload.data.role);
          window.dispatchEvent(new Event("role-change"));
        } else {
          router.replace("/login");
        }
      })
      .catch(() => router.replace("/login"));
    return () => { active = false; };
  }, [selected, router]);
  if (selected === "checking" || selected === "missing") return <div className="mx-auto min-h-screen max-w-3xl p-6"><LoadingState/></div>;
  if (selected !== role) return <AccessDenied/>;
  return children;
}
