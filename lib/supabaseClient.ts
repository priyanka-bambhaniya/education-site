import type { SupabaseClient } from "@supabase/supabase-js";

import { createBrowserSupabaseClient } from "@/lib/supabase/browser";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { createServiceRoleClient } from "@/lib/supabase/service-role";
import type { Database } from "@/types/database";

export type TypedSupabaseClient = SupabaseClient<Database>;

export function createSupabaseBrowserClient(): TypedSupabaseClient {
  return createBrowserSupabaseClient();
}

export function createSupabaseServerClient(): TypedSupabaseClient {
  return createServerSupabaseClient();
}

export function createSupabaseAdminClient(): TypedSupabaseClient {
  return createServiceRoleClient();
}
