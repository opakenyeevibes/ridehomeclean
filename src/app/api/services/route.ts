import { prisma } from "@/lib/server/db";
import { ok } from "@/lib/server/response";

export async function GET() {
  const services = await prisma.service.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
    include: {
      packages: { where: { isActive: true }, orderBy: { sortOrder: "asc" } },
      addOns: { where: { isActive: true }, orderBy: { createdAt: "asc" } },
    },
  });
  return ok(services);
}
