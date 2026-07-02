import { requireUser } from "@/lib/server/auth";
import { prisma } from "@/lib/server/db";
import { fail, ok } from "@/lib/server/response";
import { saveUpload } from "@/lib/server/upload";

export async function POST(request: Request) {
  const auth = await requireUser();
  if ("error" in auth) return auth.error;
  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File)) return fail("File wajib diupload.");
  try {
    const url = await saveUpload(file, "avatars");
    await prisma.user.update({ where: { id: auth.user.id }, data: { avatarUrl: url } });
    return ok({ url });
  } catch (error) {
    return fail(error instanceof Error ? error.message : "Upload gagal.");
  }
}
