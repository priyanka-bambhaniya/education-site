import { NextResponse } from "next/server";

import { hasSupabaseEnv } from "@/lib/env";
import { getRoleDashboardPath } from "@/lib/auth/roles";
import { createServerSupabaseClient } from "@/lib/supabase/server";

function resolveNextPath(value: string | null) {
  if (!value) return "/dashboard";
  if (!value.startsWith("/")) return "/dashboard";
  if (value.startsWith("//")) return "/dashboard";
  return value;
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const nextPath = resolveNextPath(url.searchParams.get("next"));

  if (!hasSupabaseEnv) {
    return NextResponse.redirect(new URL("/login?error=missing_supabase_env", url.origin));
  }

  const supabase = createServerSupabaseClient();

  if (code) {
    await supabase.auth.exchangeCodeForSession(code);
  }

  let redirectPath = nextPath;

  if (nextPath === "/dashboard") {
    const { data } = await supabase.auth.getUser();

    if (data.user) {
      const { data: profile } = await (supabase as any)
        .from("users")
        .select("role")
        .eq("id", data.user.id)
        .maybeSingle();

      if (profile?.role) {
        redirectPath = getRoleDashboardPath(profile.role);
      }
    }
  }

  return NextResponse.redirect(new URL(redirectPath, url.origin));
}
