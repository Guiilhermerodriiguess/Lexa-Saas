import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import {
  Briefcase,
  ChevronRight,
  Clock,
  FileCheck,
  TrendingUp,
  AlertCircle,
  Brain,
} from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { createSupabaseServerClient } from "@/shared/api/supabase/server";

const statIcons = [Briefcase, Clock, FileCheck, TrendingUp];
const statColors = [
  "text-[#C5A55A]",
  "text-red-500",
  "text-emerald-500",
  "text-[#C5A55A]",
];

export default async function DashboardPage() {
  const user = await currentUser();
  const supabase = await createSupabaseServerClient();
  const firstName = user?.firstName || "Usuário";

  // Buscar processos reais
  const { data: processes } = await supabase
    .from("processes")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(4);

  const { count: activeCount } = await supabase
    .from("processes")
    .select("*", { count: "exact", head: true })
    .eq("status", "active");

  const stats = [
    { name: "Processos Ativos", value: String(activeCount ?? 0), icon: Briefcase, trend: "Total", color: "text-[#C5A55A]" },
    { name: "Prazos para Hoje", value: "—", icon: Clock, trend: "Em breve", color: "text-red-500" },
    { name: "Contratos Pendentes", value: "—", icon: FileCheck, trend: "Em breve", color: "text-emerald-500" },
    { name: "Receita Mensal", value: "—", icon: TrendingUp, trend: "Em breve", color: "text-[#C5A55A]" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Welcome */}
      <header className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight">
          Olá, {firstName} 👋
        </h1>
        <p className="text-sm text-muted-foreground">
          Resumo da inteligência jurídica do seu escritório.
        </p>
      </header>

      {/* Stats */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="group relative overflow-hidden rounded-2xl border border-border/40 bg-card p-5 shadow-sm transition-all hover:shadow-md hover:border-[#C5A55A]/20"
          >
            <div className="flex items-start justify-between">
              <div className={cn("rounded-lg p-2 bg-accent/50", stat.color)}>
                <stat.icon className="h-4 w-4" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-accent/30 text-muted-foreground">
                {stat.trend}
              </span>
            </div>
            <div className="mt-3">
              <p className="text-xs font-medium text-muted-foreground">{stat.name}</p>
              <h3 className="mt-0.5 text-2xl font-bold tracking-tight">{stat.value}</h3>
            </div>
            <div className="absolute -right-2 -bottom-2 h-20 w-20 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity">
              <stat.icon size={80} />
            </div>
          </div>
        ))}
      </section>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Processes */}
        <section className="lg:col-span-2 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              Processos Recentes
              <span className="rounded-full bg-[#C5A55A]/10 px-2 py-0.5 text-[10px] text-[#C5A55A] font-bold">
                Live
              </span>
            </h2>
            <Link
              href="/processes"
              className="text-xs font-medium text-[#C5A55A] hover:underline flex items-center gap-1"
            >
              Ver todos <ChevronRight size={12} />
            </Link>
          </div>

          <div className="rounded-2xl border border-border/40 bg-card overflow-hidden">
            {processes && processes.length > 0 ? (
              processes.map((process, idx) => (
                <Link
                  key={process.id}
                  href={`/processes/${process.id}`}
                  className={cn(
                    "flex items-center justify-between p-4 hover:bg-accent/30 transition-colors",
                    idx < processes.length - 1 && "border-b border-border/30"
                  )}
                >
                  <div className="space-y-0.5 min-w-0 flex-1">
                    <p className="text-sm font-semibold truncate">
                      {process.title}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {process.court || "Sem tribunal"} • {process.type}
                    </p>
                  </div>
                  <ChevronRight size={16} className="text-muted-foreground/40 shrink-0" />
                </Link>
              ))
            ) : (
              <div className="flex flex-col items-center py-12">
                <Briefcase className="h-8 w-8 text-muted-foreground/30" />
                <p className="mt-3 text-sm text-muted-foreground">
                  Nenhum processo ainda.{" "}
                  <Link href="/processes/new" className="text-[#C5A55A] hover:underline">
                    Criar primeiro
                  </Link>
                </p>
              </div>
            )}
          </div>
        </section>

        {/* AI Alerts */}
        <section className="space-y-3">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Brain className="h-4 w-4 text-[#C5A55A]" />
            Aruna IA
          </h2>
          <div className="space-y-3">
            <div className="rounded-2xl border border-[#C5A55A]/20 bg-[#C5A55A]/5 p-4 flex gap-3">
              <AlertCircle className="text-[#C5A55A] shrink-0 h-5 w-5 mt-0.5" />
              <div className="space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#C5A55A]">
                  Insight
                </p>
                <p className="text-sm leading-snug">
                  A LEXA IA está pronta. Assim que você cadastrar processos, a
                  Aruna começará a gerar insights e alertas automaticamente.
                </p>
              </div>
            </div>
            <div className="rounded-2xl border border-border/30 bg-card/50 p-4 flex gap-3">
              <TrendingUp className="text-emerald-500 shrink-0 h-5 w-5 mt-0.5" />
              <div className="space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-500">
                  Dica
                </p>
                <p className="text-sm leading-snug text-muted-foreground">
                  Comece cadastrando seus processos ativos para ter métricas reais no dashboard.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
