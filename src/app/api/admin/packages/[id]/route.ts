import { requireUser } from "@/lib/server/auth";
import { prisma } from "@/lib/server/db";
import { ok, readJson } from "@/lib/server/response";
import type { Prisma } from "@prisma/client";

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireUser(["admin"]);
  if ("error" in auth) return auth.error;
  const { id } = await params;
  const body = await readJson<Prisma.ServicePackageUncheckedUpdateInput>(request);
  const pkg = await prisma.servicePackage.update({ where: { id }, data: body });
  return ok(pkg);
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireUser(["admin"]);
  if ("error" in auth) return auth.error;
  const { id } = await params;
  await prisma.servicePackage.update({ where: { id }, data: { isActive: false } });
  return ok({ deleted: true });
}
