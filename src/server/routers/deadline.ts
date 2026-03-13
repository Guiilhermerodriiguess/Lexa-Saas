import { createTRPCRouter, tenantProcedure } from "../trpc";
import { CreateDeadlineSchema, DeadlineStatusSchema } from "@/entities/deadline/model/schema";
import { z } from "zod";
import { db } from "../db/client";
import { TRPCError } from "@trpc/server";

export const deadlineRouter = createTRPCRouter({
    /**
     * Listar prazos por período (Agenda)
     */
    listByRange: tenantProcedure
        .input(z.object({
            start: z.string(),
            end: z.string()
        }))
        .query(async ({ ctx, input }) => {
            const { data, error } = await db
                .from("deadlines")
                .select("*, processes(title, process_number)")
                .eq("tenant_id", ctx.tenantId)
                .gte("deadline_date", input.start)
                .lte("deadline_date", input.end)
                .order("deadline_date", { ascending: true });

            if (error) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: error.message });
            return data;
        }),

    /**
     * Criar novo prazo/compromisso
     */
    create: tenantProcedure
        .input(CreateDeadlineSchema)
        .mutation(async ({ ctx, input }) => {
            const { data, error } = await db
                .from("deadlines")
                .insert({
                    ...input,
                    deadline_date: new Date(input.deadlineDate).toISOString(),
                    tenant_id: ctx.tenantId,
                })
                .select()
                .single();

            if (error) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: error.message });
            return data;
        }),

    /**
     * Atualizar status de um prazo (Concluir/Cancelar)
     */
    updateStatus: tenantProcedure
        .input(z.object({
            id: z.string().uuid(),
            status: DeadlineStatusSchema
        }))
        .mutation(async ({ ctx, input }) => {
            const { data, error } = await db
                .from("deadlines")
                .update({ status: input.status, updated_at: new Date().toISOString() })
                .eq("id", input.id)
                .eq("tenant_id", ctx.tenantId)
                .select()
                .single();

            if (error) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: error.message });
            return data;
        }),

    /**
     * Prazos Urgentes (Dashboard)
     */
    getUpcoming: tenantProcedure.query(async ({ ctx }) => {
        const today = new Date().toISOString();
        const { data, error } = await db
            .from("deadlines")
            .select("*, processes(title)")
            .eq("tenant_id", ctx.tenantId)
            .eq("status", "PENDING")
            .gte("deadline_date", today)
            .order("deadline_date", { ascending: true })
            .limit(5);

        if (error) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: error.message });
        return data;
    }),
});
