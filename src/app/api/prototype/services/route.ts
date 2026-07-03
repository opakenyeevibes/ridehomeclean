import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import type { ManagedService } from "@/types";
import { defaultManagedServices } from "@/lib/defaultManagedServices";
import { fail, ok, readJson } from "@/lib/server/response";

const filePath = join(process.cwd(), ".prototype", "services.json");

async function readStore() {
  try {
    const raw = await readFile(filePath, "utf8");
    return JSON.parse(raw) as ManagedService[];
  } catch {
    return defaultManagedServices;
  }
}

async function writeStore(items: ManagedService[]) {
  await mkdir(dirname(filePath), { recursive: true });
  await writeFile(filePath, JSON.stringify(items, null, 2), "utf8");
}

export async function GET() {
  return ok(await readStore());
}

export async function POST(request: Request) {
  const body = await readJson<{ items?: ManagedService[] }>(request);
  if (!Array.isArray(body.items)) return fail("Data layanan tidak valid.");
  await writeStore(body.items);
  return ok(body.items);
}

export async function DELETE() {
  await writeStore(defaultManagedServices);
  return ok(defaultManagedServices);
}
