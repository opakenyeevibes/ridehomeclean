import { cn } from "@/lib/utils";

export function Skeleton({ className }: { className?: string }) {
  return <div aria-hidden="true" className={cn("animate-pulse rounded-xl bg-[#D8DEDA]", className)}/>;
}

function SkeletonHeader() {
  return <div className="mb-5 flex h-[62px] items-center gap-2 border-b border-[#e7ecea] px-4"><Skeleton className="size-9 rounded-[13px]"/><Skeleton className="h-10 max-w-44 flex-1 rounded-[15px]"/><Skeleton className="ml-auto size-10 rounded-[14px]"/><Skeleton className="size-10 rounded-[14px]"/></div>;
}

function SkeletonDock() {
  return <div className="fixed inset-x-2.5 bottom-2 z-50 flex h-[64px] items-center justify-around rounded-[21px] border border-white bg-white p-2 shadow-lg md:hidden">{Array.from({ length: 4 }).map((_, index) => <span key={index} className="grid place-items-center gap-1"><Skeleton className="size-7 rounded-[10px]"/><Skeleton className="h-1.5 w-9"/></span>)}</div>;
}

export function HomeSkeleton() {
  return <div><SkeletonHeader/><main className="mx-auto max-w-7xl space-y-7 px-4 pb-32 md:px-8"><div className="space-y-2"><Skeleton className="h-2.5 w-40"/><Skeleton className="h-7 w-72 max-w-full"/></div><Skeleton className="h-[258px] rounded-[28px]"/><Skeleton className="h-13 rounded-[20px]"/><section><Skeleton className="mb-4 h-5 w-44"/><div className="grid grid-cols-5 gap-2">{Array.from({ length: 10 }).map((_, index) => <div key={index} className="grid place-items-center gap-2"><Skeleton className="size-14 rounded-[18px]"/><Skeleton className="h-2 w-10"/></div>)}</div></section><section><Skeleton className="mb-4 h-5 w-52"/><div className="grid grid-cols-2 gap-3 md:grid-cols-3">{Array.from({ length: 3 }).map((_, index) => <div key={index} className={index === 2 ? "col-span-2 md:col-span-1" : ""}><Skeleton className="h-64 rounded-[24px]"/></div>)}</div></section></main><SkeletonDock/></div>;
}

export function ServiceDetailSkeleton() {
  return <div><SkeletonHeader/><main className="mx-auto max-w-6xl space-y-6 px-4 pb-32 md:px-8"><Skeleton className="h-4 w-32"/><Skeleton className="h-72 rounded-[30px]"/><div className="grid gap-4 md:grid-cols-3">{Array.from({ length: 3 }).map((_, index) => <Skeleton key={index} className="h-64 rounded-[24px]"/>)}</div><Skeleton className="h-40 rounded-[24px]"/></main><SkeletonDock/></div>;
}

export function OrdersSkeleton() {
  return <div><SkeletonHeader/><main className="mx-auto max-w-5xl px-4 pb-32 md:px-8"><Skeleton className="h-3 w-24"/><Skeleton className="mt-3 h-8 w-52"/><Skeleton className="mt-3 h-3 w-72 max-w-full"/><Skeleton className="mt-7 h-13 rounded-[20px]"/><div className="mt-6 grid gap-4 md:grid-cols-2">{Array.from({ length: 4 }).map((_, index) => <Skeleton key={index} className="h-48 rounded-[24px]"/>)}</div></main><SkeletonDock/></div>;
}
