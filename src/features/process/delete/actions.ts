"use server";

import { createSupabaseServerClient } from "@/shared/api/supabase/server";

export async function deleteProcess(id: string) {
  try {
    const supabase = await createSupabaseServerClient();

    const { error } = await supabase
      .from("processes")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("[deleteProcess]", error);
      return { success: false, error: error.message };
    }

    return { success: true, error: null };
  } catch (err) {
    console.error("[deleteProcess] Unexpected:", err);
    return { success: false, error: "Erro inesperado ao deletar processo" };
  }
}
