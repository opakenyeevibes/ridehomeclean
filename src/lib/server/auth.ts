import { cookies } from "next/headers";
import { createHmac, timingSafeEqual } from "node:crypto";
import type { UserRole } from "@prisma/client";
import { prisma } from "@/lib/server/db";
import { fail } from "@/lib/server/response";

const cookieName = "rnc_session";

type SessionPayload = {
  userId: string;
  role: UserRole;
  exp: number;
};

const secret = () => process.env.AUTH_SECRET || "dev-secret-change-me";

function base64url(input: string) {
  return Buffer.from(input).toString("base64url");
}

function sign(payload: string) {
  return createHmac("sha256", secret()).update(payload).digest("base64url");
}

export function createSessionToken(payload: Omit<SessionPayload, "exp">) {
  const body = base64url(JSON.stringify({ ...payload, exp: Date.now() + 1000 * 60 * 60 * 24 * 7 }));
  return `${body}.${sign(body)}`;
}

export function verifySessionToken(token?: string): SessionPayload | null {
  if (!token?.includes(".")) return null;
  const [body, signature] = token.split(".");
  const expected = sign(body);
  const valid =
    signature.length === expected.length &&
    timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
  if (!valid) return null;
  try {
    const payload = JSON.parse(Buffer.from(body, "base64url").toString("utf8")) as SessionPayload;
    if (!payload.userId || !payload.role || payload.exp < Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}

export async function setSessionCookie(userId: string, role: UserRole) {
  const cookieStore = await cookies();
  cookieStore.set(cookieName, createSessionToken({ userId, role }), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function clearSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(cookieName);
}

export async function getSession() {
  const cookieStore = await cookies();
  const payload = verifySessionToken(cookieStore.get(cookieName)?.value);
  if (!payload) return null;
  const user = await prisma.user.findUnique({
    where: { id: payload.userId },
    select: { id: true, name: true, email: true, phone: true, role: true, status: true, avatarUrl: true },
  });
  if (!user || user.status !== "active") return null;
  return user;
}

export async function requireUser(roles?: UserRole[]) {
  const user = await getSession();
  if (!user) return { error: fail("Unauthorized", 401) };
  if (roles?.length && !roles.includes(user.role)) return { error: fail("Forbidden", 403) };
  return { user };
}
