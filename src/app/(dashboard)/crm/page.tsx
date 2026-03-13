"use client";

import React from "react";
import { useClients } from "@/features/client-management/api/useClients";
import { Plus, Search, Mail, Phone, MoreHorizontal } from "lucide-react";
import Link from "next/link";

export default function CRMPage() {
  const { clients, isLoading } = useClients();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold tracking-tight text-white">Clientes</h1>
          <p className="text-sm text-zinc-400">Gerencie sua base de clientes e contatos.</p>
        </div>
        <Link href="/crm/new">
          <button className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-black text-sm font-bold rounded-xl transition-all">
            <Plus size={18} />
            Novo Cliente
          </button>
        </Link>
      </header>

      {/* Search */}
      <div className="relative group">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500 group-focus-within:text-emerald-500 transition-colors" />
        <input
          type="text"
          placeholder="Buscar clientes por nome, CPF ou e-mail..."
          className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-emerald-500/50 transition-all"
        />
      </div>

      {/* Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map(i => <div key={i} className="h-32 bg-white/5 rounded-2xl animate-pulse" />)}
        </div>
      ) : clients?.length === 0 ? (
        <div className="p-20 rounded-2xl border border-white/5 bg-white/[0.02] flex flex-col items-center gap-4">
          <p className="text-zinc-500">Nenhum cliente disponível para este escritório.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {clients?.map((client) => (
            <div key={client.id} className="group p-5 rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.05] transition-all hover:border-emerald-500/20">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <h3 className="font-bold text-white group-hover:text-emerald-400 transition-colors">{client.name}</h3>
                  <p className="text-xs text-zinc-500">{client.document_type}: {client.document_number}</p>
                </div>
                <button className="text-zinc-600 hover:text-white transition-colors">
                  <MoreHorizontal size={18} />
                </button>
              </div>

              <div className="mt-4 pt-4 border-t border-white/5 flex flex-col gap-2">
                <div className="flex items-center gap-2 text-xs text-zinc-400">
                  <Mail size={14} className="text-zinc-600" />
                  {client.email || "—"}
                </div>
                <div className="flex items-center gap-2 text-xs text-zinc-400">
                  <Phone size={14} className="text-zinc-600" />
                  {client.phone || "—"}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
