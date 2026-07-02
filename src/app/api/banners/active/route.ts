import { prisma } from "@/lib/server/db";
import { ok } from "@/lib/server/response";

export async function GET() {
  const now = new Date();
  const banners = await prisma.banner.findMany({
    where: {
      isActive: true,
      AND: [
        { OR: [{ startDate: null }, { startDate: { lte: now } }] },
        { OR: [{ endDate: null }, { endDate: { gte: now } }] },
      ],
    },
    orderBy: { sortOrder: "asc" },
  });
  return ok(banners);
}
