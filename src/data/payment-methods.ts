import type { PaymentMethod } from "@/types";

export const paymentMethods: PaymentMethod[] = [
  { id: "qris", name: "QRIS", enabled: true, description: "Scan dari aplikasi bank atau e-wallet" },
  { id: "cash", name: "Tunai", enabled: true, description: "Bayar setelah pekerjaan selesai" },
  { id: "bank", name: "Transfer Bank", enabled: true, description: "BCA, Mandiri, BNI, BRI" },
  { id: "ewallet", name: "E-Wallet", enabled: true, description: "Dompet digital pilihanmu" },
  { id: "paylater", name: "Bayar nanti", enabled: false, description: "Segera hadir" },
];
