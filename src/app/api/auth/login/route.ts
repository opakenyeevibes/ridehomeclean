import bcrypt from "bcryptjs";
import { prisma } from "@/lib/server/db";
import { fail, ok, readJson } from "@/lib/server/response";
import { setSessionCookie } from "@/lib/server/auth";

type Body = { identifier?: string; password?: string };

export async function POST(request: Request) {
  const body = await readJson<Body>(request);
  if (!body.identifier || !body.password) return fail("Email/phone dan password wajib diisi.");

  const user = await prisma.user.findFirst({
    where: { OR: [{ email: body.identifier.toLowerCase() }, { phone: body.identifier }] },
  });
  if (!user || user.status !== "active") return fail("Akun tidak ditemukan.", 401);

  const valid = await bcrypt.compare(body.password, user.passwordHash);
  if (!valid) return fail("Password salah.", 401);

  await setSessionCookie(user.id, user.role);
  return ok({ id: user.id, name: user.name, email: user.email, phone: user.phone, role: user.role });
}
