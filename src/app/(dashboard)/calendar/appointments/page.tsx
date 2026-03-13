import { Clock, Plus, Calendar, Filter } from "lucide-react";

export default function AppointmentsPage() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Compromissos</h1>
          <p className="text-sm text-muted-foreground">
            Audiências, reuniões e prazos do escritório.
          </p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-xl bg-[#C5A55A] px-4 py-2.5 text-sm font-semibold text-[#0C1220] shadow-sm transition-all hover:bg-[#D4BA7A] active:scale-[0.98]">
          <Plus className="h-4 w-4" />
          Novo Compromisso
        </button>
      </div>

      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border/60 bg-accent/10 py-20">
        <div className="rounded-2xl bg-accent/30 p-4">
          <Calendar className="h-8 w-8 text-muted-foreground/50" />
        </div>
        <h3 className="mt-4 text-lg font-semibold">Módulo em Desenvolvimento</h3>
        <p className="mt-1 text-sm text-muted-foreground max-w-sm text-center">
          O módulo de compromissos está sendo desenvolvido. Em breve você poderá
          gerenciar audiências, reuniões e prazos aqui.
        </p>
      </div>
    </div>
  );
}
