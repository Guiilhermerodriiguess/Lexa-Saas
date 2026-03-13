import { createTRPCRouter, tenantProcedure } from "../trpc";
import { db } from "../db/client";
import { TRPCError } from "@trpc/server";

export const teamRouter = createTRPCRouter({
    /**
     * Listar Membros da Equipe
     */
    list: tenantProcedure.query(async ({ ctx }) => {
        const { data, error } = await db
            .from("profiles")
            .select("*")
            .eq("tenant_id", ctx.tenantId)
            .order("created_at", { ascending: true });

        if (error) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: error.message });
        return data;
    }),

    /**
     * Buscar Perfil do Usuário Atual
     */
    getMe: tenantProcedure.query(async ({ ctx }) => {
        const { data, error } = await db
            .from("profiles")
            .select("*")
            .eq("id", ctx.userId)
            .eq("tenant_id", ctx.tenantId)
            .single();

        if (error) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: error.message });
        return data;
    }),
});
