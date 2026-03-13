"use client";

import React from "react";
import { useProcesses } from "@/features/process-management/api/useProcesses";
import { ProcessStatusBadge } from "@/entities/process/ui/ProcessStatusBadge";
import { ProcessViewSheet } from "@/features/process/ui/ProcessViewSheet";
import { cn } from "@/shared/lib/utils";

export function RecentProcessesWidget() {
    const { processes, isLoading } = useProcesses();
    const [selectedProcess, setSelectedProcess] = React.useState<any>(null);

    if (isLoading) return <div className="animate-pulse bg-white/5 h-48 rounded-2xl" />;

    return (
        <>
            <div className="glass-card flex flex-col gap-4 p-6">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-display font-bold text-navy dark:text-white">Processos Recentes</h3>
                    <button className="text-[10px] font-bold uppercase tracking-widest text-[#C5A55A] hover:underline">Ver todos</button>
                </div>

                <div className="flex flex-col gap-3">
                    {processes?.length === 0 ? (
                        <p className="text-sm text-muted-foreground py-4 text-center">Nenhum processo encontrado.</p>
                    ) : (
                        processes?.slice(0, 5).map((process) => (
                            <div
                                key={process.id}
                                onClick={() => setSelectedProcess(process)}
                                className="group flex items-center justify-between p-3.5 rounded-xl hover:bg-navy/5 dark:hover:bg-white/5 transition-all cursor-pointer border border-transparent hover:border-gold/20"
                            >
                                <div className="flex flex-col gap-0.5">
                                    <span className="text-sm font-semibold text-navy dark:text-white group-hover:text-gold transition-colors">{process.title}</span>
                                    <span className="text-[10px] font-mono text-muted-foreground uppercase">{process.process_number || "Sem Número"}</span>
                                </div>
                                <ProcessStatusBadge status={process.status as any} />
                            </div>
                        ))
                    )}
                </div>
            </div>

            <ProcessViewSheet
                process={selectedProcess}
                isOpen={!!selectedProcess}
                onClose={() => setSelectedProcess(null)}
            />
        </>
    );
}
