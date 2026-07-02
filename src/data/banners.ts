import type { Banner } from "@/types";

export const bannerStorageKey = "ride-n-care-banners";

export const defaultBanners: Banner[] = [
  {
    id: "BNR-001",
    internalTitle: "Homepage Main Promo - First Care",
    bannerType: "main_banner",
    mode: "template",
    isActive: true,
    sortOrder: 1,
    startDate: "2026-06-30",
    endDate: "2026-12-31",
    badgeText: "FIRST CARE",
    headline: "Care datang langsung ke lokasi kamu",
    description: "Diskon 25% untuk layanan pertama.",
    ctaLabel: "Pakai Promo",
    ctaLink: "/services/home-cleaning",
    promoCode: "CARE25",
    helperText: "Berlaku untuk customer baru.",
    icon: "sparkles",
    accentStyle: "coral",
    templateVariant: "promo",
    createdAt: "2026-06-30",
    updatedAt: "2026-06-30",
  },
  {
    id: "BNR-002",
    internalTitle: "Side Trust Card - Partner Terverifikasi",
    bannerType: "side_banner",
    mode: "template",
    isActive: true,
    sortOrder: 1,
    startDate: "2026-06-30",
    endDate: "2026-12-31",
    badgeText: "TRUSTED CARE",
    headline: "Partner pilihan. Care terpercaya.",
    description: "Semua partner melewati verifikasi dan standar layanan Ride N Care.",
    ctaLabel: "Pelajari",
    ctaLink: "/help",
    helperText: "Standar layanan dipantau berkala.",
    icon: "shield",
    accentStyle: "yellow",
    templateVariant: "trust",
    createdAt: "2026-06-30",
    updatedAt: "2026-06-30",
  },
  {
    id: "BNR-003",
    internalTitle: "Side Auto Care Highlight",
    bannerType: "side_banner",
    mode: "template",
    isActive: false,
    sortOrder: 2,
    badgeText: "AUTO CARE",
    headline: "Cuci kendaraan tanpa antre",
    description: "Worker Ride N Care datang ke rumah untuk bantu kendaraanmu kembali segar.",
    ctaLabel: "Lihat layanan",
    ctaLink: "/services/car-wash",
    promoCode: "AUTOCARE",
    helperText: "Cocok untuk jadwal akhir pekan.",
    icon: "car",
    accentStyle: "aqua",
    templateVariant: "service_highlight",
    featureChips: ["Di rumah", "Jadwal fleksibel", "Partner terverifikasi"],
    createdAt: "2026-06-30",
    updatedAt: "2026-06-30",
  },
];

export const getDefaultBanner = (type: Banner["bannerType"]) =>
  defaultBanners.find((banner) => banner.bannerType === type && banner.isActive) ?? defaultBanners.find((banner) => banner.bannerType === type) ?? defaultBanners[0];

export const getActiveBanner = (banners: Banner[], type: Banner["bannerType"]) =>
  [...banners].filter((banner) => banner.bannerType === type && banner.isActive).sort((a, b) => a.sortOrder - b.sortOrder)[0] ?? getDefaultBanner(type);
