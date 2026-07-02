"use client";

import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, ChevronDown, Loader2, LocateFixed, MapPin, Navigation, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type SavedLocation = {
  label: string;
  detail: string;
  lat?: number;
  lng?: number;
};

const defaultLocations: SavedLocation[] = [
  { label: "Cianjur, Jawa Barat", detail: "Area layanan utama Ride N Care" },
  { label: "Bandung, Jawa Barat", detail: "Area demo untuk jadwal berikutnya" },
  { label: "Jakarta Selatan", detail: "Area ekspansi customer & ops" },
];

const storageKey = "ride-n-care-active-location";

export function LocationSelector({ compact = false, admin = false }: { compact?: boolean; admin?: boolean }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [location, setLocation] = useState<SavedLocation>(defaultLocations[0]);

  useEffect(() => {
    const saved = window.localStorage.getItem(storageKey);
    if (saved) {
      try {
        setLocation(JSON.parse(saved));
      } catch {
        window.localStorage.removeItem(storageKey);
      }
    }
  }, []);

  const shortCoord = useMemo(() => {
    if (!location.lat || !location.lng) return null;
    return `${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}`;
  }, [location.lat, location.lng]);

  const saveLocation = (nextLocation: SavedLocation) => {
    setLocation(nextLocation);
    window.localStorage.setItem(storageKey, JSON.stringify(nextLocation));
    window.dispatchEvent(new CustomEvent("ride-n-care-location-change", { detail: nextLocation }));
    setMessage("Lokasi aktif diperbarui.");
    setOpen(false);
  };

  const detectLocation = () => {
    setMessage("");
    if (!navigator.geolocation) {
      setMessage("Browser kamu belum mendukung deteksi lokasi.");
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        saveLocation({
          label: "Lokasi kamu sekarang",
          detail: `Koordinat tersimpan: ${lat.toFixed(4)}, ${lng.toFixed(4)}`,
          lat,
          lng,
        });
        setLoading(false);
      },
      () => {
        setLoading(false);
        setMessage("Izin lokasi belum aktif. Cek permission browser lalu coba lagi.");
      },
      { enableHighAccuracy: true, timeout: 9000, maximumAge: 60000 },
    );
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className={cn(
          "pressable flex min-w-0 items-center gap-1.5 rounded-[15px] border border-[#D8DEDA] bg-white text-left shadow-sm transition hover:-translate-y-0.5 hover:border-[#6FCF97] hover:shadow-[0_10px_24px_rgba(31,111,95,.10)]",
          compact ? "max-w-[145px] px-2 py-2" : "max-w-[150px] flex-1 px-2 py-2 sm:max-w-[190px] sm:gap-2 sm:px-3",
          admin && "max-w-[210px] px-3 py-2.5",
        )}
      >
        <MapPin size={14} className="shrink-0 text-[#2FA084]" />
        <span className="min-w-0 flex-1">
          <span className="block text-[8px] font-black tracking-[.09em] text-[#83908c]">{admin ? "AREA OPS" : "LOKASI"}</span>
          <span className="block truncate text-[10px] font-extrabold text-[#16332E] sm:text-xs">{location.label}</span>
        </span>
        <ChevronDown size={12} className={cn("shrink-0 text-[#7c8985] transition", open && "rotate-180")} />
      </button>

      {open && (
        <div className="absolute left-0 top-[calc(100%+10px)] z-50 w-[310px] max-w-[calc(100vw-32px)] overflow-hidden rounded-[24px] border border-[#D8DEDA] bg-white p-3 shadow-[0_22px_55px_rgba(22,51,46,.16)]">
          <div className="rounded-[20px] bg-[#E6F6EF] p-4">
            <div className="flex items-start gap-3">
              <span className="grid size-10 shrink-0 place-items-center rounded-2xl bg-white text-[#1F6F5F] shadow-sm">
                <Navigation size={18} />
              </span>
              <div>
                <h3 className="text-sm font-black text-[#16332E]">{admin ? "Pantau area operasional" : "Aktifkan lokasi kamu"}</h3>
                <p className="mt-1 text-xs leading-5 text-[#667085]">
                  {admin
                    ? "Dipakai untuk filter pesanan, worker, dan area layanan."
                    : "Biar rekomendasi layanan dan estimasi partner terasa lebih relevan."}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={detectLocation}
              disabled={loading}
              className="mt-4 flex h-11 w-full items-center justify-center gap-2 rounded-2xl bg-[#1F6F5F] text-xs font-black text-white transition hover:bg-[#2FA084] disabled:opacity-60"
            >
              {loading ? <Loader2 size={16} className="animate-spin" /> : <LocateFixed size={16} />}
              {loading ? "Mendeteksi..." : "Gunakan lokasi saat ini"}
            </button>
          </div>

          <div className="mt-3 space-y-2">
            {defaultLocations.map((item) => {
              const active = item.label === location.label;
              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => saveLocation(item)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-[18px] border p-3 text-left transition hover:border-[#6FCF97] hover:bg-[#F7FBF9]",
                    active ? "border-[#6FCF97] bg-[#E6F6EF]" : "border-[#EDF1EF] bg-white",
                  )}
                >
                  <span className="grid size-9 shrink-0 place-items-center rounded-2xl bg-white text-[#2FA084]">
                    {active ? <CheckCircle2 size={17} /> : <MapPin size={17} />}
                  </span>
                  <span className="min-w-0 flex-1">
                    <b className="block truncate text-xs text-[#16332E]">{item.label}</b>
                    <small className="block truncate text-[10px] text-[#667085]">{item.detail}</small>
                  </span>
                </button>
              );
            })}
          </div>

          {(message || shortCoord) && (
            <div className={cn("mt-3 flex gap-2 rounded-2xl p-3 text-[11px] leading-5", message.includes("belum") || message.includes("Browser") ? "bg-red-50 text-red-600" : "bg-[#F4FBF7] text-[#1F6F5F]")}>
              {message.includes("belum") || message.includes("Browser") ? <XCircle size={15} className="mt-0.5 shrink-0" /> : <CheckCircle2 size={15} className="mt-0.5 shrink-0" />}
              <span>{message || `Lokasi koordinat aktif: ${shortCoord}`}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
