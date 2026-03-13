"use client";

import React from "react";
import { useFinancial } from "@/features/financial-management/api/useFinancial";
import { TransactionItem } from "@/entities/transaction/ui/TransactionItem";
import { Wallet, TrendingUp, TrendingDown, ArrowRight } from "lucide-react";
import { cn } from "@/shared/lib/utils";

export function FinancialSummaryWidget() {
    const { summary, recentTransactions, isLoadingSummary, isLoadingRecent } = useFinancial();

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(value);
    };

    if (isLoadingSummary || isLoadingRecent) {
        return <div className="animate-pulse bg-white/5 h-[400px] rounded-2xl" />;
    }

    return (
        <div className="flex flex-col gap-6 p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    Fluxo de Caixa
                    <span className="text-[10px] font-normal text-zinc-500 uppercase tracking-widest pl-2">Mês Atual</span>
                </h3>
                <button className="text-xs text-[#C5A55A] hover:underline flex items-center gap-1">
                    Ver Financeiro <ArrowRight size={12} />
                </button>
            </div>

            {/* Mini Cards de Saldo */}
            <div className="grid grid-cols-2 gap-3">
                <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
                    <p className="text-[10px] uppercase font-bold text-emerald-500/70 tracking-tighter">Receitas</p>
                    <div className="flex items-center justify-between mt-1">
                        <span className="text-lg font-bold text-white">{formatCurrency(summary?.income || 0)}</span>
                        <TrendingUp size={16} className="text-emerald-500" />
                    </div>
                </div>
                <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/10">
                    <p className="text-[10px] uppercase font-bold text-red-500/70 tracking-tighter">Despesas</p>
                    <div className="flex items-center justify-between mt-1">
                        <span className="text-lg font-bold text-white">{formatCurrency(summary?.expense || 0)}</span>
                        <TrendingDown size={16} className="text-red-500" />
                    </div>
                </div>
            </div>

            {/* Saldo Total */}
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                <div>
                    <p className="text-[10px] uppercase font-bold text-zinc-500 tracking-tighter">Saldo Líquido</p>
                    <h4 className={cn(
                        "text-xl font-black mt-0.5",
                        (summary?.balance || 0) >= 0 ? "text-white" : "text-red-500"
                    )}>
                        {formatCurrency(summary?.balance || 0)}
                    </h4>
                </div>
                <Wallet size={24} className="text-[#C5A55A] opacity-50" />
            </div>

            {/* Últimos Lançamentos */}
            <div className="space-y-3">
                <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Últimos Lançamentos</h4>
                <div className="flex flex-col gap-2">
                    {recentTransactions?.length === 0 ? (
                        <p className="text-xs text-zinc-500 py-4 text-center italic">Nenhuma transação recente.</p>
                    ) : (
                        recentTransactions?.map((tx: any) => (
                            <TransactionItem key={tx.id} transaction={tx} />
                        ))
                    )}

                </div>
            </div>
        </div>
    );
}
