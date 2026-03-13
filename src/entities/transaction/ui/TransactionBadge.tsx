import React from "react";
import { type TransactionStatusSchema } from "../model/schema";
import { cn } from "@/shared/lib/utils";
import { z } from "zod";

type TransactionStatus = z.infer<typeof TransactionStatusSchema>;

const statusMap: Record<TransactionStatus, { label: string; className: string }> = {
    PAID: { label: "Pago", className: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" },
    PENDING: { label: "Pendente", className: "bg-amber-500/10 text-amber-500 border-amber-500/20" },
    CANCELED: { label: "Cancelado", className: "bg-zinc-500/10 text-zinc-500 border-zinc-500/20" },
    // OVERDUE será calculado dinamicamente ou virá do status se tivermos worker
};

export function TransactionBadge({ status, dueDate }: { status: TransactionStatus, dueDate: Date }) {
    const isOverdue = status === "PENDING" && new Date(dueDate) < new Date();
    const currentStatus = isOverdue ? { label: "Atrasado", className: "bg-red-500/10 text-red-500 border-red-500/20" } : statusMap[status];

    return (
        <span className={cn(
            "px-2 py-0.5 rounded-full text-[10px] font-bold border",
            currentStatus.className
        )}>
            {currentStatus.label}
        </span>
    );
}
