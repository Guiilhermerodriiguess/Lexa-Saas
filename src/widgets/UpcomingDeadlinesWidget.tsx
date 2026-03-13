"use client";

import React from "react";
import { useDeadlines } from "@/features/deadline-management/api/useDeadlines";
import { DeadlineItem } from "@/entities/deadline/ui/DeadlineItem";
import { AlertCircle } from "lucide-react";

export function UpcomingDeadlinesWidget() {
    const { upcoming, isLoadingUpcoming } = useDeadlines();

    if (isLoadingUpcoming) return <div className="animate-pulse bg-white/5 h-64 rounded-2xl" />;

    return (
        <div className="flex flex-col gap-4 p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    Prazos Fatais
                    {upcoming && upcoming.length > 0 && (
                        <span className="flex h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                    )}
                </h3>
                <button className="text-xs text-emerald-500 hover:underline">Ver Agenda</button>
            </div>

            <div className="flex flex-col gap-3">
                {upcoming?.length === 0 ? (
                    <div className="flex flex-col items-center gap-2 py-8 text-center">
                        <AlertCircle className="text-zinc-600 h-8 w-8" />
                        <p className="text-sm text-zinc-500">Nenhum prazo urgente pendente.</p>
                    </div>
                ) : (
                    upcoming?.map((deadline) => (
                        <DeadlineItem key={deadline.id} deadline={deadline as any} />
                    ))
                )}
            </div>
        </div>
    );
}
