import { AppShell } from "@/components/layout/AppShell";
import { OrdersTabs } from "@/components/orders/OrdersTabs";
export default function Orders(){return <AppShell><main className="mx-auto w-full max-w-5xl px-4 pb-10 md:px-8"><div className="mb-6"><span className="text-[10px] font-black tracking-[.16em] text-[#2FA084]">AKTIVITASMU</span><h1 className="mt-1 text-3xl font-black tracking-tight">Pesanan saya</h1><p className="mt-2 text-sm text-[#667085]">Pantau layanan aktif atau pesan kembali layanan favoritmu.</p></div><OrdersTabs/></main></AppShell>}
