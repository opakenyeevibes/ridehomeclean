import { requireUser } from "@/lib/server/auth";
import { prisma } from "@/lib/server/db";
import { ok } from "@/lib/server/response";

export async function PUT(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireUser(["worker"]);
  if ("error" in auth) return auth.error;
  const { id } = await params;
  const order = await prisma.order.update({ where: { id }, data: { workerId: auth.user.id, status: "worker_assigned", statusLogs: { create: { status: "worker_assigned", note: "Job diterima worker", changedByUserId: auth.user.id } } } });
  return ok(order);
}
