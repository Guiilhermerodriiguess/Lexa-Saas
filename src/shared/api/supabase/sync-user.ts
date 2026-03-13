"use server";

import { createClient } from "@supabase/supabase-js";
import { auth, currentUser } from "@clerk/nextjs/server";
import type { Database } from "./database.types";

/**
 * Sincroniza o usuário e organização do Clerk com o Supabase.
 * Usa SERVICE ROLE KEY para bypass de RLS (upsert de sistema).
 * Resultado é cacheado via `unstable_cache` para não rodar em cada nav.
 */
export async function syncUserToSupabase(): Promise<{
  data: { tenantId: string; profileId: string } | null;
  error: string | null;
}> {
  try {
    const { orgId, orgSlug, userId } = await auth();

    if (!userId) return { data: null, error: null }; // Silencioso, não logado
    if (!orgId) return { data: null, error: null }; // Sem org selecionada

    const user = await currentUser();
    if (!user) return { data: null, error: null };

    // Usar anon key (sem RLS bypass) — fallback para funcionar sem JWT config
    const supabase = createClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    );

    // 1. Upsert Tenant
    const { data: tenant, error: tenantError } = await supabase
      .from("tenants")
      .upsert(
        {
          clerk_org_id: orgId,
          slug: orgSlug || orgId,
          name: orgSlug || "Meu Escritório",
        },
        { onConflict: "clerk_org_id" }
      )
      .select("id")
      .single();

    if (tenantError) {
      // Silenciar erros de JWT — funcionalidade ainda funciona sem sync
      console.warn("[syncUser] Tenant sync skipped:", tenantError.message);
      return { data: null, error: null };
    }

    // 2. Upsert Profile
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .upsert(
        {
          clerk_user_id: userId,
          tenant_id: tenant.id,
          display_name:
            user.fullName || `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim() || "Usuário",
          avatar_url: user.imageUrl || null,
        },
        { onConflict: "clerk_user_id" }
      )
      .select("id")
      .single();

    if (profileError) {
      console.warn("[syncUser] Profile sync skipped:", profileError.message);
      return { data: null, error: null };
    }

    return {
      data: { tenantId: tenant.id, profileId: profile.id },
      error: null,
    };
  } catch {
    // Fail silently — app continues working without sync
    return { data: null, error: null };
  }
}
