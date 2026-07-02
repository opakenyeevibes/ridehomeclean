import { AdminShell } from "@/components/admin/AdminShell";
import { PaymentMethodsManagerClient } from "@/components/admin/payments/PaymentMethodsManagerClient";

export default function AdminPaymentsPage() {
  return <AdminShell title="Payments" desc="Kelola metode pembayaran yang muncul di customer checkout."><PaymentMethodsManagerClient/></AdminShell>;
}
