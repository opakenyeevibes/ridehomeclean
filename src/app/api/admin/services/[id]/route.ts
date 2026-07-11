import { requireUser } from "@/lib/server/auth";
import { prisma } from "@/lib/server/db";
import { ok, readJson } from "@/lib/server/response";
import type { Prisma } from "@prisma/client";

const findServiceId = async (id: string) => {
  const service = await prisma.service.findFirst({ where: { OR: [{ id }, { slug: id }] }, select: { id: true } });
  return service?.id ?? id;
};

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireUser(["admin"]);
  if ("error" in auth) return auth.error;
  const { id } = await params;
  const body = await readJson<Prisma.ServiceUncheckedUpdateInput>(request);
  const service = await prisma.service.update({ where: { id: await findServiceId(id) }, data: body });
  return ok(service);
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireUser(["admin"]);
  if ("error" in auth) return auth.error;
  const { id } = await params;
  await prisma.service.update({ where: { id: await findServiceId(id) }, data: { isActive: false } });
  return ok({ deleted: true });
}
