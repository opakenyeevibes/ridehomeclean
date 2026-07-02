import bcrypt from "bcryptjs";
import { prisma } from "@/lib/server/db";
import { fail, ok, readJson } from "@/lib/server/response";
import { setSessionCookie } from "@/lib/server/auth";

type Body = { name?: string; email?: string; phone?: string; password?: string; role?: "customer" | "worker" | "admin" };

export async function POST(request: Request) {
  const body = await readJson<Body>(request);
  if (!body.name || !body.email || !body.password) return fail("Nama, email, dan password wajib diisi.");
  if (body.password.length < 8) return fail("Password minimal 8 karakter.");

  const role = body.role ?? "customer";
  if (!["customer", "worker", "admin"].includes(role)) return fail("Role tidak valid.");

  const passwordHash = await bcrypt.hash(body.password, 12);
  const user = await prisma.user.create({
    data: { name: body.name, email: body.email.toLowerCase(), phone: body.phone, passwordHash, role },
    select: { id: true, name: true, email: true, phone: true, role: true },
  });

  if (role === "customer") await prisma.customerProfile.create({ data: { userId: user.id } });
  if (role === "worker") await prisma.workerProfile.create({ data: { userId: user.id, skills: [], status: "offline" } });

  await setSessionCookie(user.id, user.role);
  return ok(user, { status: 201 });
}
