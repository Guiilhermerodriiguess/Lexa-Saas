import type { Tables, TablesInsert, TablesUpdate } from "@/shared/api/supabase";

/** Profile completo (Row) vindo do banco */
export type Profile = Tables<"profiles">;

/** Dados para criar um novo profile */
export type ProfileInsert = TablesInsert<"profiles">;

/** Dados para atualizar um profile */
export type ProfileUpdate = TablesUpdate<"profiles">;

/** Roles de usuário dentro de um tenant */
export type ProfileRole = "owner" | "admin" | "member" | "viewer";
