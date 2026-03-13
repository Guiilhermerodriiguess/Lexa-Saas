"use client";

import React from "react";
import { useClients } from "@/features/client-management/api/useClients";
import { ClientCard } from "@/entities/client/ui/ClientCard";

export function ClientSummaryWidget() {
    const { clients, isLoading } = useClients();

    if (isLoading) return <div className="animate-pulse bg-white/5 h-48 rounded-2xl" />;

    return (
        <div className="flex flex-col gap-4 p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white">Clientes Recentes</h3>
                <button className="text-xs text-emerald-500 hover:underline">Novo Cliente</button>
            </div>

            <div className="grid grid-cols-1 gap-3">
                {clients?.length === 0 ? (
                    <p className="text-sm text-zinc-500 py-4 text-center">Nenhum cliente cadastrado.</p>
                ) : (
                    clients?.slice(0, 3).map((client) => (
                        <ClientCard key={client.id} client={client as any} />
                    ))
                )}
            </div>
        </div>
    );
}
