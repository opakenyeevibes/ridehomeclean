import bcrypt from "bcryptjs";
import { prisma } from "@/lib/server/db";
import { fail, ok, readJson } from "@/lib/server/response";
import { setSessionCookie } from "@/lib/server/auth";

type Body = { identifier?: string; password?: string };

const localFallbackUsers = [
  { id: "local-admin", name: "Admin Ride Home Care", email: "admin@ridehomecare.local", phone: "081234567892", role: "admin" },
  { id: "local-worker", name: "Partner Ride Home Care", email: "budi@partner.test", phone: "081234567891", role: "worker" },
  { id: "local-customer", name: "Customer Ride Home Care", email: "customer@ridehomecare.local", phone: "081234567890", role: "customer" },
] as const;

function localFallbackLogin(identifier: string, password: string) {
  if (process.env.NODE_ENV === "production") return null;
  if (password !== "Password123!" && password !== "Admin12345!") return null;
  const normalized = identifier.toLowerCase();
  const user = localFallbackUsers.find((item) => item.email === normalized || item.phone === identifier);
  if (!user) return null;
  if (user.role === "admin" && password !== "Admin12345!") return null;
  if (user.role !== "admin" && password !== "Password123!") return null;
  return user;
}

export async function POST(request: Request) {
  const body = await readJson<Body>(request);
  if (!body.identifier || !body.password) return fail("Email/phone dan password wajib diisi.");

  let user;
  try {
    user = await prisma.user.findFirst({
      where: { OR: [{ email: body.identifier.toLowerCase() }, { phone: body.identifier }] },
    });
  } catch {
    const fallback = localFallbackLogin(body.identifier, body.password);
    if (fallback) return ok(fallback);
    return fail("Database lokal belum aktif. Gunakan akun fallback lokal atau jalankan database.", 503);
  }

  if (!user || user.status !== "active") {
    const fallback = localFallbackLogin(body.identifier, body.password);
    if (fallback) return ok(fallback);
    return fail("Akun tidak ditemukan.", 401);
  }

  const valid = await bcrypt.compare(body.password, user.passwordHash);
  if (!valid) {
    const fallback = localFallbackLogin(body.identifier, body.password);
    if (fallback) return ok(fallback);
    return fail("Password salah.", 401);
  }

  await setSessionCookie(user.id, user.role);
  return ok({ id: user.id, name: user.name, email: user.email, phone: user.phone, role: user.role });
}
