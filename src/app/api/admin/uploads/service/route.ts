import { requireUser } from "@/lib/server/auth";
import { fail, ok } from "@/lib/server/response";
import { saveUpload } from "@/lib/server/upload";

export async function POST(request: Request) {
  const auth = await requireUser(["admin"]);
  if ("error" in auth) return auth.error;
  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File)) return fail("File wajib diupload.");
  try {
    return ok({ url: await saveUpload(file, "services") });
  } catch (error) {
    return fail(error instanceof Error ? error.message : "Upload gagal.");
  }
}
