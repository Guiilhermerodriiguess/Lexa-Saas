import React from "react";
import { type ProcessStatusSchema } from "../model/schema";
import { z } from "zod";

type ProcessStatus = z.infer<typeof ProcessStatusSchema>;

const statusMap: Record<ProcessStatus, { label: string; className: string }> = {
    ACTIVE: { label: "Ativo", className: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" },
    SUSPENDED: { label: "Suspenso", className: "bg-amber-500/10 text-amber-500 border-amber-500/20" },
    ARCHIVED: { label: "Arquivado", className: "bg-zinc-500/10 text-zinc-500 border-zinc-500/20" },
    COMPLETED: { label: "Concluído", className: "bg-blue-500/10 text-blue-500 border-blue-500/20" },
};

export function ProcessStatusBadge({ status }: { status: ProcessStatus }) {
    const config = statusMap[status] || statusMap.ACTIVE;

    return (
        <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors ${config.className}`}>
            {config.label}
        </span>
    );
}
