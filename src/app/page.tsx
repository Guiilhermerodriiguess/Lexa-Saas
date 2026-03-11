import { 
  Briefcase, 
  ChevronRight, 
  Clock, 
  FileCheck, 
  TrendingUp,
  AlertCircle
} from "lucide-react";
import { cn } from "@/shared/lib/utils";

const stats = [
  { name: "Processos Ativos", value: "1,284", icon: Briefcase, trend: "+12%", color: "text-blue-500" },
  { name: "Prazos para Hoje", value: "14", icon: Clock, trend: "4 Críticos", color: "text-red-500" },
  { name: "Contratos Pendentes", value: "48", icon: FileCheck, trend: "+8%", color: "text-emerald-500" },
  { name: "Receita Mensal", value: "R$ 142k", icon: TrendingUp, trend: "+24%", color: "text-amber-500" },
];

export default function Home() {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight">Bem-vindo, Guilherme</h1>
        <p className="text-muted-foreground">Aqui está o resumo da inteligência jurídica do seu escritório hoje.</p>
      </header>

      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div 
            key={stat.name}
            className="group relative overflow-hidden rounded-2xl border border-border/40 bg-card p-6 shadow-sm transition-all hover:shadow-md hover:border-border/80"
          >
            <div className="flex items-start justify-between">
              <div className={cn("rounded-lg p-2.5 bg-background", stat.color)}>
                <stat.icon className="h-5 w-5" />
              </div>
              <span className={cn("text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full bg-background/50", stat.trend.includes("Crítico") ? "text-red-500" : "text-muted-foreground")}>
                {stat.trend}
              </span>
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium text-muted-foreground">{stat.name}</p>
              <h3 className="mt-1 text-3xl font-bold tracking-tight">{stat.value}</h3>
            </div>
            <div className="absolute -right-2 -bottom-2 h-24 w-24 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity">
              <stat.icon size={96} />
            </div>
          </div>
        ))}
      </section>

      <div className="grid gap-8 lg:grid-cols-3">
        <section className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              Processos Recentes
              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] text-primary">Live Updates</span>
            </h2>
            <button className="text-xs font-medium text-primary hover:underline flex items-center gap-1">
              Ver todos <ChevronRight size={12} />
            </button>
          </div>
          
          <div className="rounded-2xl border border-border/40 bg-background overflow-hidden">
            {[1, 2, 3, 4].map((i) => (
              <div 
                key={i} 
                className="flex items-center justify-between p-4 border-b border-border/30 last:border-0 hover:bg-accent/30 transition-colors pointer-cursor"
              >
                <div className="space-y-1">
                  <p className="text-sm font-semibold">0001234-56.2024.8.26.0000</p>
                  <p className="text-xs text-muted-foreground">Tribunal de Justiça de São Paulo • Ação Civil Pública</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right hidden sm:block">
                    <p className="text-[10px] uppercase font-bold text-muted-foreground">Última Movimentação</p>
                    <p className="text-xs">Concluso para Julgamento</p>
                  </div>
                  <ChevronRight size={16} className="text-muted-foreground" />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Alertas da Aruna (IA)</h2>
          <div className="space-y-3">
            <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-4 flex gap-3">
              <AlertCircle className="text-red-500 shrink-0 h-5 w-5" />
              <div className="space-y-1">
                <p className="text-xs font-bold text-red-600 dark:text-red-400">PRAZO CRÍTICO</p>
                <p className="text-sm leading-snug">O processo #00812 vence em 4 horas. Nenhuma minuta foi detectada para este caso.</p>
              </div>
            </div>
            <div className="rounded-2xl border border-blue-500/20 bg-blue-500/5 p-4 flex gap-3">
              <TrendingUp className="text-blue-500 shrink-0 h-5 w-5" />
              <div className="space-y-1">
                <p className="text-xs font-bold text-blue-600 dark:text-blue-400">INSIGHT</p>
                <p className="text-sm leading-snug">Baseado em casos similares, há 82% de chance de êxito no recurso do cliente Silva.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
