import React from "react";
import { type FinancialTransaction } from "../model/schema";
import { TransactionBadge } from "./TransactionBadge";
import { ArrowUpRight, ArrowDownLeft, Calendar, FileText } from "lucide-react";
import { cn } from "@/shared/lib/utils";

export function TransactionRow({ transaction }: { transaction: any }) {
    const isIncome = transaction.type === "INCOME";

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(value);
    };

    return (
        <tr className="border-b border-white/5 hover:bg-white/[0.02] transition-all group">
            <td className="py-4 pl-4">
                <div className="flex items-center gap-3">
                    <div className={cn(
                        "p-2 rounded-lg",
                        isIncome ? "bg-emerald-500/10 text-emerald-500" : "bg-red-500/10 text-red-500"
                    )}>
                        {isIncome ? <ArrowUpRight size={16} /> : <ArrowDownLeft size={16} />}
                    </div>
                    <div>
                        <span className="text-sm font-medium text-white block group-hover:text-[#C5A55A] transition-colors">
                            {transaction.title}
                        </span>
                        <span className="text-[10px] text-zinc-500 uppercase tracking-tighter">
                            {transaction.financial_categories?.name || "Geral"}
                        </span>
                    </div>
                </div>
            </td>

            <td className="py-4">
                <div className="flex items-center gap-2 text-zinc-400">
                    <Calendar size={14} className="text-zinc-600" />
                    <span className="text-xs">{new Date(transaction.due_date).toLocaleDateString('pt-BR')}</span>
                </div>
            </td>

            <td className="py-4">
                <div className="flex items-center gap-2 text-zinc-400">
                    <FileText size={14} className="text-zinc-600" />
                    <span className="text-xs truncate max-w-[150px]">
                        {transaction.processes?.title || "Sem vínculo"}
                    </span>
                </div>
            </td>

            <td className="py-4 text-right">
                <span className={cn(
                    "text-sm font-bold",
                    isIncome ? "text-emerald-500" : "text-white"
                )}>
                    {isIncome ? "+" : "-"} {formatCurrency(transaction.amount)}
                </span>
            </td>

            <td className="py-4 pr-4 text-right">
                <TransactionBadge status={transaction.status} dueDate={new Date(transaction.due_date)} />
            </td>
        </tr>
    );
}
