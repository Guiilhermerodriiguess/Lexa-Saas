import { createTRPCRouter, tenantProcedure } from "../trpc";
import { CreateClientSchema } from "@/entities/client/model/schema";
import { z } from "zod";
import { db } from "../db/client";
import { TRPCError } from "@trpc/server";

export const clientRouter = createTRPCRouter({
    list: tenantProcedure.query(async ({ ctx }) => {
        const { data, error } = await db
            .from("clients")
            .select("*")
            .eq("tenant_id", ctx.tenantId)
            .order("name", { ascending: true });

        if (error) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: error.message });
        return data;
    }),

    create: tenantProcedure
        .input(CreateClientSchema)
        .mutation(async ({ ctx, input }) => {
            const { data, error } = await db
                .from("clients")
                .insert({
                    ...input,
                    tenant_id: ctx.tenantId,
                })
                .select()
                .single();

            if (error) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: error.message });
            return data;
        }),

    getById: tenantProcedure
        .input(z.object({ id: z.string().uuid() }))
        .query(async ({ ctx, input }) => {
            const { data, error } = await db
                .from("clients")
                .select("*")
                .eq("id", input.id)
                .eq("tenant_id", ctx.tenantId)
                .single();

            if (error) throw new TRPCError({ code: "NOT_FOUND", message: "Cliente não encontrado" });
            return data;
        }),
});
