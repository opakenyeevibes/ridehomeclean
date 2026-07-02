import { AdminShell } from "@/components/admin/AdminShell";
import { BannerEditorClient } from "@/components/admin/banners/BannerEditorClient";

export default function NewBannerPage() {
  return <AdminShell title="Create Banner" desc="Buat banner baru dengan image mode atau template mode."><BannerEditorClient/></AdminShell>;
}
