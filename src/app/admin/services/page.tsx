import { AdminShell } from "@/components/admin/AdminShell";
import { CatalogManagerClient } from "@/components/admin/catalog/CatalogManagerClient";

export default function AdminServices() {
  return <AdminShell title="Layanan & paket" desc="Kelola katalog layanan yang tampil untuk pelanggan."><CatalogManagerClient mode="services"/></AdminShell>;
}
