"use server";

import { z } from "zod";
import { redirect } from "next/navigation";

import { env, hasSupabaseEnv } from "@/lib/env";
import { getRoleDashboardPath, normalizeSelfSignupRole } from "@/lib/auth/roles";
import { isUserRole } from "@/lib/rbac";
import { createSupabaseAdminClient, createSupabaseServerClient } from "@/lib/supabaseClient";
import type { UserRole } from "@/types/domain";

const passwordSchema = z.string().min(8).max(72);

function safeRedirectPath(value: FormDataEntryValue | null, fallback: string) {
  if (typeof value !== "string") return fallback;
  if (!value.startsWith("/")) return fallback;
  if (value.startsWith("//")) return fallback;
  return value;
}

export type UserProfile = {
  id: string;
  role: UserRole;
  name: string | null;
  email: string;
  school_id: string | null;
};

export async function getServerUserProfile() {
  const supabase = createSupabaseServerClient();
  const { data } = await supabase.auth.getUser();

  if (!data.user) {
    return null;
  }

  const { data: profile } = await supabase
    .from("users")
    .select("id, role, name, email, school_id")
    .eq("id", data.user.id)
    .maybeSingle();

  if (profile) {
    return { user: data.user, profile };
  }

  const email = data.user.email ?? "";
  if (!email) {
    return { user: data.user, profile: null };
  }

  const rawRole =
    typeof data.user.app_metadata?.role === "string"
      ? data.user.app_metadata.role
      : undefined;
  const role = isUserRole(rawRole) ? rawRole : "student";
  const name =
    typeof data.user.user_metadata?.full_name === "string"
      ? data.user.user_metadata.full_name
      : typeof data.user.user_metadata?.name === "string"
        ? data.user.user_metadata.name
        : null;

  const { data: insertedProfile } = await supabase
    .from("users")
    .insert({
      id: data.user.id,
      email,
      name,
      role,
    })
    .select("id, role, name, email, school_id")
    .maybeSingle();

  return { user: data.user, profile: insertedProfile ?? null };
}

export async function requireRole(roles: UserRole[]) {
  const session = await getServerUserProfile();

  if (!session?.profile || !roles.includes(session.profile.role)) {
    redirect("/login?error=unauthorized");
  }

  return session;
}

export async function signInAction(formData: FormData) {
  if (!hasSupabaseEnv) {
    redirect("/login?error=missing_supabase_env");
  }

  const parsed = z
    .object({
      email: z.string().email(),
      password: passwordSchema,
    })
    .safeParse({
      email: formData.get("email"),
      password: formData.get("password"),
    });

  if (!parsed.success) {
    redirect("/login?error=invalid_credentials");
  }

  const supabase = createSupabaseServerClient();
    const { error } = await supabase.auth.signInWithPassword(parsed.data);

  if (error) {
    const message = error.message?.toLowerCase() ?? "";
    const code = (error as { code?: string } | null)?.code?.toLowerCase?.() ?? "";

    if (
      code === "email_not_confirmed" ||
      message.includes("email not confirmed") ||
      message.includes("email not verified") ||
      message.includes("not confirmed")
    ) {
      redirect("/login?error=email_not_confirmed");
    }

    if (message.includes("invalid login credentials")) {
      redirect("/login?error=invalid_credentials");
    }

    redirect("/login?error=auth_failed");
  }

  const nextPath = safeRedirectPath(formData.get("next"), "");
  if (nextPath && nextPath !== "/dashboard") {
    redirect(nextPath);
  }

  const session = await getServerUserProfile();
  const rolePath = session?.profile ? getRoleDashboardPath(session.profile.role) : "/dashboard";
  redirect(rolePath);
}

export async function magicLinkAction(formData: FormData) {
  if (!hasSupabaseEnv) {
    redirect("/login?error=missing_supabase_env");
  }

  const parsed = z
    .object({
      email: z.string().email(),
    })
    .safeParse({
      email: formData.get("email"),
    });

  if (!parsed.success) {
    redirect("/login?error=invalid_email");
  }

  const nextPath = safeRedirectPath(formData.get("next"), "/dashboard");
  const redirectTo = `${env.NEXT_PUBLIC_SITE_URL}/auth/callback?next=${encodeURIComponent(nextPath)}`;

  const supabase = createSupabaseServerClient();
  const { error } = await supabase.auth.signInWithOtp({
    email: parsed.data.email,
    options: {
      emailRedirectTo: redirectTo,
      shouldCreateUser: false,
    },
  });

  if (error) {
    redirect("/login?error=magic_link_failed");
  }

  redirect("/login?success=magic_link_sent");
}

export async function signUpAction(formData: FormData) {
  if (!hasSupabaseEnv) {
    redirect("/signup?error=missing_supabase_env");
  }

  const parsed = z
    .object({
      name: z.string().min(2).max(120),
      email: z.string().email(),
      password: passwordSchema,
      confirmPassword: passwordSchema,
      role: z.string().optional(),
    })
    .safeParse({
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
      role: formData.get("role"),
    });

  if (!parsed.success) {
    redirect("/signup?error=invalid_input");
  }

  if (parsed.data.password !== parsed.data.confirmPassword) {
    redirect("/signup?error=password_mismatch");
  }

  const role = normalizeSelfSignupRole(parsed.data.role ?? env.NEXT_PUBLIC_DEFAULT_ROLE);

  if (role !== "student" && !env.SUPABASE_SERVICE_ROLE_KEY) {
    redirect("/signup?error=role_assignment_unavailable");
  }

  const supabase = createSupabaseServerClient();
    const { data, error } = await supabase.auth.signUp({
    email: parsed.data.email,
    password: parsed.data.password,
    options: {
      data: {
        full_name: parsed.data.name,
      },
      emailRedirectTo: `${env.NEXT_PUBLIC_SITE_URL}/auth/callback?next=/dashboard`,
    },
  });

  if (error) {
    const message = error.message?.toLowerCase() ?? "";
    const code = (error as { code?: string } | null)?.code?.toLowerCase?.() ?? "";

    if (code === "user_already_exists" || message.includes("already registered") || message.includes("already exists")) {
      redirect("/signup?error=account_exists");
    }

    if (code === "email_address_invalid" || message.includes("invalid email")) {
      redirect("/signup?error=invalid_email");
    }

    if (code === "weak_password" || message.includes("password")) {
      redirect("/signup?error=weak_password");
    }

    if (message.includes("signup") && message.includes("disabled")) {
      redirect("/signup?error=signup_disabled");
    }

    if (message.includes("signups not allowed") || message.includes("not allowed")) {
      redirect("/signup?error=signup_disabled");
    }

    if (message.includes("email") && message.includes("disabled")) {
      redirect("/signup?error=email_disabled");
    }

    console.error("Sign up failed", error);
    redirect("/signup?error=signup_failed");
  }

  if (role !== "student" && data.user?.id) {
    const admin = createSupabaseAdminClient();
    const { error: updateError } = await admin
      .from("users")
      .update({ role })
      .eq("id", data.user.id);

    if (updateError) {
      redirect("/signup?error=role_update_failed");
    }
  }

  redirect("/login?success=confirm_email");
}

export async function resetPasswordAction(formData: FormData) {
  if (!hasSupabaseEnv) {
    redirect("/reset-password?error=missing_supabase_env");
  }

  const parsed = z
    .object({
      email: z.string().email(),
    })
    .safeParse({
      email: formData.get("email"),
    });

  if (!parsed.success) {
    redirect("/reset-password?error=invalid_email");
  }

  const supabase = createSupabaseServerClient();
  const { error } = await supabase.auth.resetPasswordForEmail(parsed.data.email, {
    redirectTo: `${env.NEXT_PUBLIC_SITE_URL}/auth/callback?next=/update-password`,
  });

  if (error) {
    redirect("/reset-password?error=reset_failed");
  }

  redirect("/reset-password?success=sent");
}

export async function updatePasswordAction(formData: FormData) {
  if (!hasSupabaseEnv) {
    redirect("/login?error=missing_supabase_env");
  }

  const parsed = z
    .object({
      password: passwordSchema,
      confirmPassword: passwordSchema,
    })
    .safeParse({
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    });

  if (!parsed.success) {
    redirect("/update-password?error=invalid_input");
  }

  if (parsed.data.password !== parsed.data.confirmPassword) {
    redirect("/update-password?error=password_mismatch");
  }

  const supabase = createSupabaseServerClient();
  const { error } = await supabase.auth.updateUser({
    password: parsed.data.password,
  });

  if (error) {
    redirect("/update-password?error=update_failed");
  }

  redirect("/dashboard?success=password_updated");
}

export async function signOutAction() {
  const supabase = createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect("/login");
}



