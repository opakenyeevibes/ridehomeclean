import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import type { Order } from "@/types";
import { orders as defaultOrders } from "@/data/orders";
import { fail, ok, readJson } from "@/lib/server/response";

const filePath = join(process.cwd(), ".prototype", "orders.json");

async function readStore() {
  try {
    return JSON.parse(await readFile(filePath, "utf8")) as Order[];
  } catch {
    return defaultOrders;
  }
}

async function writeStore(items: Order[]) {
  await mkdir(dirname(filePath), { recursive: true });
  await writeFile(filePath, JSON.stringify(items, null, 2), "utf8");
}

export async function GET() {
  return ok(await readStore());
}

export async function POST(request: Request) {
  const body = await readJson<{ order?: Order }>(request);
  if (!body.order?.id) return fail("Data pesanan tidak valid.");
  const items = await readStore();
  const next = [body.order, ...items.filter((item) => item.id !== body.order?.id)];
  await writeStore(next);
  return ok(next);
}

export async function PATCH(request: Request) {
  const body = await readJson<{ id?: string; patch?: Partial<Order> }>(request);
  if (!body.id || !body.patch) return fail("Data update pesanan tidak valid.");
  const items = await readStore();
  const next = items.map((item) => (item.id === body.id ? { ...item, ...body.patch } : item));
  await writeStore(next);
  return ok(next);
}

export async function DELETE() {
  await writeStore(defaultOrders);
  return ok(defaultOrders);
}
