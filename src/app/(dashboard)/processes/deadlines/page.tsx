import { Clock, AlertTriangle, CheckCircle2 } from "lucide-react";
import { cn } from "@/shared/lib/utils";

const mockDeadlines = [
  { process: "Ação Indenizatória — Silva", deadline: "Hoje, 18:00", type: "Recurso", urgency: "critical" },
  { process: "Processo Trabalhista #0042", deadline: "Amanhã, 12:00", type: "Contestação", urgency: "warning" },
  { process: "Divórcio Consensual — Costa", deadline: "14/03/2026", type: "Petição", urgency: "normal" },
  { process: "Consultoria — Tech Corp", deadline: "20/03/2026", type: "Parecer", urgency: "normal" },
];

const urgencyStyles: Record<string, { badge: string; border: string }> = {
  critical: { badge: "bg-red-500/10 text-red-600 dark:text-red-400", border: "border-l-red-500" },
  warning: { badge: "bg-amber-500/10 text-amber-600 dark:text-amber-400", border: "border-l-amber-500" },
  normal: { badge: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400", border: "border-l-emerald-500" },
};

export default function DeadlinesPage() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Prazos</h1>
        <p className="text-sm text-muted-foreground">Controle de prazos fatais e compromissos processuais.</p>
      </div>

      <div className="space-y-3">
        {mockDeadlines.map((d) => {
          const style = urgencyStyles[d.urgency];
          return (
            <div key={d.process} className={cn("rounded-xl border border-border/40 bg-card p-4 border-l-4 hover:shadow-sm transition-shadow cursor-pointer", style.border)}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold">{d.process}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{d.type}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={cn("rounded-full px-2.5 py-1 text-[10px] font-bold uppercase", style.badge)}>
                    {d.urgency === "critical" ? "Urgente" : d.urgency === "warning" ? "Atenção" : "Normal"}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" /> {d.deadline}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
