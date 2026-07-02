"use client";

import { RotateCcw } from "lucide-react";
import { bannerStorageKey } from "@/data/banners";
import { paymentMethodStorageKey, promoStorageKey, serviceStorageKey } from "@/lib/localData";

export function AdminDataSettingsClient() {
  const resetAll = () => {
    if (!window.confirm("Reset semua data custom lokal? Banner, layanan, paket, promo, dan payment akan kembali ke default.")) return;
    [bannerStorageKey, serviceStorageKey, promoStorageKey, paymentMethodStorageKey].forEach((key) => window.localStorage.removeItem(key));
    window.dispatchEvent(new Event("ride-n-care-services-updated"));
    window.dispatchEvent(new Event("ride-n-care-promos-updated"));
    window.dispatchEvent(new Event("ride-n-care-payment-methods-updated"));
    window.location.reload();
  };

  return <button onClick={resetAll} className="mt-4 inline-flex h-11 items-center gap-2 rounded-xl border border-red-100 bg-red-50 px-4 text-xs font-black text-red-600"><RotateCcw size={15}/>Reset data custom lokal</button>;
}
