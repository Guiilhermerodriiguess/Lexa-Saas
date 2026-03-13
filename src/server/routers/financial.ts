import { createTRPCRouter, tenantProcedure } from "../trpc";
import { CreateTransactionSchema, TransactionStatusSchema } from "@/entities/transaction/model/schema";
import { z } from "zod";
import { db } from "../db/client";
import { TRPCError } from "@trpc/server";

export const financialRouter = createTRPCRouter({
    /**
     * Resumo de Saldo (Dashboard)
     */
    getSummary: tenantProcedure.query(async ({ ctx }) => {
        // Buscar total de receitas e despesas PAGAS no mês atual
        const now = new Date();
        const firstDay = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
        const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString();

        const { data: transactions, error } = await db
            .from("financial_transactions")
            .select("amount, type, status")
            .eq("tenant_id", ctx.tenantId)
            .eq("status", "PAID")
            .gte("payment_date", firstDay)
            .lte("payment_date", lastDay);

        if (error) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: error.message });

        const summary = transactions.reduce(
            (acc, curr) => {
                if (curr.type === "INCOME") acc.income += Number(curr.amount);
                else acc.expense += Number(curr.amount);
                return acc;
            },
            { income: 0, expense: 0 }
        );

        return {
            ...summary,
            balance: summary.income - summary.expense,
        };
    }),

    /**
     * Listar Transações
     */
    list: tenantProcedure
        .input(z.object({
            limit: z.number().optional().default(10),
            type: z.enum(['INCOME', 'EXPENSE']).optional(),
        }))
        .query(async ({ ctx, input }) => {
            let query = db
                .from("financial_transactions")
                .select("*, processes(title)")
                .eq("tenant_id", ctx.tenantId);

            if (input.type) query = query.eq("type", input.type);

            const { data, error } = await query
                .order("due_date", { ascending: false })
                .limit(input.limit);

            if (error) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: error.message });
            return data;
        }),

    /**
     * Criar Transação
     */
    create: tenantProcedure
        .input(CreateTransactionSchema)
        .mutation(async ({ ctx, input }) => {
            const { data, error } = await db
                .from("financial_transactions")
                .insert({
                    ...input,
                    tenant_id: ctx.tenantId,
                    due_date: new Date(input.dueDate).toISOString().split('T')[0],
                    payment_date: input.paymentDate ? new Date(input.paymentDate).toISOString().split('T')[0] : null,
                })
                .select()
                .single();

            if (error) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: error.message });
            return data;
        }),
});
