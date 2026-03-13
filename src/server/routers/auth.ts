import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { db } from "../db/client";

/**
 * AUTH ROUTER
 * Gerencia a sincronização de dados entre Clerk e o banco local (Supabase).
 */
export const authRouter = createTRPCRouter({
    /**
     * sync: Sincroniza o Tenant e o Perfil do usuário logado.
     * Deve ser chamado no primeiro carregamento do app após o login.
     */
    sync: publicProcedure.mutation(async () => {
        const session = await auth();
        const user = await currentUser();

        if (!session.userId || !user) {
            throw new TRPCError({
                code: "UNAUTHORIZED",
                message: "Usuário não autenticado no Clerk.",
            });
        }

        if (!session.orgId) {
            throw new TRPCError({
                code: "BAD_REQUEST",
                message: "O usuário deve estar em uma Organização (Escritório) para sincronizar.",
            });
        }

        const { orgId, orgSlug } = session;

        try {
            // 1. Garantir que o Tenant existe
            const { data: tenant, error: tenantError } = await db
                .from("tenants")
                .upsert({
                    id: orgId,
                    name: orgSlug ?? "Escritório", // orgName não está no hash do auth(), usamos slug ou padrão
                    slug: orgSlug ?? orgId,
                    updated_at: new Date().toISOString(),
                })
                .select()
                .single();

            if (tenantError) throw tenantError;

            // 2. Garantir que o Perfil do usuário existe e está vinculado ao Tenant
            const { data: profile, error: profileError } = await db
                .from("profiles")
                .upsert({
                    id: session.userId,
                    tenant_id: orgId,
                    full_name: `${user.firstName} ${user.lastName}`.trim(),
                    email: user.emailAddresses[0]?.emailAddress,
                    updated_at: new Date().toISOString(),
                })
                .select()
                .single();

            if (profileError) throw profileError;

            return {
                success: true,
                tenant,
                profile,
            };
        } catch (error) {
            console.error("❌ Erro na sincronização Clerk ↔ Supabase:", error);
            throw new TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: "Falha ao sincronizar dados do escritório.",
            });
        }
    }),
});
