import { cn } from "@/lib/utils";

export function BrandMark({ showName = false, compact = false, inverse = false, className }: { showName?: boolean; compact?: boolean; inverse?: boolean; className?: string }) {
  return <span className={cn("inline-flex shrink-0 items-center gap-2.5", className)}>
    <span className={cn("grid shrink-0 place-items-center rounded-[13px] shadow-[0_7px_18px_rgba(31,111,95,.16)]", compact ? "size-9" : "size-10", inverse ? "bg-[#FFE394]" : "bg-[#2FA084]")}>
      <svg viewBox="0 0 32 32" aria-hidden="true" className="size-6" fill="none">
        <circle cx="8" cy="22.5" r="2.2" fill={inverse ? "#2FA084" : "#FFE394"}/>
        <circle cx="23.5" cy="9" r="2.2" fill={inverse ? "#2FA084" : "#FFE394"}/>
        <path d="M9.8 21.4c3.2-1.5 3-5.3 5.7-6.2 2.4-.9 4.4.1 6.2-3.9" stroke={inverse ? "#2FA084" : "#FFE394"} strokeWidth="2.4" strokeLinecap="round" strokeDasharray="1.5 3"/>
        <path d="m23.8 18 .8 2.1 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8.8-2.1Z" fill="#2FA084" stroke={inverse ? "#2FA084" : "white"} strokeWidth=".65" strokeLinejoin="round"/>
      </svg>
    </span>
    {showName && <span className={cn("whitespace-nowrap font-black tracking-[-.035em]", compact ? "text-sm" : "text-lg", inverse ? "text-white" : "text-[#2FA084]")}>Ride N <span className={inverse ? "text-[#FFE394]" : "text-[#2FA084]"}>Care</span></span>}
  </span>;
}
