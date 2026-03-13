"use client";

import React from "react";
import { useDocuments } from "../api/useDocuments";
import { DocumentRow } from "@/entities/document/ui/DocumentRow";
import { FileUp, Search, Filter } from "lucide-react";

export function DocumentListWidget({ processId }: { processId?: string | null }) {
    const { documents, isLoading } = useDocuments(processId);

    if (isLoading) return <div className="animate-pulse bg-white/5 h-64 rounded-2xl" />;

    return (
        <div className="flex flex-col gap-6 p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white">Documentos e Anexos</h3>
                <div className="flex items-center gap-2">
                    <div className="relative">
                        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                        <input
                            placeholder="Buscar arquivo..."
                            className="pl-9 pr-4 py-1.5 text-xs bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#C5A55A]/50 transition-all"
                        />
                    </div>
                    <button className="flex items-center gap-2 px-3 py-1.5 bg-[#C5A55A] hover:bg-[#A38947] text-black text-xs font-bold rounded-lg transition-all">
                        <FileUp size={14} />
                        Upload
                    </button>
                </div>
            </div>

            <div className="flex flex-col gap-1">
                {documents?.length === 0 ? (
                    <div className="py-12 text-center text-zinc-500 text-sm">
                        Nenhum documento encontrado.
                    </div>
                ) : (
                    documents?.map((doc) => (
                        <DocumentRow key={doc.id} doc={doc as any} />
                    ))
                )}
            </div>
        </div>
    );
}
