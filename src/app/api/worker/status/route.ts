import type { WorkerStatus } from "@prisma/client";
import { requireUser } from "@/lib/server/auth";
import { prisma } from "@/lib/server/db";
import { fail, ok, readJson } from "@/lib/server/response";

export async function PUT(request: Request) {
  const auth = await requireUser(["worker"]);
  if ("error" in auth) return auth.error;
  const body = await readJson<{ status?: WorkerStatus }>(request);
  if (!body.status) return fail("Status wajib diisi.");
  const profile = await prisma.workerProfile.update({ where: { userId: auth.user.id }, data: { status: body.status } });
  return ok(profile);
}
