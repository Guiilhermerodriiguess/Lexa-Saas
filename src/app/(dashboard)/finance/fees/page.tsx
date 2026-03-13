import { Receipt, Plus, MoreVertical } from "lucide-react";
import { cn } from "@/shared/lib/utils";

const mockFees = [
  { client: "João Silva", process: "Ação Indenizatória", value: "R$ 15.000", status: "Pago", paidAt: "10/03/2026" },
  { client: "Maria Oliveira", process: "Defesa Trabalhista", value: "R$ 8.500", status: "Pendente", paidAt: "—" },
  { client: "Tech Solutions", process: "Consultoria", value: "R$ 25.000", status: "Pago", paidAt: "05/03/2026" },
  { client: "Ana Costa", process: "Divórcio", value: "R$ 5.000", status: "Atrasado", paidAt: "—" },
];

const statusColors: Record<string, string> = {
  Pago: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  Pendente: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  Atrasado: "bg-red-500/10 text-red-600 dark:text-red-400",
};

export default function FeesPage() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Honorários</h1>
          <p className="text-sm text-muted-foreground">Controle de honorários advocatícios.</p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-xl bg-[#C5A55A] px-4 py-2.5 text-sm font-semibold text-[#0C1220] shadow-sm hover:bg-[#D4BA7A] active:scale-[0.98]">
          <Plus className="h-4 w-4" /> Novo Honorário
        </button>
      </div>
      <div className="rounded-2xl border border-border/40 bg-card overflow-hidden">
        {mockFees.map((fee, idx) => (
          <div key={fee.client + fee.process} className={cn("flex items-center justify-between p-4 hover:bg-accent/30 transition-colors", idx < mockFees.length - 1 && "border-b border-border/30")}>
            <div className="flex items-center gap-3">
              <Receipt className="h-5 w-5 text-[#C5A55A]" />
              <div>
                <p className="text-sm font-semibold">{fee.client}</p>
                <p className="text-xs text-muted-foreground">{fee.process} • {fee.paidAt}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold">{fee.value}</span>
              <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-bold uppercase", statusColors[fee.status])}>{fee.status}</span>
              <MoreVertical className="h-4 w-4 text-muted-foreground/40" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
