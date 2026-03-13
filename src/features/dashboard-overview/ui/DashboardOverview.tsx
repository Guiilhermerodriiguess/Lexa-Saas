"use client";

import { useMemo } from "react";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { useRouter } from "next/navigation";
import { Scale, Users, CalendarDays, TrendingUp, AlertTriangle, Clock } from "lucide-react";
import { format, isToday, isTomorrow, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/shared/lib/utils";
import { Skeleton, KPISkeleton } from "@/shared/ui/SkeletonLoaders";
import { StaggerContainer, StaggerItem, HoverElevate } from "@/shared/ui/AnimatedTransitions";
import { useUser } from "@clerk/nextjs";
import { trpc } from "@/trpc/client";

// Módulos FSD Components
import { isHappeningNow } from "../utils/helpers";
import { TimelineEvent } from "./components/TimelineEvent";
import { ProductivityWidget } from "./components/ProductivityWidget";
import { DeadlinesChart } from "./components/DeadlinesChart";

export function DashboardOverview() {
    const router = useRouter();
    const { user, isLoaded: isUserLoaded } = useUser();
    const { data, isLoading: isDataLoading } = trpc.dashboard.getOverview.useQuery();

    const displayName = user?.firstName || "Advogado";
    const hour = new Date().getHours();
    const greeting = hour < 12 ? "Bom dia" : hour < 18 ? "Boa tarde" : "Boa noite";

    const isLoading = !isUserLoaded || isDataLoading;

    const eventos = data?.eventos || [];
    const stats = data?.stats;
    const timesheetToday = data?.timesheetToday;

    const todayEvents = useMemo(() => eventos.filter((e) => isToday(parseISO(e.start_time))), [eventos]);
    const tomorrowEvents = useMemo(() => eventos.filter((e) => isTomorrow(parseISO(e.start_time))), [eventos]);
    const urgentEvents = useMemo(() => todayEvents.filter((e) => e.category === "audiencia" || e.category === "prazo"), [todayEvents]);
    const happeningNowCount = useMemo(() => todayEvents.filter(isHappeningNow).length, [todayEvents]);

    if (isLoading) {
        return (
            <div className="h-full flex flex-col gap-3">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                    {Array.from({ length: 4 }).map((_, i) => <KPISkeleton key={i} />)}
                </div>
                <div className="flex-1 grid md:grid-cols-3 gap-4 min-h-0">
                    <Skeleton className="md:col-span-2 rounded-xl" />
                    <Skeleton className="rounded-xl" />
                </div>
            </div>
        );
    }

    return (
        <StaggerContainer className="h-full flex flex-col gap-4 md:gap-3 overflow-y-auto md:overflow-hidden pb-20 md:pb-0 hide-scrollbar">
            {/* ── Sleek Header ── */}
            <StaggerItem className="mb-2 shrink-0 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground flex items-center gap-2 font-display">
                        {greeting}, <span className="text-primary">{displayName}</span>
                    </h1>
                    <p className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                        <span className="font-medium text-foreground">{format(new Date(), "EEEE, d 'de' MMMM", { locale: ptBR })}</span>
                        {todayEvents.length > 0 && (
                            <>
                                <span className="text-muted-foreground/40">•</span>
                                <span className="text-primary font-medium">{todayEvents.length} compromissos hoje</span>
                            </>
                        )}
                    </p>
                </div>
            </StaggerItem>

            {/* ── KPIs Row ── */}
            <StaggerItem className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-4 shrink-0">
                {[
                    { title: "Processos Ativos", value: stats?.totalProcessos ?? 0, icon: Scale, color: "text-blue-600 bg-blue-500/10", trend: "Ativos" },
                    { title: "Total de Clientes", value: stats?.totalClientes ?? 0, icon: Users, color: "text-indigo-600 bg-indigo-500/10", trend: "Carteira" },
                    { title: "Compromissos Hoje", value: todayEvents.length, icon: CalendarDays, color: "text-emerald-600 bg-emerald-500/10", badge: happeningNowCount > 0 ? `${happeningNowCount} AGORA` : undefined, trend: "Agenda" },
                ].map((kpi) => (
                    <HoverElevate key={kpi.title}>
                        <div className="bg-card border border-border/40 overflow-hidden h-full rounded-xl transition-all duration-200 hover:border-border/80 hover:shadow-sm cursor-default p-5 group flex flex-col justify-between">
                            <div className="flex items-start justify-between mb-4">
                                <div className={cn("p-2 rounded-lg shrink-0", kpi.color)}>
                                    <kpi.icon className="h-5 w-5" />
                                </div>
                                {kpi.badge && (
                                    <Badge variant="secondary" className="text-[10px] uppercase font-bold tracking-wider text-primary bg-primary/10 border-0">
                                        {kpi.badge}
                                    </Badge>
                                )}
                            </div>
                            <div>
                                <span className="text-3xl font-bold tracking-tight text-foreground block mb-1 font-display">{kpi.value}</span>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground line-clamp-1">
                                        {kpi.title}
                                    </span>
                                    {kpi.trend && (
                                        <span className="text-[10px] font-medium text-emerald-600 bg-emerald-500/10 px-1.5 py-0.5 rounded flex items-center">
                                            <TrendingUp className="h-3 w-3 mr-0.5" /> {kpi.trend}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </HoverElevate>
                ))}
            </StaggerItem>

            {/* ── Urgent Alert ── */}
            {urgentEvents.length > 0 && (
                <StaggerItem className="p-2.5 bg-destructive/5 border border-destructive/20 rounded-lg flex items-center gap-3 shrink-0">
                    <div className="h-7 w-7 rounded-md bg-destructive/10 flex items-center justify-center shrink-0">
                        <AlertTriangle className="h-3.5 w-3.5 text-destructive" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-destructive">Aviso Urgente</p>
                        <p className="text-[10px] text-destructive/70">{urgentEvents.length} prazos/audiências vencendo hoje</p>
                    </div>
                    <Button size="sm" variant="outline" className="border-destructive/30 text-destructive hover:bg-destructive/10 shrink-0 h-7 text-[10px] px-3 rounded-md" onClick={() => router.push("/deadlines")}>
                        Ver Detalhes
                    </Button>
                </StaggerItem>
            )}

            <div className="flex-none md:flex-1 md:min-h-0 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {/* ── Left Column: Events & Processes ── */}
                <div className="md:col-span-2 lg:col-span-3 overflow-visible md:overflow-hidden flex flex-col gap-6 md:min-h-0">
                    {/* Timeline & Chart Row */}
                    <div className="flex-none md:flex-1 md:min-h-[220px] grid grid-cols-1 lg:grid-cols-5 gap-6 overflow-visible md:overflow-hidden">
                        {/* Timeline */}
                        <div className="lg:col-span-3 flex flex-col md:min-h-0 overflow-visible md:overflow-hidden bg-card border border-border/40 rounded-xl p-4">
                            <div className="flex items-center justify-between mb-4 border-b border-border/40 pb-2 shrink-0">
                                <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                                    <Clock className="h-3.5 w-3.5" /> Timeline do Dia
                                </h3>
                                <Button variant="ghost" size="sm" className="h-6 text-[10px] font-bold uppercase tracking-widest text-primary/70 hover:text-primary transition-colors pr-0" onClick={() => router.push("/deadlines")}>
                                    Ver todos
                                </Button>
                            </div>

                            <div className="space-y-1 overflow-y-auto flex-1 min-h-0 pr-1 pl-1">
                                {todayEvents.length === 0 && tomorrowEvents.length === 0 && (
                                    <p className="text-sm text-muted-foreground text-center py-4">Nenhum compromisso agendado para hoje ou amanhã.</p>
                                )}

                                {todayEvents.length > 0 && (
                                    <div className="space-y-3">
                                        <p className="text-[10px] font-bold text-primary/60 uppercase tracking-widest pl-6 mb-2">Hoje</p>
                                        {todayEvents.map((ev, i) => (
                                            <TimelineEvent key={ev.id} event={ev} isLast={i === todayEvents.length - 1 && tomorrowEvents.length === 0} onNavigate={() => router.push("/deadlines")} />
                                        ))}
                                    </div>
                                )}

                                {tomorrowEvents.length > 0 && (
                                    <div className="space-y-3 mt-6">
                                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest pl-6 mb-2">Amanhã</p>
                                        {tomorrowEvents.map((ev, i) => (
                                            <TimelineEvent key={ev.id} event={ev} isLast={i === tomorrowEvents.length - 1} onNavigate={() => router.push("/deadlines")} />
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Chart Graphic Area */}
                        <div className="lg:col-span-2 flex flex-col md:min-h-0 overflow-visible md:overflow-hidden">
                            <DeadlinesChart eventos={eventos} />
                        </div>
                    </div>
                </div>

                {/* ── Right Column: Performance Widget ── */}
                <div className="space-y-4 overflow-visible md:overflow-y-auto md:min-h-0 pb-6">
                    <ProductivityWidget timesheetToday={timesheetToday} />
                </div>
            </div>
        </StaggerContainer>
    );
}
