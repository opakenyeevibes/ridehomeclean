import { clearSessionCookie } from "@/lib/server/auth";
import { ok } from "@/lib/server/response";

export async function POST() {
  await clearSessionCookie();
  return ok({ loggedOut: true });
}
