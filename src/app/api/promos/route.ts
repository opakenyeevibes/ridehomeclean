import { prisma } from "@/lib/server/db";
import { ok } from "@/lib/server/response";

export async function GET() {
  const now = new Date();
  const promos = await prisma.promo.findMany({
    where: {
      isActive: true,
      AND: [
        { OR: [{ startDate: null }, { startDate: { lte: now } }] },
        { OR: [{ endDate: null }, { endDate: { gte: now } }] },
      ],
    },
    orderBy: { createdAt: "desc" },
  });
  return ok(promos);
}
