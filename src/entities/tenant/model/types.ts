import type { Tables, TablesInsert, TablesUpdate } from "@/shared/api/supabase";

/** Tenant completo (Row) vindo do banco */
export type Tenant = Tables<"tenants">;

/** Dados para criar um novo tenant */
export type TenantInsert = TablesInsert<"tenants">;

/** Dados para atualizar um tenant */
export type TenantUpdate = TablesUpdate<"tenants">;

/** Planos disponíveis */
export type TenantPlan = "free" | "starter" | "professional" | "enterprise";

/** Roles de organização */
export type TenantRole = "owner" | "admin" | "member" | "viewer";
