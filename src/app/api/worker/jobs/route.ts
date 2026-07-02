import { requireUser } from "@/lib/server/auth";
import { prisma } from "@/lib/server/db";
import { ok } from "@/lib/server/response";

export async function GET() {
  const auth = await requireUser(["worker"]);
  if ("error" in auth) return auth.error;
  return ok(await prisma.order.findMany({ where: { workerId: auth.user.id }, orderBy: { bookingDate: "asc" }, include: { service: true, package: true, address: true, customer: true, addOns: true } }));
}
