import { createTRPCRouter, tenantProcedure } from "../trpc";
import { z } from "zod";
import { db } from "../db/client";
import { TRPCError } from "@trpc/server";

export const arunaRouter = createTRPCRouter({
    /**
     * Busca Semântica Assistida
     * Recebe um vetor (gerado no cliente ou via Edge Function) e retorna processos similares
     */
    semanticSearch: tenantProcedure
        .input(z.object({
            embedding: z.array(z.number()),
            threshold: z.number().optional().default(0.5),
            limit: z.number().optional().default(5),
        }))
        .query(async ({ ctx, input }) => {
            // Chama a função RPC match_processes definida na migration
            const { data, error } = await db.rpc('match_processes', {
                query_embedding: input.embedding,
                match_threshold: input.threshold,
                match_count: input.limit,
                p_tenant_id: ctx.tenantId,
            });

            if (error) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: error.message });
            return data;
        }),

    /**
     * Gerar Resumo de Processo (Mock / Placeholder para Edge Function)
     */
    getProcessSummary: tenantProcedure
        .input(z.object({ processId: z.string().uuid() }))
        .query(async ({ ctx, input }) => {
            // Aqui chamaríamos uma Edge Function que consome a API da OpenAI/Google
            // Por enquanto, simulamos a lógica de metadados
            const { data: process, error } = await db
                .from("processes")
                .select("title, description, status")
                .eq("id", input.processId)
                .eq("tenant_id", ctx.tenantId)
                .single();

            if (error || !process) throw new TRPCError({ code: "NOT_FOUND", message: "Processo não encontrado" });

            return {
                summary: `A Aruna analisou o processo "${process.title}". Atualmente está com status ${process.status}. A descrição indica se tratar de: ${process.description || "Nenhuma descrição detalhada disponível"}.`,
                aiConfidence: 0.95,
                timestamp: new Date().toISOString(),
            };
        }),
});
