import { Suspense } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { BookingFlow } from "@/components/booking/BookingFlow";
import { LoadingState } from "@/components/ui/LoadingState";
import { BrandMark } from "@/components/ui/BrandMark";

export default function BookingPage(){return <main className="mx-auto min-h-screen w-full max-w-6xl px-4 py-5 md:px-8 md:py-8"><div className="mb-6 flex items-center justify-between"><Link href="/" className="inline-flex items-center gap-2 rounded-xl px-1 py-2 text-xs font-extrabold text-[#667085] transition hover:text-[#2FA084] active:scale-95"><ArrowLeft size={16}/> Batalkan booking</Link><span className="inline-flex items-center gap-2"><BrandMark compact/><b className="hidden text-sm sm:block">Booking Ride Home Care</b></span></div><Suspense fallback={<LoadingState/>}><BookingFlow/></Suspense></main>}
