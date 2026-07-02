import { AdminShell } from "@/components/admin/AdminShell";
import { BannerEditorClient } from "@/components/admin/banners/BannerEditorClient";

export default async function EditBannerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <AdminShell title="Edit Banner" desc="Ubah konten, jadwal, status, prioritas, dan preview banner."><BannerEditorClient bannerId={id}/></AdminShell>;
}
