"use client";

import React from "react";
import { trpc } from "@/trpc/client";
import { Target, TrendingUp, Flag } from "lucide-react";
import { cn } from "@/shared/lib/utils";

export function BIMetricsWidget() {
    const { data: summary } = trpc.financial.getSummary.useQuery();

    // Metas fictícias para o BI
    const goal = 50000; // Meta de faturamento mensal fixada para o SAAS
    const currentProgress = (summary?.income || 0) / goal;
    const percentStr = `${Math.min(100, Math.round(currentProgress * 100))}%`;

    return (
        <section className="p-6 rounded-2xl border border-white/10 bg-white/[0.03] flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-[#C5A55A]/10 text-[#C5A55A]">
                        <Target size={16} />
                    </div>
                    <h3 className="text-sm font-bold text-white uppercase tracking-tighter">Meta do Escritório</h3>
                </div>
                <span className="text-[10px] font-black text-[#C5A55A] bg-[#C5A55A]/10 px-2 py-0.5 rounded italic">
                    {percentStr}
                </span>
            </div>

            <div className="space-y-3">
                <div className="flex items-end justify-between">
                    <div>
                        <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Faturamento Real</p>
                        <h4 className="text-lg font-black text-white">
                            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(summary?.income || 0)}
                        </h4>
                    </div>
                    <TrendingUp size={16} className="text-[#C5A55A] mb-1" />
                </div>

                {/* Progress Bar Premium */}
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden group">
                    <div
                        className="h-full bg-gradient-to-r from-[#C5A55A] to-[#b0944f] transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(197,165,90,0.5)]"
                        style={{ width: percentStr }}
                    />
                </div>

                <div className="flex items-center justify-between text-[9px] font-bold text-zinc-600 uppercase tracking-widest">
                    <div className="flex items-center gap-1">
                        <Flag size={10} />
                        <span>R$ 0</span>
                    </div>
                    <span>Meta: R$ 50k</span>
                </div>
            </div>
        </section>
    );
}
