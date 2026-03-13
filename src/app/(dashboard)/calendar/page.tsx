import {
  Calendar as CalendarIcon,
  Clock,
  Plus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

function getDaysInMonth(year: number, month: number) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const days: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(i);
  return days;
}

export default function CalendarPage() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const today = now.getDate();
  const days = getDaysInMonth(year, month);
  const monthName = new Intl.DateTimeFormat("pt-BR", { month: "long" }).format(now);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Agenda</h1>
          <p className="text-sm text-muted-foreground">
            Gerencie compromissos, prazos e audiências.
          </p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-xl bg-[#C5A55A] px-4 py-2.5 text-sm font-semibold text-[#0C1220] shadow-sm transition-all hover:bg-[#D4BA7A] active:scale-[0.98]">
          <Plus className="h-4 w-4" />
          Novo Evento
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Calendar Grid */}
        <div className="lg:col-span-2 rounded-2xl border border-border/40 bg-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold capitalize">
              {monthName} {year}
            </h2>
            <div className="flex items-center gap-1">
              <button className="rounded-lg p-1.5 hover:bg-accent/50 transition-colors">
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button className="rounded-lg p-1.5 hover:bg-accent/50 transition-colors">
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-px">
            {weekDays.map((d) => (
              <div key={d} className="py-2 text-center text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                {d}
              </div>
            ))}
            {days.map((day, i) => (
              <div
                key={i}
                className={`flex h-12 items-center justify-center rounded-lg text-sm transition-colors ${
                  day === today
                    ? "bg-[#C5A55A] text-[#0C1220] font-bold shadow-md"
                    : day
                    ? "hover:bg-accent/50 cursor-pointer"
                    : ""
                }`}
              >
                {day}
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming events sidebar */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Próximos Eventos
          </h3>
          <div className="space-y-3">
            {[
              { time: "09:00", title: "Audiência — Processo Silva", type: "Audiência", color: "border-l-[#C5A55A]" },
              { time: "14:30", title: "Prazo Fatal — Recurso #0042", type: "Prazo", color: "border-l-red-500" },
              { time: "16:00", title: "Reunião com cliente Oliveira", type: "Reunião", color: "border-l-blue-500" },
            ].map((ev) => (
              <div
                key={ev.title}
                className={`rounded-xl border border-border/40 bg-card p-4 border-l-4 ${ev.color} hover:shadow-sm transition-shadow cursor-pointer`}
              >
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
                  <Clock className="h-3 w-3" />
                  {ev.time} • {ev.type}
                </div>
                <p className="text-sm font-medium">{ev.title}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground text-center mt-4">
            Em breve: integração com Google Calendar
          </p>
        </div>
      </div>
    </div>
  );
}
