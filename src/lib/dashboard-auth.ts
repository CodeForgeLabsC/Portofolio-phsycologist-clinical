import { createHash, createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

const COOKIE = "rm_inquiries";

function passwordDigest(value: string) {
  return createHash("sha256").update(value).digest();
}

export function passwordsMatch(given: string, expected: string) {
  const a = passwordDigest(given);
  const b = passwordDigest(expected);
  return timingSafeEqual(a, b);
}

function sessionToken() {
  const password = process.env.DASHBOARD_PASSWORD ?? "";
  const secret = process.env.DASHBOARD_SECRET || password;
  if (!password || !secret) return "";
  return createHmac("sha256", secret).update(`ok:${password}`).digest("hex");
}

export async function isDashboardAuthed() {
  const expected = sessionToken();
  if (!expected) return false;
  const jar = await cookies();
  const current = jar.get(COOKIE)?.value ?? "";
  if (!current || current.length !== expected.length) return false;
  return timingSafeEqual(Buffer.from(current), Buffer.from(expected));
}

export async function setDashboardSession() {
  const token = sessionToken();
  if (!token) return;
  const jar = await cookies();
  jar.set(COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 14,
    secure: process.env.NODE_ENV === "production",
  });
}

export async function clearDashboardSession() {
  const jar = await cookies();
  jar.delete(COOKIE);
}

export function dashboardConfigured() {
  return Boolean(process.env.DASHBOARD_PASSWORD?.trim());
}
