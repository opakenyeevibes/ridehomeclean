import type { OrderStatus } from "@prisma/client";
import { requireUser } from "@/lib/server/auth";
import { prisma } from "@/lib/server/db";
import { fail, ok, readJson } from "@/lib/server/response";

const allowed: OrderStatus[] = ["worker_on_the_way", "arrived", "working", "completed"];

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireUser(["worker"]);
  if ("error" in auth) return auth.error;
  const { id } = await params;
  const body = await readJson<{ status?: OrderStatus; note?: string }>(request);
  if (!body.status || !allowed.includes(body.status)) return fail("Status worker tidak valid.");
  const existing = await prisma.order.findFirst({ where: { OR: [{ id }, { orderCode: id }], workerId: auth.user.id }, select: { id: true } });
  if (!existing) return fail("Job tidak ditemukan.", 404);
  const order = await prisma.order.update({ where: { id: existing.id }, data: { status: body.status, statusLogs: { create: { status: body.status, note: body.note, changedByUserId: auth.user.id } } }, include: { service: true, package: true, address: true, customer: true, worker: true, addOns: true } });
  return ok(order);
}
