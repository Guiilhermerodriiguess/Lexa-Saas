"use client";

import React from "react";
import { trpc } from "@/trpc/client";
import {
    BarChart3,
    TrendingUp,
    Target,
    Zap,
    Clock,
    ArrowUpRight,
    DollarSign,
    PieChart
} from "lucide-react";
import { cn } from "@/shared/lib/utils";

export default function AnalyticsPage() {
    const { data: mainStats, isLoading: isLoadingStats } = trpc.analytics.getMainStats.useQuery();
    const { data: evolution, isLoading: isLoadingEvo } = trpc.analytics.getFinancialEvolution.useQuery();

    const formatCurrency = (val: number) =>
        new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <header className="flex flex-col gap-1">
                <h1 className="text-3xl font-bold tracking-tight text-white">Business Intelligence</h1>
                <p className="text-sm text-zinc-400 font-medium">Insights estratégicos e performance do seu escritório.</p>
            </header>

            {/* KPI Cards */}
            <section className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                {[
                    { label: "ROI Médio / Processo", value: formatCurrency(mainStats?.roiPerCase || 0), icon: DollarSign, color: "text-emerald-500" },
                    { label: "Tempo Médio (Meses)", value: mainStats?.averageCaseResolutionTime || 0, icon: Clock, color: "text-[#C5A55A]" },
                    { label: "Retenção de Clientes", value: `${((mainStats?.clientRetentionRate || 0) * 100).toFixed(0)}%`, icon: Target, color: "text-blue-500" },
                    { label: "Crescimento Mensal", value: `+${mainStats?.activeProcessGrowth || 0}%`, icon: Zap, color: "text-purple-500" },
                ].map((kpi, i) => (
                    <div key={i} className="p-6 rounded-2xl border border-white/10 bg-white/[0.03] group hover:bg-white/[0.05] transition-all">
                        <div className="flex items-center justify-between mb-4">
                            <div className={cn("p-2 rounded-xl bg-white/5", kpi.color)}>
                                <kpi.icon size={18} />
                            </div>
                            <ArrowUpRight size={14} className="text-zinc-600" />
                        </div>
                        <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{kpi.label}</p>
                        <h3 className="text-2xl font-black text-white mt-1">{isLoadingStats ? "..." : kpi.value}</h3>
                    </div>
                ))}
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Gráfico de Evolução Financeira (Placeholder Visual) */}
                <div className="p-8 rounded-3xl border border-white/10 bg-white/[0.02] space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <BarChart3 className="text-[#C5A55A]" size={20} />
                            <h3 className="font-bold text-white uppercase tracking-tighter">Evolução de Fluxo de Caixa</h3>
                        </div>
                        <div className="flex gap-2">
                            <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[#C5A55A]" /><span className="text-[10px] text-zinc-500">Receitas</span></div>
                            <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-zinc-700" /><span className="text-[10px] text-zinc-500">Despesas</span></div>
                        </div>
                    </div>

                    <div className="h-64 flex items-end gap-2 px-2">
                        {isLoadingEvo ? (
                            <div className="w-full h-full animate-pulse bg-white/5 rounded-xl" />
                        ) : (
                            evolution?.map((month: any, i) => (
                                <div key={i} className="group relative flex-1 flex flex-col items-center gap-2">
                                    <div className="w-full flex items-end gap-1 h-48">
                                        <div
                                            className="flex-1 bg-[#C5A55A]/40 group-hover:bg-[#C5A55A] transition-all rounded-t-sm"
                                            style={{ height: `${Math.min(100, (month.income / 10000) * 100)}%` }}
                                        />
                                        <div
                                            className="flex-1 bg-zinc-800 group-hover:bg-zinc-700 transition-all rounded-t-sm"
                                            style={{ height: `${Math.min(100, (month.expense / 10000) * 100)}%` }}
                                        />
                                    </div>
                                    <span className="text-[10px] font-bold text-zinc-600 group-hover:text-white uppercase transition-colors">{month.month}</span>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Distribuição de Honorários (Simulado) */}
                <div className="p-8 rounded-3xl border border-white/10 bg-white/[0.02] space-y-6">
                    <div className="flex items-center gap-2">
                        <PieChart className="text-[#C5A55A]" size={20} />
                        <h3 className="font-bold text-white uppercase tracking-tighter">Faturamento por Área</h3>
                    </div>

                    <div className="space-y-4 pt-4">
                        {[
                            { area: "Cível", percent: 45, color: "bg-[#C5A55A]" },
                            { area: "Trabalhista", percent: 30, color: "bg-emerald-500" },
                            { area: "Previdenciário", percent: 15, color: "bg-blue-500" },
                            { area: "Outros", percent: 10, color: "bg-zinc-700" },
                        ].map((row, i) => (
                            <div key={i} className="space-y-1.5">
                                <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest">
                                    <span className="text-zinc-400">{row.area}</span>
                                    <span className="text-white">{row.percent}%</span>
                                </div>
                                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                    <div className={cn("h-full transition-all duration-1000", row.color)} style={{ width: `${row.percent}%` }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
