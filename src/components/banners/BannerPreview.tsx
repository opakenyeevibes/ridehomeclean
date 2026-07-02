"use client";
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { ArrowUpRight, BadgeCheck, Car, ImageIcon, ShieldCheck, Sparkles } from "lucide-react";
import type { Banner, BannerAccentStyle } from "@/types";
import { cn } from "@/lib/utils";

const accents: Record<BannerAccentStyle, { chip: string; soft: string; text: string; dot: string }> = {
  teal: { chip: "bg-[#2FA084] text-white", soft: "bg-[#EAFBF3]", text: "text-[#1F6F5F]", dot: "bg-[#2FA084]" },
  mint: { chip: "bg-[#6FCF97] text-[#16332E]", soft: "bg-[#EAFBF3]", text: "text-[#1F6F5F]", dot: "bg-[#6FCF97]" },
  aqua: { chip: "bg-[#8BDFDD] text-[#16332E]", soft: "bg-[#EFFFFE]", text: "text-[#1F6F5F]", dot: "bg-[#8BDFDD]" },
  cream: { chip: "bg-[#FFF6DE] text-[#16332E]", soft: "bg-[#FFF6DE]", text: "text-[#1F6F5F]", dot: "bg-[#FFF6DE]" },
  coral: { chip: "bg-[#F48F68] text-white", soft: "bg-[#FFF6DE]", text: "text-[#F48F68]", dot: "bg-[#F48F68]" },
  yellow: { chip: "bg-[#FFE394] text-[#16332E]", soft: "bg-[#FFF6DE]", text: "text-[#1F6F5F]", dot: "bg-[#FFE394]" },
};

const iconMap = { sparkles: Sparkles, shield: ShieldCheck, car: Car, check: BadgeCheck };

export function BannerPreview({ banner, viewport = "desktop", className }: { banner: Banner; viewport?: "desktop" | "mobile"; className?: string }) {
  if (banner.mode === "image" && (banner.desktopImage || banner.mobileImage)) return <ImageBanner banner={banner} viewport={viewport} className={className}/>;
  return <TemplateBanner banner={banner} viewport={viewport} className={className}/>;
}

function ImageBanner({ banner, viewport, className }: { banner: Banner; viewport: "desktop" | "mobile"; className?: string }) {
  const media = viewport === "mobile" ? banner.mobileImage || banner.desktopImage : banner.desktopImage || banner.mobileImage;
  const mediaType = viewport === "mobile" ? banner.mobileMediaType || banner.desktopMediaType : banner.desktopMediaType || banner.mobileMediaType;
  const isVideo = Boolean(mediaType?.startsWith("video/") || media?.startsWith("data:video/"));
  const isSide = banner.bannerType === "side_banner";
  return <Link href={banner.ctaLink || "#"} className={cn("group relative block overflow-hidden rounded-[28px] border border-[#D8DEDA] bg-white shadow-[0_14px_34px_rgba(31,111,95,.10)]", isSide ? "min-h-[260px]" : "min-h-[178px] md:min-h-64", className)}>
    {media ? (
      isVideo ? (
        <video
          src={media}
          aria-label={banner.altText || banner.internalTitle}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 size-full object-cover transition duration-500 group-hover:scale-[1.02]"
        />
      ) : (
        <img src={media} alt={banner.altText || banner.internalTitle} className="absolute inset-0 size-full object-cover transition duration-500 group-hover:scale-[1.02]"/>
      )
    ) : <div className="absolute inset-0 grid place-items-center bg-[#EAFBF3] text-[#1F6F5F]"><ImageIcon size={42}/></div>}
    <div className="absolute inset-0 bg-gradient-to-r from-[#16332E]/55 via-[#16332E]/18 to-transparent"/>
    <div className="relative z-10 flex min-h-[inherit] max-w-[62%] flex-col justify-end p-5 text-white md:p-7">
      {banner.badgeText && <span className="mb-2 w-fit rounded-full bg-[#F48F68] px-3 py-1 text-[9px] font-black tracking-wider">{banner.badgeText}</span>}
      <h2 className="text-xl font-black leading-tight md:text-3xl">{banner.headline || banner.internalTitle}</h2>
      {banner.ctaLabel && <span className="mt-4 inline-flex w-fit items-center gap-1 rounded-2xl bg-[#6FCF97] px-4 py-2 text-xs font-black text-[#1F6F5F]">{banner.ctaLabel}<ArrowUpRight size={13}/></span>}
    </div>
  </Link>;
}

function TemplateBanner({ banner, viewport, className }: { banner: Banner; viewport: "desktop" | "mobile"; className?: string }) {
  const accent = accents[banner.accentStyle || "teal"];
  const isSide = banner.bannerType === "side_banner";
  const Icon = iconMap[(banner.icon || "sparkles") as keyof typeof iconMap] || Sparkles;
  const serviceVariant = banner.templateVariant === "service_highlight";
  const trustVariant = banner.templateVariant === "trust";
  if (isSide) return <Link href={banner.ctaLink || "#"} className={cn("soft-grid relative flex min-h-[260px] flex-col justify-between overflow-hidden rounded-[30px] border border-[#D8DEDA] p-6 shadow-[0_14px_34px_rgba(31,111,95,.10)]", trustVariant ? "bg-[#FFE394] text-[#16332E]" : "bg-white text-[#16332E]", className)}>
    <span className={cn("relative z-10 grid size-12 place-items-center rounded-2xl", trustVariant ? "bg-[#1F6F5F] text-[#FFE394]" : `${accent.soft} ${accent.text}`)}><Icon size={22}/></span>
    <span className={cn("absolute -right-12 -top-12 size-36 rounded-full opacity-70", serviceVariant ? "bg-[#8BDFDD]" : "bg-white/60")}/>
    <div className="relative z-10">
      {banner.badgeText && <span className={cn("mb-3 inline-flex rounded-full px-3 py-1 text-[9px] font-black tracking-wider", accent.chip)}>{banner.badgeText}</span>}
      <h2 className="text-2xl font-black tracking-tight">{banner.headline}</h2>
      <p className="mt-2 text-sm font-medium leading-6 text-[#416254]">{banner.description}</p>
      {serviceVariant && banner.featureChips?.length ? <div className="mt-4 flex flex-wrap gap-2">{banner.featureChips.slice(0,3).map((chip)=><span key={chip} className="rounded-full bg-[#FFF6DE] px-2.5 py-1 text-[9px] font-black text-[#1F6F5F]">{chip}</span>)}</div> : null}
    </div>
  </Link>;
  return <Link href={banner.ctaLink || "#"} className={cn("soft-grid group relative block min-h-[178px] overflow-hidden rounded-[24px] border border-white/70 bg-[#DCEFE7] p-5 text-[#1F6F5F] shadow-[0_18px_42px_rgba(31,111,95,.14)] ring-1 ring-[#CFEAE4]/70 transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_54px_rgba(31,111,95,.18)] md:min-h-64 md:rounded-[30px] md:p-8", viewport === "mobile" && "min-h-[180px]", className)}>
    <div className="relative z-20 max-w-[58%] md:max-w-[62%]">
      {banner.badgeText && <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-[#F48F68] px-2.5 py-1 text-[7px] font-black tracking-[.12em] text-white shadow-[0_8px_18px_rgba(244,143,104,.24)] md:px-3 md:py-1.5 md:text-[9px]"><Icon size={11}/>{banner.badgeText}</span>}
      <h1 className="mt-2.5 text-[17px] font-black leading-[1.08] tracking-[-.035em] text-[#1F6F5F] min-[390px]:text-[19px] md:mt-4 md:text-4xl">{banner.headline}</h1>
      <p className="mt-1.5 text-[7px] font-semibold leading-relaxed text-[#4B635D] sm:text-[8px] md:mt-2 md:text-xs">{banner.description}</p>
      <div className="mt-2.5 flex items-center gap-2 md:mt-4 md:gap-3">
        <span className="inline-flex min-h-8 items-center gap-1.5 whitespace-nowrap rounded-[11px] bg-[#6FCF97] px-3 py-1.5 text-[9px] font-black text-[#1F6F5F] shadow-[0_8px_18px_rgba(31,111,95,.16)] transition-[background-color,transform] duration-200 group-hover:bg-[#63C88D] group-active:scale-95 md:min-h-11 md:rounded-[14px] md:px-4 md:text-xs">{banner.ctaLabel || "Lihat Detail"} <ArrowUpRight size={13}/></span>
        {banner.promoCode && <span className="whitespace-nowrap text-[7px] font-semibold text-[#4B635D] sm:text-[8px] md:text-[10px]">Kode: <b className="tracking-wide text-[#1F6F5F]">{banner.promoCode}</b></span>}
      </div>
    </div>
    <div className="absolute -bottom-20 -right-14 z-0 size-56 rounded-full bg-[#CFEAE4] md:-bottom-24 md:right-[-4%] md:size-80"/>
    <div className="absolute -right-8 top-4 z-0 size-24 rounded-full bg-[#EAF8F3]/70 blur-sm md:right-16 md:top-8 md:size-32"/>
    <div className="absolute bottom-9 right-3 z-10 grid size-[88px] rotate-6 place-items-center rounded-[25px] border border-white/70 bg-[#D9EFE9] text-center text-[10px] font-black shadow-[0_14px_30px_rgba(31,111,95,.14)] backdrop-blur-[2px] md:bottom-12 md:right-12 md:size-36 md:rounded-[34px] md:text-sm"><span><b className="block text-[28px] leading-none text-[#E5C75A] md:text-4xl">25%</b><span className="mt-1 block px-2 text-[#4B635D]">{banner.helperText || "lebih hemat"}</span></span></div>
  </Link>;
}
