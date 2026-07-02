"use client";

import { useMemo, useState } from "react";
import { Bell, CheckCheck, Clock3, ShieldCheck, Sparkles, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type NotificationRole = "customer" | "admin";

const notifications = {
  customer: [
    { title: "Promo FIRST CARE aktif", body: "Diskon 25% bisa dipakai untuk layanan pertama kamu.", time: "Baru saja", tone: "promo" },
    { title: "Partner siap membantu", body: "10 layanan Ride N Care tersedia di area kamu hari ini.", time: "5 menit", tone: "success" },
    { title: "Reminder jadwal", body: "Pesanan aktif akan tampil otomatis di halaman Pesanan.", time: "Hari ini", tone: "neutral" },
  ],
  admin: [
    { title: "Pesanan baru masuk", body: "Cek menu Pesanan untuk assign worker dan update status.", time: "Baru saja", tone: "success" },
    { title: "Banner aktif berjalan", body: "Homepage promo aktif dan siap diatur dari Banner Management.", time: "12 menit", tone: "promo" },
    { title: "Mode prototype", body: "Perubahan katalog lokal bisa dilanjutkan ke database production.", time: "Hari ini", tone: "neutral" },
  ],
};

export function NotificationCenter({ role = "customer" }: { role?: NotificationRole }) {
  const [open, setOpen] = useState(false);
  const [permissionState, setPermissionState] = useState<NotificationPermission | "unsupported">(
    typeof window !== "undefined" && "Notification" in window ? Notification.permission : "unsupported",
  );
  const [read, setRead] = useState(false);

  const unreadCount = read ? 0 : notifications[role].length;
  const title = role === "admin" ? "Notifikasi Operasional" : "Notifikasi kamu";
  const helper = role === "admin" ? "Update pesanan, konten, dan operasional." : "Info booking, promo, dan layanan di lokasi kamu.";

  const permissionCopy = useMemo(() => {
    if (permissionState === "granted") return "Notifikasi browser sudah aktif.";
    if (permissionState === "denied") return "Izin notifikasi diblokir. Aktifkan dari pengaturan browser.";
    if (permissionState === "unsupported") return "Browser ini belum mendukung notifikasi.";
    return "Aktifkan notifikasi browser untuk update real-time.";
  }, [permissionState]);

  const requestPermission = async () => {
    if (!("Notification" in window)) {
      setPermissionState("unsupported");
      return;
    }
    const result = await Notification.requestPermission();
    setPermissionState(result);

    if (result === "granted") {
      new Notification("Ride N Care", {
        body: role === "admin" ? "Notifikasi operasional sudah aktif." : "Notifikasi layanan kamu sudah aktif.",
      });
    }
  };

  return (
    <div className="relative">
      <button
        aria-label="Notifikasi"
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="pressable relative grid size-10 shrink-0 place-items-center rounded-[14px] border border-[#D8DEDA] bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-[#6FCF97] hover:shadow-[0_10px_24px_rgba(31,111,95,.10)]"
      >
        <Bell size={18} />
        {unreadCount > 0 && <span className="absolute right-1.5 top-1.5 grid size-4 place-items-center rounded-full bg-[#2FA084] text-[8px] font-black text-white ring-2 ring-white">{unreadCount}</span>}
      </button>

      {open && (
        <div className="absolute right-0 top-[calc(100%+10px)] z-50 w-[330px] max-w-[calc(100vw-24px)] overflow-hidden rounded-[24px] border border-[#D8DEDA] bg-white shadow-[0_22px_55px_rgba(22,51,46,.16)]">
          <div className="flex items-start justify-between gap-3 border-b border-[#EDF1EF] p-4">
            <div>
              <h3 className="text-sm font-black text-[#16332E]">{title}</h3>
              <p className="mt-1 text-xs leading-5 text-[#667085]">{helper}</p>
            </div>
            <button
              type="button"
              onClick={() => setRead(true)}
              className="rounded-full bg-[#E6F6EF] px-3 py-1.5 text-[10px] font-black text-[#1F6F5F] transition hover:bg-[#D8F2E7]"
            >
              Tandai dibaca
            </button>
          </div>

          <div className="p-3">
            <div className={cn("mb-3 rounded-[20px] p-3", permissionState === "granted" ? "bg-[#E6F6EF]" : permissionState === "denied" ? "bg-red-50" : "bg-[#FFF6DE]")}>
              <div className="flex gap-3">
                <span className={cn("grid size-9 shrink-0 place-items-center rounded-2xl bg-white", permissionState === "denied" ? "text-red-500" : "text-[#2FA084]")}>
                  {permissionState === "denied" ? <XCircle size={17} /> : <ShieldCheck size={17} />}
                </span>
                <div className="min-w-0 flex-1">
                  <b className="block text-xs text-[#16332E]">Izin notifikasi</b>
                  <p className="mt-0.5 text-[11px] leading-5 text-[#667085]">{permissionCopy}</p>
                </div>
              </div>
              {permissionState === "default" && (
                <button
                  type="button"
                  onClick={requestPermission}
                  className="mt-3 h-10 w-full rounded-2xl bg-[#1F6F5F] text-xs font-black text-white transition hover:bg-[#2FA084]"
                >
                  Aktifkan notifikasi
                </button>
              )}
            </div>

            <div className="space-y-2">
              {notifications[role].map((item) => (
                <article key={item.title} className={cn("flex gap-3 rounded-[18px] border p-3", read ? "border-[#EDF1EF] bg-white opacity-70" : "border-[#D8DEDA] bg-[#FBFDFC]")}>
                  <span className={cn("grid size-9 shrink-0 place-items-center rounded-2xl", item.tone === "promo" ? "bg-[#FFF6DE] text-[#B38400]" : item.tone === "success" ? "bg-[#E6F6EF] text-[#1F6F5F]" : "bg-[#F2F4F7] text-[#667085]")}>
                    {item.tone === "promo" ? <Sparkles size={16} /> : item.tone === "success" ? <CheckCheck size={16} /> : <Clock3 size={16} />}
                  </span>
                  <div className="min-w-0 flex-1">
                    <b className="block text-xs text-[#16332E]">{item.title}</b>
                    <p className="mt-0.5 text-[11px] leading-5 text-[#667085]">{item.body}</p>
                    <small className="mt-1 block text-[10px] font-bold text-[#98A2B3]">{item.time}</small>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
