"use client";

import React from "react";
import { Search, Filter, Calendar } from "lucide-react";

interface TransactionFiltersProps {
    onTypeChange: (type: 'INCOME' | 'EXPENSE' | 'ALL') => void;
    onDateChange: (start: string, end: string) => void;
}

export function TransactionFilters({ onTypeChange, onDateChange }: TransactionFiltersProps) {
    return (
        <div className="flex flex-col md:flex-row items-center gap-4 py-4 px-6 bg-white/[0.02] border-y border-white/5">
            <div className="flex-1 w-full relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
                <input
                    placeholder="Filtrar por título ou categoria..."
                    className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#C5A55A]/50 transition-all"
                />
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto">
                <select
                    onChange={(e) => onTypeChange(e.target.value as any)}
                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-[#C5A55A]/50 transition-all font-medium"
                >
                    <option value="ALL">Todos os Tipos</option>
                    <option value="INCOME">Receitas</option>
                    <option value="EXPENSE">Despesas</option>
                </select>

                <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-zinc-400">
                    <Calendar size={14} className="text-zinc-600" />
                    <span>Este Mês</span>
                </div>

                <button className="p-2 bg-white/5 border border-white/10 rounded-xl text-zinc-400 hover:text-white transition-all">
                    <Filter size={16} />
                </button>
            </div>
        </div>
    );
}
