import { FileText, Plus, MoreVertical } from "lucide-react";
import { cn } from "@/shared/lib/utils";

const mockContracts = [
  { name: "Contrato de Honorários — Oliveira & Assoc.", value: "R$ 15.000/mês", status: "Ativo", expiresAt: "31/12/2026" },
  { name: "Contrato de Prestação — Tech Solutions", value: "R$ 8.500/mês", status: "Ativo", expiresAt: "30/06/2026" },
  { name: "Contrato Parceria — Escritório López", value: "R$ 25.000", status: "Pendente", expiresAt: "—" },
];

const statusColors: Record<string, string> = {
  Ativo: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  Pendente: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  Vencido: "bg-red-500/10 text-red-600 dark:text-red-400",
};

export default function ContractsPage() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Contratos</h1>
          <p className="text-sm text-muted-foreground">Gestão de contratos e termos jurídicos.</p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-xl bg-[#C5A55A] px-4 py-2.5 text-sm font-semibold text-[#0C1220] shadow-sm transition-all hover:bg-[#D4BA7A] active:scale-[0.98]">
          <Plus className="h-4 w-4" />
          Novo Contrato
        </button>
      </div>

      <div className="rounded-2xl border border-border/40 bg-card overflow-hidden">
        {mockContracts.map((c, idx) => (
          <div key={c.name} className={cn("flex items-center justify-between p-4 hover:bg-accent/30 transition-colors cursor-pointer", idx < mockContracts.length - 1 && "border-b border-border/30")}>
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5 text-violet-500" />
              <div>
                <p className="text-sm font-semibold">{c.name}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xs font-mono text-[#C5A55A]">{c.value}</span>
                  <span className={cn("inline-flex rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide", statusColors[c.status])}>{c.status}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground hidden sm:inline">Vence: {c.expiresAt}</span>
              <MoreVertical className="h-4 w-4 text-muted-foreground/40" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
