import { createTRPCRouter, tenantProcedure } from "../trpc";
import { CreateProcessSchema } from "@/entities/process/model/schema";
import { z } from "zod";
import { db } from "../db/client";
import { TRPCError } from "@trpc/server";

export const processRouter = createTRPCRouter({
    list: tenantProcedure
        .input(z.object({
            page: z.number().min(1).default(1),
            pageSize: z.number().min(1).max(200).default(15),
            search: z.string().optional(),
            statusFilter: z.string().default("all"),
            sortField: z.string().default("created_at"),
            sortDir: z.enum(["asc", "desc"]).default("desc"),
            viewMode: z.enum(["table", "kanban"]).default("table")
        }))
        .query(async ({ ctx, input }) => {
            let query = db
                .from("processes")
                .select("*, clients(id, name, phone, asaas_customer_id)", { count: "exact" })
                .eq("tenant_id", ctx.tenantId);

            if (input.statusFilter !== "all") {
                query = query.eq("status", input.statusFilter);
            }

            if (input.search) {
                query = query.or(`title.ilike.%${input.search}%,process_number.ilike.%${input.search}%,court.ilike.%${input.search}%,subject.ilike.%${input.search}%`);
            }

            query = query.order(input.sortField, { ascending: input.sortDir === "asc" });

            if (input.viewMode === "table") {
                const from = (input.page - 1) * input.pageSize;
                const to = from + input.pageSize - 1;
                query = query.range(from, to);
            } else {
                query = query.limit(200); // Kanban mode loads more items
            }

            const { data, error, count } = await query;
            if (error) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: error.message });

            return { data, count: count ?? 0 };
        }),

    getBiCounts: tenantProcedure.query(async ({ ctx }) => {
        const [{ count: total }, { count: ativos }, { count: suspensos }] = await Promise.all([
            db.from("processes").select("*", { count: "exact", head: true }).eq("tenant_id", ctx.tenantId),
            db.from("processes").select("*", { count: "exact", head: true }).eq("tenant_id", ctx.tenantId).eq("status", "ACTIVE"),
            db.from("processes").select("*", { count: "exact", head: true }).eq("tenant_id", ctx.tenantId).eq("status", "SUSPENDED")
        ]);

        return {
            total: total ?? 0,
            ativos: ativos ?? 0,
            suspensos: suspensos ?? 0
        };
    }),

    create: tenantProcedure
        .input(z.any()) // Using any temporarily as we will override schema from components
        .mutation(async ({ ctx, input }) => {
            const { data, error } = await db
                .from("processes")
                .insert({
                    ...input,
                    tenant_id: ctx.tenantId,
                    responsible_user_id: ctx.userId
                })
                .select()
                .single();

            if (error) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: error.message });
            return data;
        }),

    update: tenantProcedure
        .input(z.object({
            id: z.string().uuid(),
            payload: z.any() // dynamic payload
        }))
        .mutation(async ({ ctx, input }) => {
            const updatePayload = { ...input.payload };
            delete updatePayload.tenant_id;
            delete updatePayload.created_at;
            delete updatePayload.responsible_user_id;
            delete updatePayload.clients;

            const { data, error } = await db
                .from("processes")
                .update(updatePayload)
                .eq("id", input.id)
                .eq("tenant_id", ctx.tenantId)
                .select()
                .single();

            if (error) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: error.message });
            return data;
        }),

    delete: tenantProcedure
        .input(z.object({ id: z.string().uuid() }))
        .mutation(async ({ ctx, input }) => {
            const { error } = await db
                .from("processes")
                .delete()
                .eq("id", input.id)
                .eq("tenant_id", ctx.tenantId);

            if (error) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: error.message });
            return { success: true };
        }),

    getById: tenantProcedure
        .input(z.object({ id: z.string().uuid() }))
        .query(async ({ ctx, input }) => {
            const { data, error } = await db
                .from("processes")
                .select("*, clients(*), process_events(*)")
                .eq("id", input.id)
                .eq("tenant_id", ctx.tenantId)
                .single();

            if (error) throw new TRPCError({ code: "NOT_FOUND", message: "Processo não encontrado" });
            return data;
        }),
});
