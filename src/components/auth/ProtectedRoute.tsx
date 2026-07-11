"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { UserRole } from "@/types";
import { AccessDenied } from "./AccessDenied";
import { LoadingState } from "@/components/ui/LoadingState";

const isLocalPreviewHost = () => {
  if (typeof window === "undefined") return false;
  const host = window.location.hostname;
  return host === "localhost" || host === "127.0.0.1" || host.startsWith("192.168.") || host.startsWith("10.") || host.endsWith(".local");
};

export function ProtectedRoute({ role, children }: { role: UserRole; children: React.ReactNode }) {
  const router = useRouter();
  const [selected, setSelected] = useState<UserRole | "checking" | "missing">("checking");

  useEffect(() => {
    let active = true;
    const verify = () => {
      setSelected("checking");
      fetch("/api/auth/me", { cache: "no-store" })
        .then((response) => response.ok ? response.json() : null)
        .then((payload) => {
          if (!active) return;
          if (payload?.ok && payload.data?.role) {
            localStorage.setItem("selectedRole", payload.data.role);
            setSelected(payload.data.role);
            return;
          }
          const localRole = localStorage.getItem("selectedRole") as UserRole | null;
          if (isLocalPreviewHost() && localRole) {
            setSelected(localRole);
            return;
          }
          localStorage.removeItem("selectedRole");
          setSelected("missing");
          router.replace("/login");
        })
        .catch(() => {
          if (!active) return;
          const localRole = localStorage.getItem("selectedRole") as UserRole | null;
          if (isLocalPreviewHost() && localRole) setSelected(localRole);
          else {
            setSelected("missing");
            router.replace("/login");
          }
        });
    };
    verify();
    window.addEventListener("role-change", verify);
    window.addEventListener("storage", verify);
    return () => {
      active = false;
      window.removeEventListener("role-change", verify);
      window.removeEventListener("storage", verify);
    };
  }, [router]);

  if (selected === "checking" || selected === "missing") return <div className="mx-auto min-h-screen max-w-3xl p-6"><LoadingState/></div>;
  if (selected !== role) return <AccessDenied/>;
  return children;
}
