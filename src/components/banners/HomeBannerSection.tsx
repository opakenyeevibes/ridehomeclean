"use client";
import { useEffect, useState } from "react";
import type { Banner } from "@/types";
import { bannerStorageKey, defaultBanners, getActiveBanner } from "@/data/banners";
import { BannerPreview } from "./BannerPreview";

export function HomeBannerSection() {
  const [banners, setBanners] = useState<Banner[]>(defaultBanners);
  useEffect(() => {
    let active = true;
    let hasServerBanners = false;
    fetch("/api/banners/active", { cache: "no-store" })
      .then((response) => response.ok ? response.json() : null)
      .then((payload) => {
        if (!active) return;
        if (payload?.ok && Array.isArray(payload.data) && payload.data.length) {
          hasServerBanners = true;
          setBanners(payload.data);
        }
      })
      .catch(() => null);
    const timer = window.setTimeout(() => {
      if (hasServerBanners) return;
      try {
        const stored = localStorage.getItem(bannerStorageKey);
        if (stored) setBanners(JSON.parse(stored));
      } catch {
        setBanners(defaultBanners);
      }
    }, 350);
    return () => {
      active = false;
      window.clearTimeout(timer);
    };
  }, []);
  const mainBanner = getActiveBanner(banners, "main_banner");
  const sideBanner = getActiveBanner(banners, "side_banner");
  return <section className="mb-6 md:grid md:grid-cols-[1.65fr_.85fr] md:gap-6"><BannerPreview banner={mainBanner}/><div className="mt-4 hidden md:block"><BannerPreview banner={sideBanner} className="h-full"/></div></section>;
}
