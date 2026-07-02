import { AdminShell } from "@/components/admin/AdminShell";
import { CatalogManagerClient } from "@/components/admin/catalog/CatalogManagerClient";

export default function AdminPackagesPage() {
  return <AdminShell title="Package management" desc="Kelola paket layanan Basic, Fresh, Deep, Premium, dan Custom Care."><CatalogManagerClient mode="packages"/></AdminShell>;
}
