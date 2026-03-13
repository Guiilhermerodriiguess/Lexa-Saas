import type { Tables, TablesInsert, TablesUpdate } from "@/shared/api/supabase";

/** Processo jurídico completo (Row) vindo do banco */
export type Process = Tables<"processes">;

/** Dados para criar um novo processo */
export type ProcessInsert = TablesInsert<"processes">;

/** Dados para atualizar um processo */
export type ProcessUpdate = TablesUpdate<"processes">;

/** Status possíveis de um processo */
export type ProcessStatus = "active" | "archived" | "closed" | "suspended";

/** Tipos de processo */
export type ProcessType = "judicial" | "administrative" | "consultation";
