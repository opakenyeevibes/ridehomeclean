"use client";

import { useEffect, useMemo, useState } from "react";
import { ExternalLink, LocateFixed, Loader2, MapPin, Navigation } from "lucide-react";

type Coordinates = {
  lat: number;
  lng: number;
  label: string;
};

const defaultPin: Coordinates = {
  lat: -6.8229,
  lng: 107.1396,
  label: "Jl. Siliwangi, Cianjur",
};

const locationStorageKey = "ride-n-care-active-location";

export function BookingLocationMap({ address = "Jl. Siliwangi, Cianjur", unit = "No. 28" }: { address?: string; unit?: string }) {
  const [pin, setPin] = useState<Coordinates>(defaultPin);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("Pin mengikuti alamat booking. Kamu juga bisa pakai lokasi saat ini.");

  useEffect(() => {
    const readActiveLocation = () => {
      const saved = window.localStorage.getItem(locationStorageKey);
      if (!saved) return;

      try {
        const parsed = JSON.parse(saved) as { label?: string; lat?: number; lng?: number };
        if (typeof parsed.lat === "number" && typeof parsed.lng === "number") {
          setPin({ lat: parsed.lat, lng: parsed.lng, label: parsed.label ?? "Lokasi kamu sekarang" });
          setMessage("Pin memakai lokasi aktif dari header.");
        }
      } catch {
        window.localStorage.removeItem(locationStorageKey);
      }
    };

    readActiveLocation();
    window.addEventListener("ride-n-care-location-change", readActiveLocation);
    window.addEventListener("storage", readActiveLocation);
    return () => {
      window.removeEventListener("ride-n-care-location-change", readActiveLocation);
      window.removeEventListener("storage", readActiveLocation);
    };
  }, []);

  const maps = useMemo(() => {
    const delta = 0.006;
    const bbox = `${pin.lng - delta},${pin.lat - delta},${pin.lng + delta},${pin.lat + delta}`;
    const marker = `${pin.lat},${pin.lng}`;
    return {
      embed: `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(bbox)}&layer=mapnik&marker=${encodeURIComponent(marker)}`,
      google: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${pin.lat},${pin.lng}`)}`,
      osm: `https://www.openstreetmap.org/?mlat=${pin.lat}&mlon=${pin.lng}#map=17/${pin.lat}/${pin.lng}`,
    };
  }, [pin.lat, pin.lng]);

  const useCurrentLocation = () => {
    setMessage("");
    if (!navigator.geolocation) {
      setMessage("Browser belum mendukung deteksi lokasi.");
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const nextPin = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          label: "Lokasi kamu sekarang",
        };
        setPin(nextPin);
        setMessage("Pin berhasil dipindah ke lokasi kamu sekarang.");
        window.localStorage.setItem(locationStorageKey, JSON.stringify({
          label: nextPin.label,
          detail: `Koordinat tersimpan: ${nextPin.lat.toFixed(4)}, ${nextPin.lng.toFixed(4)}`,
          lat: nextPin.lat,
          lng: nextPin.lng,
        }));
        window.dispatchEvent(new CustomEvent("ride-n-care-location-change", { detail: nextPin }));
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
    <section className="mt-4 overflow-hidden rounded-[28px] border border-[#CFE6DD] bg-white shadow-[0_12px_30px_rgba(31,111,95,.08)]">
      <div className="relative h-56 bg-[#DCEFE7]">
        <iframe
          title="Peta lokasi booking"
          src={maps.embed}
          className="h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
        <div className="pointer-events-none absolute inset-x-4 top-4 flex items-start justify-between gap-3">
          <div className="max-w-[72%] rounded-2xl bg-white/95 p-3 shadow-[0_10px_24px_rgba(22,51,46,.12)] backdrop-blur">
            <span className="flex items-center gap-2 text-[10px] font-black tracking-[.12em] text-[#2FA084]">
              <MapPin size={13} />
              PIN LOKASI
            </span>
            <b className="mt-1 block truncate text-sm text-[#16332E]">{pin.label}</b>
            <small className="mt-0.5 block truncate text-[11px] text-[#667085]">{address} {unit}</small>
          </div>
          <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-[#1F6F5F] text-white shadow-[0_10px_24px_rgba(31,111,95,.25)]">
            <Navigation size={18} />
          </span>
        </div>
      </div>

      <div className="grid gap-3 p-4 md:grid-cols-[1fr_auto_auto] md:items-center">
        <div>
          <b className="block text-sm text-[#16332E]">Pastikan pin sesuai titik jemput partner</b>
          <p className="mt-1 text-xs leading-5 text-[#667085]">{message}</p>
          <small className="mt-1 block text-[10px] font-bold text-[#98A2B3]">
            Koordinat: {pin.lat.toFixed(5)}, {pin.lng.toFixed(5)}
          </small>
        </div>
        <button
          type="button"
          onClick={useCurrentLocation}
          disabled={loading}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-[#E6F6EF] px-4 text-xs font-black text-[#1F6F5F] transition hover:bg-[#D8F2E7] disabled:opacity-60"
        >
          {loading ? <Loader2 size={15} className="animate-spin" /> : <LocateFixed size={15} />}
          {loading ? "Mendeteksi..." : "Pakai lokasiku"}
        </button>
        <a
          href={maps.google}
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-[#1F6F5F] px-4 text-xs font-black text-white transition hover:bg-[#2FA084]"
        >
          Buka Maps
          <ExternalLink size={14} />
        </a>
      </div>
    </section>
  );
}
