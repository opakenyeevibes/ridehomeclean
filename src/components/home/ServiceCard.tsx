import Link from "next/link";
import type { Service } from "@/types";
import { ArrowUpRight } from "lucide-react";

export function ServiceCard({ service }: { service: Service }) {
  const Icon = service.icon;
  return (
    <Link
      href={`/services/${service.id}`}
      className="group flex min-h-[104px] min-w-0 flex-col items-center gap-2.5 rounded-[20px] px-0.5 py-1 text-center text-[#16332E] transition-[transform,color] duration-200 ease-out hover:text-[#0f5143] active:scale-[.95] active:duration-75 min-[400px]:min-h-[112px]"
    >
      <span
        className="relative grid size-[58px] shrink-0 place-items-center rounded-[20px] border border-white/75 shadow-[0_8px_20px_rgba(22,51,46,.06)] ring-1 ring-black/[.015] transition-[transform,box-shadow,border-color,filter] duration-300 ease-out group-hover:-translate-y-1 group-hover:scale-[1.035] group-hover:border-white group-hover:shadow-[0_16px_32px_rgba(22,51,46,.12)] group-active:translate-y-0 group-active:scale-[.97] min-[390px]:size-[68px] min-[390px]:rounded-[23px] min-[430px]:size-[72px] md:size-20 md:rounded-[24px]"
        style={{ background: service.color, color: service.accent }}
      >
        <Icon
          size={27}
          strokeWidth={1.85}
          className="transition-transform duration-300 group-hover:scale-110 max-[389px]:size-[25px] min-[390px]:size-[29px] md:size-8"
        />
        <ArrowUpRight
          size={13}
          strokeWidth={2}
          className="absolute right-2.5 top-2.5 translate-y-1 opacity-0 transition-[opacity,transform] duration-200 group-hover:translate-y-0 group-hover:opacity-60"
        />
      </span>
      <span className="line-clamp-2 max-w-[72px] text-[10.5px] font-extrabold leading-[1.3] tracking-[-.01em] min-[390px]:max-w-[78px] min-[390px]:text-[11px] md:max-w-24 md:text-xs">
        {service.shortName}
      </span>
    </Link>
  );
}
