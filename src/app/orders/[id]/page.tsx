import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { TrackingClient } from "@/components/orders/TrackingClient";
export default function OrderTracking(){return <AppShell compactHeader><main className="mx-auto w-full max-w-5xl px-4 pb-10 md:px-8"><Link href="/orders" className="mb-5 inline-flex items-center gap-2 text-xs font-bold text-[#667085]"><ArrowLeft size={16}/> Kembali ke pesanan</Link><TrackingClient/></main></AppShell>}
