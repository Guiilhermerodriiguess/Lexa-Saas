"use client";

import React from "react";
import { useProcesses } from "@/features/process-management/api/useProcesses";
import { ProcessStatusBadge } from "@/entities/process/ui/ProcessStatusBadge";
import { Plus, Search, Filter } from "lucide-react";
import Link from "next/link";

export default function ProcessesPage() {
  const { processes, isLoading } = useProcesses();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold tracking-tight text-white">Processos</h1>
          <p className="text-sm text-zinc-400">Gerencie todos os seus casos e movimentações jurídicas.</p>
        </div>
        <Link href="/processes/new">
          <button className="flex items-center gap-2 px-4 py-2 bg-[#C5A55A] hover:bg-[#b0944f] text-black text-sm font-bold rounded-xl transition-all">
            <Plus size={18} />
            Cadastrar Processo
          </button>
        </Link>
      </header>

      {/* Filters & Search */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1 group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500 group-focus-within:text-[#C5A55A] transition-colors" />
          <input
            type="text"
            placeholder="Buscar por número, título ou cliente..."
            className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-[#C5A55A]/50 transition-all"
          />
        </div>
        <button className="p-2 bg-white/5 border border-white/10 rounded-xl text-zinc-400 hover:text-white transition-colors">
          <Filter size={20} />
        </button>
      </div>

      {/* Table/List */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden">
        {isLoading ? (
          <div className="p-12 space-y-4">
            {[1, 2, 3].map(i => <div key={i} className="h-16 bg-white/5 rounded-xl animate-pulse" />)}
          </div>
        ) : processes?.length === 0 ? (
          <div className="p-20 flex flex-col items-center gap-4">
            <div className="p-4 rounded-full bg-white/5">
              <Plus className="h-8 w-8 text-zinc-600" />
            </div>
            <p className="text-zinc-500">Nenhum processo cadastrado neste escritório.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-white/10 text-zinc-500 font-medium">
                  <th className="px-6 py-4">Processo / Título</th>
                  <th className="px-6 py-4">Cliente</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Tribunal</th>
                  <th className="px-6 py-4 text-right">Ação</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {processes?.map((process) => (
                  <tr key={process.id} className="hover:bg-white/5 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-semibold text-white group-hover:text-[#C5A55A] transition-colors">{process.title}</span>
                        <span className="text-xs text-zinc-500">{process.process_number}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-zinc-300">
                      {(process as any).clients?.name || "N/A"}
                    </td>
                    <td className="px-6 py-4">
                      <ProcessStatusBadge status={process.status as any} />
                    </td>
                    <td className="px-6 py-4 text-zinc-400">
                      {process.court || "—"}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-zinc-500 hover:text-white transition-colors">Config</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
