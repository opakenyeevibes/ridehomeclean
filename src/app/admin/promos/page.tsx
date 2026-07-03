import { AdminShell } from "@/components/admin/AdminShell";
import { PromoManagerClient } from "@/components/admin/content/PromoManagerClient";

export default function AdminPromosPage() {
  return <AdminShell title="Promo & voucher" desc="Kelola promo customer Ride Home Care."><PromoManagerClient/></AdminShell>;
}
