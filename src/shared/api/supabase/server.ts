import "server-only";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { auth } from "@clerk/nextjs/server";
import type { Database } from "./database.types";

/**
 * Cria um cliente Supabase autenticado para uso em Server Components,
 * Server Actions e Route Handlers.
 *
 * O token JWT do Clerk é injetado automaticamente via `auth().getToken()`.
 *
 * @example
 * ```ts
 * // Em um Server Component
 * const supabase = await createSupabaseServerClient();
 * const { data } = await supabase.from("processes").select("*");
 * ```
 */
export async function createSupabaseServerClient(): Promise<
  SupabaseClient<Database>
> {
  const { getToken } = await auth();

  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      accessToken: async () => {
        const token = await getToken();
        return token ?? null;
      },
    }
  );
}
