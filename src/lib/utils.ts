import type { OrderStatus } from "@/types";

export const formatPrice = (value: number) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(value);
export const cn = (...classes: Array<string | false | null | undefined>) => classes.filter(Boolean).join(" ");
export const statusLabels: Record<OrderStatus, string> = {
  created: "Pesanan dibuat", waiting_confirmation: "Menunggu konfirmasi", searching: "Mencari worker", worker_found: "Worker ditemukan", partner_found: "Worker ditemukan", on_the_way: "Menuju lokasi", arrived: "Sudah sampai", working: "Pengerjaan dimulai", in_progress: "Sedang dikerjakan", work_completed: "Pengerjaan selesai", completed: "Selesai", rating: "Menunggu rating", cancelled: "Dibatalkan", scheduled: "Terjadwal"
};
