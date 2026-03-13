import { ScrollText, Plus, Search, MoreVertical } from "lucide-react";
import { cn } from "@/shared/lib/utils";

const mockDrafts = [
  { name: "Minuta — Contestação Trabalhista", status: "Rascunho", updatedAt: "Hoje, 10:15" },
  { name: "Minuta — Recurso Especial #891", status: "Em Revisão", updatedAt: "Ontem" },
  { name: "Minuta — Acordo Extrajudicial", status: "Aprovada", updatedAt: "07/03/2026" },
];

const statusColors: Record<string, string> = {
  Rascunho: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  "Em Revisão": "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  Aprovada: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
};

export default function DraftsPage() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Minutas</h1>
          <p className="text-sm text-muted-foreground">Rascunhos e minutas de documentos jurídicos.</p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-xl bg-[#C5A55A] px-4 py-2.5 text-sm font-semibold text-[#0C1220] shadow-sm transition-all hover:bg-[#D4BA7A] active:scale-[0.98]">
          <Plus className="h-4 w-4" />
          Nova Minuta
        </button>
      </div>

      <div className="rounded-2xl border border-border/40 bg-card overflow-hidden">
        {mockDrafts.map((draft, idx) => (
          <div key={draft.name} className={cn("flex items-center justify-between p-4 hover:bg-accent/30 transition-colors cursor-pointer", idx < mockDrafts.length - 1 && "border-b border-border/30")}>
            <div className="flex items-center gap-3">
              <ScrollText className="h-5 w-5 text-[#C5A55A]" />
              <div>
                <p className="text-sm font-semibold">{draft.name}</p>
                <span className={cn("inline-flex mt-1 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide", statusColors[draft.status])}>{draft.status}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground hidden sm:inline">{draft.updatedAt}</span>
              <MoreVertical className="h-4 w-4 text-muted-foreground/40" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
