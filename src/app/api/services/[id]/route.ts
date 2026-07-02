import { prisma } from "@/lib/server/db";
import { fail, ok } from "@/lib/server/response";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const service = await prisma.service.findFirst({
    where: { OR: [{ id }, { slug: id }], isActive: true },
    include: {
      packages: { where: { isActive: true }, orderBy: { sortOrder: "asc" } },
      addOns: { where: { isActive: true }, orderBy: { createdAt: "asc" } },
    },
  });
  if (!service) return fail("Service tidak ditemukan.", 404);
  return ok(service);
}
