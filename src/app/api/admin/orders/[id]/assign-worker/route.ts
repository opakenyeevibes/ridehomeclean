import { requireUser } from "@/lib/server/auth";
import { prisma } from "@/lib/server/db";
import { fail, ok, readJson } from "@/lib/server/response";

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireUser(["admin"]);
  if ("error" in auth) return auth.error;
  const { id } = await params;
  const body = await readJson<{ workerId?: string }>(request);
  if (!body.workerId) return fail("Worker wajib dipilih.");
  const order = await prisma.order.update({
    where: { id },
    data: {
      workerId: body.workerId,
      status: "worker_assigned",
      statusLogs: { create: { status: "worker_assigned", note: "Worker ditugaskan admin", changedByUserId: auth.user.id } },
    },
  });
  return ok(order);
}
