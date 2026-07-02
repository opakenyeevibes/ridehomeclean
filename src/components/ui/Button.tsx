import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Button({ className, variant = "primary", ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "secondary" | "ghost" | "danger" }) {
  const styles = { primary: "bg-[var(--brand-primary)] text-white shadow-[0_8px_20px_rgba(31,111,95,.18)] hover:bg-[var(--brand-secondary)] hover:shadow-[0_12px_26px_rgba(31,111,95,.24)]", secondary: "border border-[var(--brand-border)] bg-[var(--brand-soft)] text-[var(--brand-primary)] shadow-[0_8px_20px_rgba(31,111,95,.08)] hover:bg-[#DDF8EA]", ghost: "border border-[var(--brand-border)] bg-white text-[var(--brand-text)] hover:border-[var(--brand-secondary)] hover:bg-[#F7FBF9]", danger: "border border-red-200 bg-red-50 text-red-700 hover:bg-red-100" };
  return <button className={cn("inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl px-5 text-sm font-extrabold transition-all duration-200 active:scale-[.97] disabled:cursor-not-allowed disabled:shadow-none disabled:opacity-45 disabled:active:scale-100", styles[variant], className)} {...props} />;
}
