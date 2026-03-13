"use client";

import React, { useState } from "react";
import { useDeadlines } from "@/features/deadline-management/api/useDeadlines";
import { DeadlineItem } from "@/entities/deadline/ui/DeadlineItem";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, isSameDay } from "date-fns";
import { ptBR } from "date-fns/locale";

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const { upcoming, isLoadingUpcoming } = useDeadlines();

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold tracking-tight text-white">Agenda Jurídica</h1>
          <p className="text-sm text-zinc-400">Controle seus prazos e compromissos processuais.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-black text-sm font-bold rounded-xl transition-all">
          <Plus size={18} />
          Agendar Prazo
        </button>
      </header>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-4">
        {/* Calendar Grid */}
        <div className="lg:col-span-3 p-6 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-white capitalize">
              {format(currentDate, "MMMM yyyy", { locale: ptBR })}
            </h2>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)))}
                className="p-2 hover:bg-white/5 rounded-lg text-zinc-400 hover:text-white transition-all"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={() => setCurrentDate(new Date())}
                className="px-3 py-1 text-xs font-bold text-zinc-400 hover:text-white transition-all"
              >
                Hoje
              </button>
              <button
                onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)))}
                className="p-2 hover:bg-white/5 rounded-lg text-zinc-400 hover:text-white transition-all"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-px bg-white/5 rounded-xl overflow-hidden border border-white/5">
            {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((day) => (
              <div key={day} className="bg-white/[0.02] p-2 text-center text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                {day}
              </div>
            ))}
            {days.map((day) => (
              <div
                key={day.toISOString()}
                className={`bg-white/[0.01] min-h-[100px] p-2 border-t border-white/5 transition-all hover:bg-white/[0.03] cursor-pointer ${!isSameMonth(day, monthStart) ? "opacity-20" : ""
                  } ${isToday(day) ? "bg-white/5" : ""}`}
              >
                <span className={`text-xs font-bold ${isToday(day) ? "text-[#C5A55A]" : "text-zinc-400"}`}>
                  {format(day, "d")}
                </span>
                {/* Eventos seriam listados aqui */}
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar: Next Deadlines */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-widest">Prazos Fatais</h3>
          <div className="flex flex-col gap-3">
            {isLoadingUpcoming ? (
              [1, 2, 3].map(i => <div key={i} className="h-16 bg-white/5 rounded-xl animate-pulse" />)
            ) : upcoming?.map(deadline => (
              <DeadlineItem key={deadline.id} deadline={deadline as any} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
