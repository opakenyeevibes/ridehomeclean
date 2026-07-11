import { requireUser } from "@/lib/server/auth";
import { prisma } from "@/lib/server/db";
import { fail, ok } from "@/lib/server/response";

export async function PUT(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireUser(["worker"]);
  if ("error" in auth) return auth.error;
  const { id } = await params;
  const existing = await prisma.order.findFirst({ where: { OR: [{ id }, { orderCode: id }] }, select: { id: true } });
  if (!existing) return fail("Job tidak ditemukan.", 404);
  const order = await prisma.order.update({ where: { id: existing.id }, data: { workerId: auth.user.id, status: "worker_assigned", statusLogs: { create: { status: "worker_assigned", note: "Job diterima worker", changedByUserId: auth.user.id } } }, include: { service: true, package: true, address: true, customer: true, worker: true, addOns: true } });
  return ok(order);
}
