"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ImagePlus, Save, UploadCloud, WandSparkles } from "lucide-react";
import type { Banner, BannerAccentStyle, BannerMode, BannerTemplateVariant, BannerType } from "@/types";
import { bannerStorageKey, defaultBanners } from "@/data/banners";
import { BannerPreview } from "@/components/banners/BannerPreview";
import { Button } from "@/components/ui/Button";

const today = new Date().toISOString().slice(0, 10);

const emptyBanner: Banner = {
  id: "",
  internalTitle: "Banner Baru",
  bannerType: "main_banner",
  mode: "image",
  isActive: true,
  sortOrder: 1,
  startDate: today,
  endDate: "",
  badgeText: "PROMO",
  headline: "Care datang langsung ke lokasi kamu",
  description: "Update teks banner langsung dari admin.",
  ctaLabel: "Lihat Detail",
  ctaLink: "/services/home-cleaning",
  promoCode: "CARE25",
  helperText: "lebih hemat",
  icon: "sparkles",
  accentStyle: "coral",
  templateVariant: "promo",
  featureChips: ["Cepat", "Terverifikasi", "Fleksibel"],
};

const inputClass =
  "h-11 w-full rounded-2xl border border-[#D8DEDA] bg-white px-3 text-sm outline-none transition focus:border-[#2FA084] focus:ring-2 focus:ring-[#6FCF97]/40";
const areaClass =
  "min-h-24 w-full resize-none rounded-2xl border border-[#D8DEDA] bg-white p-3 text-sm outline-none transition focus:border-[#2FA084] focus:ring-2 focus:ring-[#6FCF97]/40";

function loadBanners() {
  try {
    const stored = localStorage.getItem(bannerStorageKey);
    return stored ? (JSON.parse(stored) as Banner[]) : defaultBanners;
  } catch {
    return defaultBanners;
  }
}

const bannerMediaAccept = ".png,.jpg,.jpeg,.webp,.svg,.mp4,.webm";
const maxLocalMediaSize = 2.5 * 1024 * 1024;

function readFile(file: File, callback: (value: string, mediaType: string) => void) {
  if (file.size > maxLocalMediaSize) {
    window.alert("File terlalu besar untuk prototype lokal. Pakai file maksimal 2.5 MB agar banner tetap ringan.");
    return;
  }

  const reader = new FileReader();
  reader.onload = () => callback(String(reader.result), file.type || "application/octet-stream");
  reader.readAsDataURL(file);
}

function Field({ label, children, hint }: { label: string; children: React.ReactNode; hint?: string }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-black text-[#16332E]">{label}</span>
      {children}
      {hint && <small className="mt-1.5 block text-[10px] leading-4 text-[#98A2B3]">{hint}</small>}
    </label>
  );
}

export function BannerEditorClient({ bannerId }: { bannerId?: string }) {
  const router = useRouter();
  const [banners, setBanners] = useState<Banner[]>(defaultBanners);
  const [banner, setBanner] = useState<Banner>(emptyBanner);
  const [viewport, setViewport] = useState<"desktop" | "mobile">("desktop");
  const isNew = !bannerId;

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const loaded = loadBanners();
      setBanners(loaded);
      const found = bannerId ? loaded.find((item) => item.id === bannerId) : null;

      setBanner(
        found ?? {
          ...emptyBanner,
          id: `BNR-${Date.now()}`,
          sortOrder: loaded.length + 1,
          createdAt: today,
          updatedAt: today,
        },
      );
    }, 0);

    return () => window.clearTimeout(timer);
  }, [bannerId]);

  const helper = useMemo(
    () =>
      banner.bannerType === "main_banner"
        ? "Recommended size for main banner: desktop 1200 x 420 px, tablet 1024 x 360 px, mobile 720 x 320 px."
        : "Recommended size for side banner: desktop 520 x 420 px, tablet 420 x 320 px, mobile 720 x 260 px.",
    [banner.bannerType],
  );

  const set = <K extends keyof Banner>(key: K, value: Banner[K]) => {
    setBanner((prev) => ({ ...prev, [key]: value, updatedAt: today }));
  };

  const save = () => {
    const exists = banners.some((item) => item.id === banner.id);
    const next = exists ? banners.map((item) => (item.id === banner.id ? banner : item)) : [banner, ...banners];
    localStorage.setItem(bannerStorageKey, JSON.stringify(next));
    router.push("/admin/content/banners");
  };

  return (
    <div className="space-y-5">
      <Link href="/admin/content/banners" className="inline-flex items-center gap-2 text-xs font-black text-[#667085]">
        <ArrowLeft size={15} />
        Kembali ke Banner Management
      </Link>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_420px]">
        <section className="card p-5 md:p-6">
          <div className="mb-5">
            <h2 className="text-xl font-black">{isNew ? "Buat banner baru" : "Edit banner"}</h2>
            <p className="mt-1 text-xs leading-5 text-[#667085]">
              Pilih upload media kalau sudah punya desain banner, atau template kalau mau bikin cepat dari form teks.
            </p>
          </div>

          <div className="mb-5 grid gap-3 md:grid-cols-2">
            <button
              type="button"
              onClick={() => set("mode", "image")}
              className={`rounded-[22px] border p-4 text-left transition-[transform,box-shadow,border-color,background-color] duration-200 active:scale-[.99] ${
                banner.mode === "image"
                  ? "border-[#6FCF97] bg-[#EAFBF3] shadow-[0_12px_28px_rgba(31,111,95,.10)]"
                  : "border-[#D8DEDA] bg-white hover:border-[#2FA084]/40 hover:shadow-sm"
              }`}
            >
              <span className="grid size-10 place-items-center rounded-2xl bg-[#1F6F5F] text-white">
                <UploadCloud size={19} />
              </span>
              <b className="mt-3 block text-sm text-[#16332E]">Upload Media Banner</b>
              <span className="mt-1 block text-[11px] leading-5 text-[#667085]">Upload JPG, PNG, WEBP, SVG, MP4, atau WEBM.</span>
            </button>
            <button
              type="button"
              onClick={() => set("mode", "template")}
              className={`rounded-[22px] border p-4 text-left transition-[transform,box-shadow,border-color,background-color] duration-200 active:scale-[.99] ${
                banner.mode === "template"
                  ? "border-[#6FCF97] bg-[#EAFBF3] shadow-[0_12px_28px_rgba(31,111,95,.10)]"
                  : "border-[#D8DEDA] bg-white hover:border-[#2FA084]/40 hover:shadow-sm"
              }`}
            >
              <span className="grid size-10 place-items-center rounded-2xl bg-[#FFF6DE] text-[#1F6F5F]">
                <WandSparkles size={19} />
              </span>
              <b className="mt-3 block text-sm text-[#16332E]">Template Banner</b>
              <span className="mt-1 block text-[11px] leading-5 text-[#667085]">Pakai template bawaan dan ubah teks/promo saja.</span>
            </button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Internal title">
              <input className={inputClass} value={banner.internalTitle} onChange={(e) => set("internalTitle", e.target.value)} />
            </Field>
            <Field label="Banner type">
              <select className={inputClass} value={banner.bannerType} onChange={(e) => set("bannerType", e.target.value as BannerType)}>
                <option value="main_banner">Main Hero Banner</option>
                <option value="side_banner">Side Promo / Info Banner</option>
              </select>
            </Field>
            <Field label="Mode">
              <select className={inputClass} value={banner.mode} onChange={(e) => set("mode", e.target.value as BannerMode)}>
                <option value="image">Upload Media Banner</option>
                <option value="template">Template Mode</option>
              </select>
            </Field>
            <Field label="Display order / priority">
              <input className={inputClass} type="number" value={banner.sortOrder} onChange={(e) => set("sortOrder", Number(e.target.value))} />
            </Field>
            <Field label="Start date">
              <input className={inputClass} type="date" value={banner.startDate || ""} onChange={(e) => set("startDate", e.target.value)} />
            </Field>
            <Field label="End date">
              <input className={inputClass} type="date" value={banner.endDate || ""} onChange={(e) => set("endDate", e.target.value)} />
            </Field>
            <label className="flex items-center gap-3 rounded-2xl border border-[#D8DEDA] bg-white px-4 py-3 text-sm font-bold">
              <input type="checkbox" checked={banner.isActive} onChange={(e) => set("isActive", e.target.checked)} className="size-4 accent-[#1F6F5F]" />
              Active banner
            </label>
          </div>

          {banner.mode === "image" ? (
            <div className="mt-6 rounded-[24px] bg-[#EEEEEE] p-4">
              <h3 className="font-black">Upload Media Banner</h3>
              <p className="mt-1 text-xs leading-5 text-[#667085]">
                Upload desain banner siap pakai. Bisa pakai gambar statis, SVG ringan, atau video pendek yang sudah dikompres.
              </p>
              <p className="mt-2 text-[10px] font-bold text-[#667085]">{helper}</p>
              <p className="text-[10px] text-[#98A2B3]">
                Supported: JPG, JPEG, PNG, WEBP, SVG, MP4, WEBM. Untuk prototype lokal, maksimal 2.5 MB per file agar tetap ringan.
              </p>

              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <Field label="Desktop image/video">
                  <span className="block rounded-[22px] border border-dashed border-[#6FCF97] bg-white p-5 text-center transition hover:bg-[#EAFBF3]">
                    <UploadCloud className="mx-auto text-[#1F6F5F]" size={26} />
                    <span className="mt-2 block text-xs font-black text-[#16332E]">Klik untuk upload desktop banner</span>
                    <span className="mt-1 block text-[10px] leading-4 text-[#667085]">JPG, PNG, WEBP, SVG, MP4, WEBM · max 2.5 MB</span>
                    <input
                      type="file"
                      accept={bannerMediaAccept}
                      onChange={(e) =>
                        e.target.files?.[0] &&
                        readFile(e.target.files[0], (value, mediaType) => {
                          set("desktopImage", value);
                          set("desktopMediaType", mediaType);
                        })
                      }
                      className="sr-only"
                    />
                  </span>
                  {banner.desktopImage && (
                    <button type="button" onClick={() => {
                      set("desktopImage", "");
                      set("desktopMediaType", "");
                    }} className="mt-2 text-xs font-black text-red-600">
                      Delete media
                    </button>
                  )}
                </Field>
                <Field label="Mobile image/video">
                  <span className="block rounded-[22px] border border-dashed border-[#6FCF97] bg-white p-5 text-center transition hover:bg-[#EAFBF3]">
                    <UploadCloud className="mx-auto text-[#1F6F5F]" size={26} />
                    <span className="mt-2 block text-xs font-black text-[#16332E]">Klik untuk upload mobile banner</span>
                    <span className="mt-1 block text-[10px] leading-4 text-[#667085]">Opsional. Kalau kosong, desktop media dipakai.</span>
                    <input
                      type="file"
                      accept={bannerMediaAccept}
                      onChange={(e) =>
                        e.target.files?.[0] &&
                        readFile(e.target.files[0], (value, mediaType) => {
                          set("mobileImage", value);
                          set("mobileMediaType", mediaType);
                        })
                      }
                      className="sr-only"
                    />
                  </span>
                  {banner.mobileImage && (
                    <button type="button" onClick={() => {
                      set("mobileImage", "");
                      set("mobileMediaType", "");
                    }} className="mt-2 text-xs font-black text-red-600">
                      Delete media
                    </button>
                  )}
                </Field>
                <Field label="Alt text">
                  <input className={inputClass} value={banner.altText || ""} onChange={(e) => set("altText", e.target.value)} />
                </Field>
                <Field label="Link URL">
                  <input className={inputClass} value={banner.ctaLink || ""} onChange={(e) => set("ctaLink", e.target.value)} />
                </Field>
                <Field label="CTA label">
                  <input className={inputClass} value={banner.ctaLabel || ""} onChange={(e) => set("ctaLabel", e.target.value)} />
                </Field>
              </div>
            </div>
          ) : (
            <div className="mt-6 rounded-[24px] bg-[#EEEEEE] p-4">
              <h3 className="font-black">Template Banner Mode</h3>
              <p className="mt-1 text-xs leading-5 text-[#667085]">
                Use this mode if you want to keep the existing design template and only update the text, button, or promo content.
              </p>

              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <Field label="Template variant">
                  <select className={inputClass} value={banner.templateVariant || "promo"} onChange={(e) => set("templateVariant", e.target.value as BannerTemplateVariant)}>
                    <option value="promo">Promo Template</option>
                    <option value="trust">Trust Template</option>
                    <option value="service_highlight">Service Highlight Template</option>
                  </select>
                </Field>
                <Field label="Accent style">
                  <select className={inputClass} value={banner.accentStyle || "teal"} onChange={(e) => set("accentStyle", e.target.value as BannerAccentStyle)}>
                    <option value="teal">Teal</option>
                    <option value="mint">Mint</option>
                    <option value="aqua">Aqua</option>
                    <option value="cream">Cream</option>
                    <option value="coral">Coral</option>
                    <option value="yellow">Yellow</option>
                  </select>
                </Field>
                <Field label="Badge text">
                  <input className={inputClass} value={banner.badgeText || ""} onChange={(e) => set("badgeText", e.target.value)} />
                </Field>
                <Field label="Icon">
                  <select className={inputClass} value={banner.icon || "sparkles"} onChange={(e) => set("icon", e.target.value)}>
                    <option value="sparkles">Sparkles</option>
                    <option value="shield">Shield</option>
                    <option value="car">Car</option>
                    <option value="check">Check</option>
                  </select>
                </Field>
                <Field label="Headline">
                  <input className={inputClass} value={banner.headline || ""} onChange={(e) => set("headline", e.target.value)} />
                </Field>
                <Field label="CTA label">
                  <input className={inputClass} value={banner.ctaLabel || ""} onChange={(e) => set("ctaLabel", e.target.value)} />
                </Field>
                <Field label="CTA link">
                  <input className={inputClass} value={banner.ctaLink || ""} onChange={(e) => set("ctaLink", e.target.value)} />
                </Field>
                <Field label="Promo code">
                  <input className={inputClass} value={banner.promoCode || ""} onChange={(e) => set("promoCode", e.target.value)} />
                </Field>
                <Field label="Helper text">
                  <input className={inputClass} value={banner.helperText || ""} onChange={(e) => set("helperText", e.target.value)} />
                </Field>
                <Field label="Feature chips" hint="Pisahkan dengan koma untuk service highlight.">
                  <input
                    className={inputClass}
                    value={(banner.featureChips || []).join(", ")}
                    onChange={(e) => set("featureChips", e.target.value.split(",").map((chip) => chip.trim()).filter(Boolean))}
                  />
                </Field>
                <div className="md:col-span-2">
                  <Field label="Description">
                    <textarea className={areaClass} value={banner.description || ""} onChange={(e) => set("description", e.target.value)} />
                  </Field>
                </div>
              </div>
            </div>
          )}

          <div className="mt-6 flex justify-end">
            <Button onClick={save}>
              <Save size={16} />
              Simpan banner
            </Button>
          </div>
        </section>

        <aside className="xl:sticky xl:top-6 xl:h-fit">
          <div className="card p-5">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="font-black">Live Preview</h3>
                <p className="text-xs text-[#667085]">{helper}</p>
              </div>
              <div className="flex rounded-2xl bg-[#EEEEEE] p-1 text-[10px] font-black">
                <button onClick={() => setViewport("desktop")} className={`rounded-xl px-3 py-2 ${viewport === "desktop" ? "bg-white text-[#1F6F5F] shadow-sm" : "text-[#667085]"}`}>
                  Desktop
                </button>
                <button onClick={() => setViewport("mobile")} className={`rounded-xl px-3 py-2 ${viewport === "mobile" ? "bg-white text-[#1F6F5F] shadow-sm" : "text-[#667085]"}`}>
                  Mobile
                </button>
              </div>
            </div>
            <div className={viewport === "mobile" ? "mx-auto max-w-[300px]" : "max-w-full"}>
              <BannerPreview banner={banner} viewport={viewport} />
            </div>
            <div className="mt-4 rounded-2xl bg-[#FFF6DE] p-4 text-[11px] leading-5 text-[#667085]">
              <ImagePlus className="mb-2 text-[#1F6F5F]" size={17} />
              <b className="block text-[#16332E]">Upload guidance</b>
              Desktop main banner 1200×420 px, mobile 720×320 px. Support JPG, PNG, WEBP, SVG, MP4, dan WEBM. Video autoplay akan muted dan loop.
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
