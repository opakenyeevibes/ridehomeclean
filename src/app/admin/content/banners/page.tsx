import { AdminShell } from "@/components/admin/AdminShell";
import { BannerManagementClient } from "@/components/admin/banners/BannerManagementClient";

export default function AdminBannersPage() {
  return <AdminShell title="Banner Management" desc="Create, preview, activate, duplicate, and schedule homepage banners."><BannerManagementClient/></AdminShell>;
}
