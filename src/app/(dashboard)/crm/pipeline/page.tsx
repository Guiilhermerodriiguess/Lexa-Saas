import { BarChart3, ArrowRight } from "lucide-react";
import { cn } from "@/shared/lib/utils";

const stages = [
  { name: "Prospecção", count: 5, color: "bg-blue-500" },
  { name: "Qualificação", count: 3, color: "bg-amber-500" },
  { name: "Proposta", count: 2, color: "bg-violet-500" },
  { name: "Negociação", count: 1, color: "bg-[#C5A55A]" },
  { name: "Fechado", count: 4, color: "bg-emerald-500" },
];

export default function PipelinePage() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Pipeline de Vendas</h1>
        <p className="text-sm text-muted-foreground">Acompanhe o funil de novos clientes.</p>
      </div>

      {/* Pipeline stages */}
      <div className="grid gap-4 lg:grid-cols-5">
        {stages.map((stage, idx) => (
          <div key={stage.name} className="rounded-2xl border border-border/40 bg-card p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className={cn("h-2.5 w-2.5 rounded-full", stage.color)} />
                <h3 className="text-sm font-semibold">{stage.name}</h3>
              </div>
              <span className="text-xs font-bold text-muted-foreground bg-accent/50 px-2 py-0.5 rounded-full">
                {stage.count}
              </span>
            </div>
            <div className="space-y-2">
              {Array.from({ length: stage.count }).slice(0, 3).map((_, i) => (
                <div key={i} className="rounded-xl border border-border/30 bg-background p-3 hover:border-[#C5A55A]/30 transition-colors cursor-pointer">
                  <p className="text-xs font-semibold">Cliente {stage.name} #{i + 1}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">Atualizado há {i + 1}d</p>
                </div>
              ))}
              {stage.count > 3 && (
                <p className="text-[10px] text-center text-muted-foreground">
                  +{stage.count - 3} mais
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
