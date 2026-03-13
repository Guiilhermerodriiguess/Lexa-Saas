import React from "react";
import { type Client } from "../model/schema";

export function ClientCard({ client }: { client: Client }) {
    return (
        <div className="flex flex-col gap-1 p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all cursor-pointer">
            <span className="text-sm font-bold text-white">{client.name}</span>
            <span className="text-xs text-zinc-400">
                {client.documentType}: {client.documentNumber}
            </span>
            {client.email && (
                <span className="text-xs text-zinc-500 truncate">{client.email}</span>
            )}
        </div>
    );
}
