import { parseISO, isAfter, isBefore, differenceInMinutes } from "date-fns";
import type { Evento } from "../model/types";
import { Gavel, Users, Timer, Calendar, Bell } from "lucide-react";

export const CATEGORIES = [
    { value: "audiencia", label: "Audiência", icon: Gavel, dot: "bg-rose-500", gradient: "from-rose-500/15 to-rose-500/5", text: "text-rose-600" },
    { value: "reuniao", label: "Reunião", icon: Users, dot: "bg-blue-500", gradient: "from-blue-500/15 to-blue-500/5", text: "text-blue-600" },
    { value: "prazo", label: "Prazo Fixo", icon: Timer, dot: "bg-amber-500", gradient: "from-amber-500/15 to-amber-500/5", text: "text-amber-600" },
    { value: "compromisso", label: "Compromisso", icon: Calendar, dot: "bg-emerald-500", gradient: "from-emerald-500/15 to-emerald-500/5", text: "text-emerald-600" },
    { value: "lembrete", label: "Lembrete", icon: Bell, dot: "bg-violet-500", gradient: "from-violet-500/15 to-violet-500/5", text: "text-violet-600" },
];

export const getCategoryConfig = (cat: string | null) =>
    CATEGORIES.find((c) => c.value === cat) || CATEGORIES[3];


export const fmt = (v: number) =>
    new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(v);


export function isHappeningNow(event: Evento): boolean {
    const now = new Date();
    return isAfter(now, parseISO(event.start_time)) && isBefore(now, parseISO(event.end_time));
}


export function getDurationLabel(start: string, end: string): string {
    const mins = differenceInMinutes(parseISO(end), parseISO(start));
    if (mins < 60) return `${mins}min`;
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return m > 0 ? `${h}h${m}min` : `${h}h`;
}
