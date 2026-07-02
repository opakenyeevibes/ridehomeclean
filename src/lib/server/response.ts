import { NextResponse } from "next/server";

export const ok = <T>(data: T, init?: ResponseInit) => NextResponse.json({ ok: true, data }, init);
export const fail = (message: string, status = 400) => NextResponse.json({ ok: false, error: message }, { status });

export async function readJson<T>(request: Request): Promise<T> {
  try {
    return (await request.json()) as T;
  } catch {
    return {} as T;
  }
}
