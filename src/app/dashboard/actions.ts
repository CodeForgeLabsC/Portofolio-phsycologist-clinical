"use server";

import { redirect } from "next/navigation";
import {
  clearDashboardSession,
  dashboardConfigured,
  passwordsMatch,
  setDashboardSession,
} from "@/lib/dashboard-auth";

export async function login(formData: FormData) {
  const expected = process.env.DASHBOARD_PASSWORD?.trim() ?? "";
  const given = String(formData.get("password") ?? "");

  if (!dashboardConfigured() || !passwordsMatch(given, expected)) {
    redirect("/dashboard?error=1");
  }

  await setDashboardSession();
  redirect("/dashboard");
}

export async function logout() {
  await clearDashboardSession();
  redirect("/dashboard");
}
