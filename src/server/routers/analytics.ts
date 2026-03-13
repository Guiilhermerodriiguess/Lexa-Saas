import { createTRPCRouter, tenantProcedure } from "../trpc";
import { db } from "../db/client";
import { TRPCError } from "@trpc/server";

export const analyticsRouter = createTRPCRouter({
    /**
     * Resumo Financeiro Histórico (BI)
     */
    getFinancialEvolution: tenantProcedure.query(async ({ ctx }) => {
        // Busca transações dos últimos 6 meses
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

        const { data, error } = await db
            .from("financial_transactions")
            .select("amount, type, date")
            .eq("tenant_id", ctx.tenantId)
            .gte("date", sixMonthsAgo.toISOString())
            .order("date", { ascending: true });

        if (error) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: error.message });

        // Agregação por mês (simples para o BI)
        const evolution = data.reduce((acc: any, curr) => {
            const month = new Date(curr.date).toLocaleDateString('pt-BR', { month: 'short', year: '2-digit' });
            if (!acc[month]) acc[month] = { month, income: 0, expense: 0 };

            if (curr.type === 'INCOME') acc[month].income += Number(curr.amount);
            else acc[month].expense += Number(curr.amount);

            return acc;
        }, {});

        return Object.values(evolution);
    }),

    /**
     * KPIs de Desempenho
     */
    getMainStats: tenantProcedure.query(async ({ ctx }) => {
        // Simula cálculo de ROI e Tempo Médio
        // Em produção, isso viria de agregações SQL complexas
        return {
            averageCaseResolutionTime: 14, // meses
            roiPerCase: 2450.50, // média de honorários líquidos
            clientRetentionRate: 0.88,
            activeProcessGrowth: 12.5, // %
        };
    }),
});
