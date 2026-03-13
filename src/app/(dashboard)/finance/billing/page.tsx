import { CreditCard, Plus, MoreVertical, FileText } from "lucide-react";
import { cn } from "@/shared/lib/utils";

const mockInvoices = [
  { number: "NF-001", client: "João Silva", value: "R$ 15.000", status: "Emitida", issuedAt: "10/03/2026" },
  { number: "NF-002", client: "Tech Solutions", value: "R$ 25.000", status: "Emitida", issuedAt: "05/03/2026" },
  { number: "NF-003", client: "Maria Oliveira", value: "R$ 8.500", status: "Rascunho", issuedAt: "—" },
];

const statusColors: Record<string, string> = {
  Emitida: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  Rascunho: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  Cancelada: "bg-red-500/10 text-red-600 dark:text-red-400",
};

export default function BillingPage() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Faturamento</h1>
          <p className="text-sm text-muted-foreground">Notas fiscais e faturamento do escritório.</p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-xl bg-[#C5A55A] px-4 py-2.5 text-sm font-semibold text-[#0C1220] shadow-sm hover:bg-[#D4BA7A] active:scale-[0.98]">
          <Plus className="h-4 w-4" /> Nova Fatura
        </button>
      </div>
      <div className="rounded-2xl border border-border/40 bg-card overflow-hidden">
        {mockInvoices.map((inv, idx) => (
          <div key={inv.number} className={cn("flex items-center justify-between p-4 hover:bg-accent/30 transition-colors", idx < mockInvoices.length - 1 && "border-b border-border/30")}>
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5 text-teal-500" />
              <div>
                <p className="text-sm font-semibold">{inv.number} — {inv.client}</p>
                <p className="text-xs text-muted-foreground">Emitida em: {inv.issuedAt}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold">{inv.value}</span>
              <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-bold uppercase", statusColors[inv.status])}>{inv.status}</span>
              <MoreVertical className="h-4 w-4 text-muted-foreground/40" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
