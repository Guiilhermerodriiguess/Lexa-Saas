import { createTRPCRouter, tenantProcedure } from "../trpc";
import { z } from "zod";
import { db } from "../db/client";
import { TRPCError } from "@trpc/server";

export const crawlerRouter = createTRPCRouter({
    /**
     * Sincronizar Processo com Tribunal
     */
    syncProcess: tenantProcedure
        .input(z.object({ processId: z.string().uuid() }))
        .mutation(async ({ ctx, input }) => {
            // 1. Simula delay do crawler externo
            await new Promise(resolve => setTimeout(resolve, 2000));

            // 2. Busca o processo
            const { data: process, error: pError } = await db
                .from("processes")
                .select("case_number")
                .eq("id", input.processId)
                .eq("tenant_id", ctx.tenantId)
                .single();

            if (pError || !process) throw new TRPCError({ code: "NOT_FOUND", message: "Processo não encontrado" });

            // 3. Simula a criação de um novo evento descoberto pelo crawler
            const { error: eError } = await db
                .from("process_events" as any)
                .insert({
                    process_id: input.processId,
                    tenant_id: ctx.tenantId,
                    description: `Movimentação automática detectada pelo Crawler no CNJ: Certidão de Publicação Expedida.`,
                    event_date: new Date().toISOString(),
                    type: 'AUTOMATIC'
                });

            if (eError) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Erro ao registrar evento automático" });

            return {
                success: true,
                message: `Sincronização concluída para o processo ${process.case_number}. 1 nova movimentação encontrada.`,
                syncTimestamp: new Date().toISOString()
            };
        }),
});
