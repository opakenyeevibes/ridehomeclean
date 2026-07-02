import { prisma } from "@/lib/server/db";
import { ok } from "@/lib/server/response";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const packages = await prisma.servicePackage.findMany({
    where: { service: { OR: [{ id }, { slug: id }] }, isActive: true },
    orderBy: { sortOrder: "asc" },
  });
  return ok(packages);
}
