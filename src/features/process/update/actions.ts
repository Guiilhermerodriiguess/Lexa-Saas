"use server";

import { createSupabaseServerClient } from "@/shared/api/supabase/server";
import { updateProcessSchema } from "@/entities/process";
import type { UpdateProcessInput } from "@/entities/process";

export async function updateProcess(id: string, input: UpdateProcessInput) {
  try {
    const parsed = updateProcessSchema.safeParse(input);
    if (!parsed.success) {
      return { data: null, error: parsed.error.issues[0].message };
    }

    const supabase = await createSupabaseServerClient();

    const { data, error } = await supabase
      .from("processes")
      .update(parsed.data)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("[updateProcess]", error);
      return { data: null, error: error.message };
    }

    return { data, error: null };
  } catch (err) {
    console.error("[updateProcess] Unexpected:", err);
    return { data: null, error: "Erro inesperado ao atualizar processo" };
  }
}
