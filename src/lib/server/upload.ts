import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";

const imageTypes = new Map([
  ["image/png", "png"],
  ["image/jpeg", "jpg"],
  ["image/webp", "webp"],
  ["image/svg+xml", "svg"],
]);

export async function saveUpload(file: File, folder: "banners" | "services" | "avatars") {
  const ext = imageTypes.get(file.type);
  if (!ext) throw new Error("Format file tidak didukung.");

  const max = ext === "svg" ? 2 * 1024 * 1024 : 5 * 1024 * 1024;
  if (file.size > max) throw new Error("Ukuran file terlalu besar.");

  const baseUploadDir = process.env.UPLOAD_DIR || "public/uploads";
  const uploadRoot = path.join(/* turbopackIgnore: true */ process.cwd(), baseUploadDir, folder);
  await mkdir(uploadRoot, { recursive: true });

  const safeName = `${Date.now()}-${randomUUID()}.${ext}`;
  const absolutePath = path.join(uploadRoot, safeName);
  const bytes = Buffer.from(await file.arrayBuffer());

  if (ext === "svg") {
    const content = bytes.toString("utf8").toLowerCase();
    if (content.includes("<script") || content.includes("javascript:") || content.includes("onload=")) {
      throw new Error("SVG mengandung konten yang tidak aman.");
    }
  }

  await writeFile(absolutePath, bytes);
  const publicBase = process.env.NEXT_PUBLIC_UPLOAD_URL || "/uploads";
  return `${publicBase}/${folder}/${safeName}`;
}
