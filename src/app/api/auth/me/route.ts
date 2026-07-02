import { getSession } from "@/lib/server/auth";
import { fail, ok } from "@/lib/server/response";

export async function GET() {
  const user = await getSession();
  if (!user) return fail("Unauthorized", 401);
  return ok(user);
}
