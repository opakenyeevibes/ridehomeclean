import { requireUser } from "@/lib/server/auth";
import { prisma } from "@/lib/server/db";
import { fail, ok, readJson } from "@/lib/server/response";

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireUser(["admin"]);
  if ("error" in auth) return auth.error;
  const { id } = await params;
  const body = await readJson<{ workerId?: string }>(request);
  if (!body.workerId) return fail("Worker wajib dipilih.");
  const existing = await prisma.order.findFirst({ where: { OR: [{ id }, { orderCode: id }] }, select: { id: true } });
  if (!existing) return fail("Pesanan tidak ditemukan.", 404);
  const order = await prisma.order.update({
    where: { id: existing.id },
    data: {
      workerId: body.workerId,
      status: "worker_assigned",
      statusLogs: { create: { status: "worker_assigned", note: "Worker ditugaskan admin", changedByUserId: auth.user.id } },
    },
    include: { service: true, package: true, address: true, customer: true, worker: true, addOns: true },
  });
  return ok(order);
}
