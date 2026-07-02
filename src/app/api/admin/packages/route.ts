import { requireUser } from "@/lib/server/auth";
import { prisma } from "@/lib/server/db";
import { fail, ok, readJson } from "@/lib/server/response";

type Body = { serviceId?: string; name?: string; description?: string; price?: number; duration?: string; includes?: string[]; isActive?: boolean; sortOrder?: number };

export async function POST(request: Request) {
  const auth = await requireUser(["admin"]);
  if ("error" in auth) return auth.error;
  const body = await readJson<Body>(request);
  if (!body.serviceId || !body.name || !body.description || body.price == null || !body.duration) return fail("Data paket belum lengkap.");
  const pkg = await prisma.servicePackage.create({
    data: {
      serviceId: body.serviceId,
      name: body.name,
      description: body.description,
      price: body.price,
      duration: body.duration,
      includes: body.includes ?? [],
      isActive: body.isActive ?? true,
      sortOrder: body.sortOrder ?? 99,
    },
  });
  return ok(pkg, { status: 201 });
}
