import { Users, Plus, Search, Phone, Mail, MoreVertical } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import Link from "next/link";

const mockClients = [
  { name: "João Silva", email: "joao@email.com", phone: "(11) 99999-1234", processes: 3, status: "Ativo" },
  { name: "Maria Oliveira", email: "maria@empresa.com", phone: "(21) 98888-5678", processes: 7, status: "Ativo" },
  { name: "Tech Solutions LTDA", email: "juridico@tech.com", phone: "(11) 3333-0000", processes: 2, status: "Ativo" },
  { name: "Ana Costa", email: "ana.costa@mail.com", phone: "(31) 97777-4321", processes: 1, status: "Inativo" },
];

export default function CRMPage() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">CRM — Clientes</h1>
          <p className="text-sm text-muted-foreground">
            Gerencie a carteira de clientes do escritório.
          </p>
        </div>
        <Link
          href="/crm/new"
          className="inline-flex items-center gap-2 rounded-xl bg-[#C5A55A] px-4 py-2.5 text-sm font-semibold text-[#0C1220] shadow-sm transition-all hover:bg-[#D4BA7A] active:scale-[0.98]"
        >
          <Plus className="h-4 w-4" />
          Novo Cliente
        </Link>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input type="text" placeholder="Buscar clientes..." className="w-full rounded-xl border border-border/50 bg-background py-2.5 pl-10 pr-4 text-sm placeholder:text-muted-foreground/60 focus:border-[#C5A55A]/50 focus:outline-none focus:ring-2 focus:ring-[#C5A55A]/20 transition-all" />
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-border/40 bg-card p-5">
          <p className="text-xs font-medium text-muted-foreground">Total de Clientes</p>
          <h3 className="mt-1 text-2xl font-bold">{mockClients.length}</h3>
        </div>
        <div className="rounded-2xl border border-border/40 bg-card p-5">
          <p className="text-xs font-medium text-muted-foreground">Ativos</p>
          <h3 className="mt-1 text-2xl font-bold text-emerald-500">{mockClients.filter(c => c.status === "Ativo").length}</h3>
        </div>
        <div className="rounded-2xl border border-border/40 bg-card p-5">
          <p className="text-xs font-medium text-muted-foreground">Processos Vinculados</p>
          <h3 className="mt-1 text-2xl font-bold text-[#C5A55A]">{mockClients.reduce((sum, c) => sum + c.processes, 0)}</h3>
        </div>
      </div>

      {/* Client list */}
      <div className="rounded-2xl border border-border/40 bg-card overflow-hidden">
        {mockClients.map((client, idx) => (
          <div key={client.name} className={cn("flex items-center justify-between p-4 hover:bg-accent/30 transition-colors cursor-pointer", idx < mockClients.length - 1 && "border-b border-border/30")}>
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#C5A55A]/10 text-sm font-bold text-[#C5A55A]">
                {client.name.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-semibold">{client.name}</p>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Mail className="h-3 w-3" />{client.email}</span>
                  <span className="hidden sm:flex items-center gap-1"><Phone className="h-3 w-3" />{client.phone}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground">{client.processes} processos</span>
              <MoreVertical className="h-4 w-4 text-muted-foreground/40" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
