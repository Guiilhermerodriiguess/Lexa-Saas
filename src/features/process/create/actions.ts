"use server";

import { createSupabaseServerClient } from "@/shared/api/supabase/server";
import { auth } from "@clerk/nextjs/server";
import { createProcessSchema } from "@/entities/process";
import type { CreateProcessInput } from "@/entities/process";

export async function createProcess(input: CreateProcessInput) {
  try {
    const { orgId } = await auth();
    if (!orgId) return { data: null, error: "Organização não selecionada" };

    const parsed = createProcessSchema.safeParse(input);
    if (!parsed.success) {
      return { data: null, error: parsed.error.issues[0].message };
    }

    const supabase = await createSupabaseServerClient();

    // Buscar tenant_id
    const { data: tenant } = await supabase
      .from("tenants")
      .select("id")
      .eq("clerk_org_id", orgId)
      .single();

    if (!tenant) return { data: null, error: "Tenant não encontrado" };

    // Inserir processo
    const { data, error } = await supabase
      .from("processes")
      .insert({
        ...parsed.data,
        tenant_id: tenant.id,
      })
      .select()
      .single();

    if (error) {
      console.error("[createProcess]", error);
      return { data: null, error: error.message };
    }

    return { data, error: null };
  } catch (err) {
    console.error("[createProcess] Unexpected:", err);
    return { data: null, error: "Erro inesperado ao criar processo" };
  }
}
