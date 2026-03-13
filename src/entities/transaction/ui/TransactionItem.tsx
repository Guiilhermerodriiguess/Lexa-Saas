import React from "react";
import { type FinancialTransaction } from "../model/schema";
import { TransactionBadge } from "./TransactionBadge";
import { ArrowUpRight, ArrowDownLeft, ReceiptText } from "lucide-react";
import { cn } from "@/shared/lib/utils";

export function TransactionItem({ transaction }: { transaction: FinancialTransaction }) {
    const isIncome = transaction.type === "INCOME";

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(value);
    };

    return (
        <div className="flex items-center justify-between p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all group">
            <div className="flex items-center gap-4">
                <div className={cn(
                    "p-2 rounded-lg transition-transform group-hover:scale-110",
                    isIncome ? "bg-emerald-500/10 text-emerald-500" : "bg-red-500/10 text-red-500"
                )}>
                    {isIncome ? <ArrowUpRight size={18} /> : <ArrowDownLeft size={18} />}
                </div>
                <div>
                    <h4 className="text-sm font-medium text-white group-hover:text-[#C5A55A] transition-colors">
                        {transaction.title}
                    </h4>
                    <p className="text-[10px] text-zinc-500 mt-0.5">
                        {transaction.type === "INCOME" ? "Receita" : "Despesa"} • {new Date(transaction.dueDate).toLocaleDateString('pt-BR')}
                    </p>
                </div>
            </div>

            <div className="flex flex-col items-end gap-1.5">
                <span className={cn(
                    "text-sm font-bold",
                    isIncome ? "text-emerald-500" : "text-white"
                )}>
                    {isIncome ? "+" : "-"} {formatCurrency(transaction.amount)}
                </span>
                <TransactionBadge status={transaction.status} dueDate={new Date(transaction.dueDate)} />
            </div>
        </div>
    );
}
