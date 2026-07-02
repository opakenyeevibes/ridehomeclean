import { AdminShell } from "@/components/admin/AdminShell";
import { LogoutButton } from "@/components/auth/LogoutButton";
import { AdminDataSettingsClient } from "@/components/admin/settings/AdminDataSettingsClient";

export default function AdminSettingsPage() {
  return <AdminShell title="Settings" desc="Pengaturan prototype Ride N Care."><section className="card max-w-xl p-6"><h2 className="text-lg font-extrabold">Mode prototype lokal</h2><p className="mt-2 text-sm leading-6 text-[#667085]">Role dan data custom admin disimpan di browser menggunakan localStorage. Tidak ada backend atau database nyata pada versi ini.</p><AdminDataSettingsClient/><LogoutButton className="mt-5 max-w-xs"/></section></AdminShell>;
}
