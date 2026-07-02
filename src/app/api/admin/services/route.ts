import { requireUser } from "@/lib/server/auth";
import { prisma } from "@/lib/server/db";
import { fail, ok, readJson } from "@/lib/server/response";

type Body = {
  name?: string;
  slug?: string;
  category?: string;
  description?: string;
  icon?: string;
  imageUrl?: string;
  startingPrice?: number;
  duration?: string;
  isActive?: boolean;
  sortOrder?: number;
};

const slugify = (value: string) => value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export async function GET() {
  const auth = await requireUser(["admin"]);
  if ("error" in auth) return auth.error;
  return ok(await prisma.service.findMany({ orderBy: { sortOrder: "asc" }, include: { packages: true, addOns: true } }));
}

export async function POST(request: Request) {
  const auth = await requireUser(["admin"]);
  if ("error" in auth) return auth.error;
  const body = await readJson<Body>(request);
  if (!body.name || !body.category || !body.description || !body.duration || body.startingPrice == null) return fail("Data layanan belum lengkap.");
  const service = await prisma.service.create({
    data: {
      name: body.name,
      slug: body.slug ? slugify(body.slug) : slugify(body.name),
      category: body.category,
      description: body.description,
      icon: body.icon,
      imageUrl: body.imageUrl,
      startingPrice: body.startingPrice,
      duration: body.duration,
      isActive: body.isActive ?? true,
      sortOrder: body.sortOrder ?? 99,
    },
  });
  return ok(service, { status: 201 });
}
