import { createTRPCRouter, tenantProcedure } from "../trpc";
import { CreateDocumentSchema, DocumentCategorySchema } from "@/entities/document/model/schema";
import { z } from "zod";
import { db } from "../db/client";
import { TRPCError } from "@trpc/server";

export const documentRouter = createTRPCRouter({
    /**
     * Listar documentos (geral ou por processo)
     */
    list: tenantProcedure
        .input(z.object({
            processId: z.string().uuid().optional().nullable()
        }).optional())
        .query(async ({ ctx, input }) => {
            let query = db
                .from("documents")
                .select("*")
                .eq("tenant_id", ctx.tenantId);

            if (input?.processId) {
                query = query.eq("process_id", input.processId);
            }

            const { data, error } = await query.order("created_at", { ascending: false });

            if (error) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: error.message });
            return data;
        }),

    /**
     * Registrar novo documento (após upload no storage)
     */
    create: tenantProcedure
        .input(CreateDocumentSchema)
        .mutation(async ({ ctx, input }) => {
            const { data, error } = await db
                .from("documents")
                .insert({
                    ...input,
                    tenant_id: ctx.tenantId,
                })
                .select()
                .single();

            if (error) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: error.message });
            return data;
        }),

    /**
     * Listar Templates de Documentos
     */
    listTemplates: tenantProcedure.query(async ({ ctx }) => {
        const { data, error } = await db
            .from("document_templates")
            .select("*")
            .eq("tenant_id", ctx.tenantId)
            .order("title", { ascending: true });

        if (error) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: error.message });
        return data;
    }),
});
