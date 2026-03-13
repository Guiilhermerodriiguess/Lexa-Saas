"use client";

import React, { useState } from "react";
import { useFinancial } from "@/features/financial-management/api/useFinancial";
import { TransactionRow } from "@/entities/transaction/ui/TransactionRow";
import { TransactionFilters } from "@/features/financial-management/ui/TransactionFilters";
import { Plus, Wallet, TrendingUp, TrendingDown, Download } from "lucide-react";
import { cn } from "@/shared/lib/utils";

export default function FinancialPage() {
    const [filterType, setFilterType] = useState<'INCOME' | 'EXPENSE' | 'ALL'>('ALL');
    const { summary, recentTransactions, isLoadingSummary, isLoadingRecent } = useFinancial();

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(value);
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex flex-col gap-1">
                    <h1 className="text-3xl font-bold tracking-tight text-white">Centro Financeiro</h1>
                    <p className="text-sm text-zinc-400">Gestão de fluxo de caixa, honorários e rentabilidade.</p>
                </div>
                <div className="flex items-center gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-white text-sm font-bold rounded-xl border border-white/10 transition-all">
                        <Download size={18} />
                        Exportar
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-black text-sm font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                        <Plus size={18} />
                        Nova Transação
                    </button>
                </div>
            </header>

            {/* Financial Overview Cards */}
            <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
                <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Saldo Líquido</span>
                        <Wallet className="text-[#C5A55A]" size={20} />
                    </div>
                    <h2 className={cn(
                        "text-3xl font-black mt-2",
                        (summary?.balance || 0) >= 0 ? "text-white" : "text-red-500"
                    )}>
                        {formatCurrency(summary?.balance || 0)}
                    </h2>
                </div>

                <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.03]">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-emerald-500 uppercase tracking-widest">Entradas</span>
                        <TrendingUp className="text-emerald-500" size={20} />
                    </div>
                    <h2 className="text-3xl font-black mt-2 text-white">
                        {formatCurrency(summary?.income || 0)}
                    </h2>
                </div>

                <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.03]">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-red-500 uppercase tracking-widest">Saídas</span>
                        <TrendingDown className="text-red-500" size={20} />
                    </div>
                    <h2 className="text-3xl font-black mt-2 text-white">
                        {formatCurrency(summary?.expense || 0)}
                    </h2>
                </div>
            </div>

            {/* Table Section */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden">
                <TransactionFilters
                    onTypeChange={(type) => setFilterType(type)}
                    onDateChange={() => { }}
                />

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-white/5 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                                <th className="py-3 pl-4">Transação</th>
                                <th className="py-3">Vencimento</th>
                                <th className="py-3">Processo</th>
                                <th className="py-3 text-right">Valor</th>
                                <th className="py-3 pr-4 text-right">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoadingRecent ? (
                                [1, 2, 3, 4, 5].map(i => (
                                    <tr key={i} className="animate-pulse border-b border-white/5">
                                        <td colSpan={5} className="py-8 bg-white/5"></td>
                                    </tr>
                                ))
                            ) : recentTransactions?.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="py-20 text-center text-zinc-500 text-sm">
                                        Nenhuma movimentação financeira encontrada.
                                    </td>
                                </tr>
                            ) : (
                                recentTransactions?.map((tx) => (
                                    <TransactionRow key={tx.id} transaction={tx as any} />
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
