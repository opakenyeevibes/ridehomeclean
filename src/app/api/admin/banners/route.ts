import { requireUser } from "@/lib/server/auth";
import { prisma } from "@/lib/server/db";
import { ok, readJson } from "@/lib/server/response";
import type { Prisma } from "@prisma/client";

export async function GET() {
  const auth = await requireUser(["admin"]);
  if ("error" in auth) return auth.error;
  return ok(await prisma.banner.findMany({ orderBy: { sortOrder: "asc" } }));
}

export async function POST(request: Request) {
  const auth = await requireUser(["admin"]);
  if ("error" in auth) return auth.error;
  const body = await readJson<Prisma.BannerUncheckedCreateInput>(request);
  const banner = await prisma.banner.create({ data: body });
  return ok(banner, { status: 201 });
}
