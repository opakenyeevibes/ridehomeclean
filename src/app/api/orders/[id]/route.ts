import { requireUser } from "@/lib/server/auth";
import { prisma } from "@/lib/server/db";
import { fail, ok } from "@/lib/server/response";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireUser();
  if ("error" in auth) return auth.error;
  const { id } = await params;
  const order = await prisma.order.findFirst({
    where: { OR: [{ id }, { orderCode: id }] },
    include: { service: true, package: true, address: true, customer: true, worker: true, addOns: true, payments: true, statusLogs: true, review: true },
  });
  if (!order) return fail("Order tidak ditemukan.", 404);
  if (auth.user.role === "customer" && order.customerId !== auth.user.id) return fail("Forbidden", 403);
  if (auth.user.role === "worker" && order.workerId !== auth.user.id) return fail("Forbidden", 403);
  return ok(order);
}
