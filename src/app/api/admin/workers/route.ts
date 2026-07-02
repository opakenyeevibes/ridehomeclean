import { requireUser } from "@/lib/server/auth";
import { prisma } from "@/lib/server/db";
import { ok } from "@/lib/server/response";

export async function GET() {
  const auth = await requireUser(["admin"]);
  if ("error" in auth) return auth.error;
  return ok(await prisma.user.findMany({ where: { role: "worker" }, include: { workerProfile: true } }));
}
