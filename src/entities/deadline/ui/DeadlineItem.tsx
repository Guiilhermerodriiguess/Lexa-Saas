import React from "react";
import { type Deadline } from "../model/schema";
import { formatLegalDate } from "../lib/date-utils";
import { Clock, AlertTriangle, Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/shared/lib/utils";

export function DeadlineItem({ deadline }: { deadline: Deadline }) {
    const isOverdue = new Date(deadline.deadlineDate) < new Date() && deadline.status === "PENDING";

    const priorityColors = {
        LOW: "text-zinc-500",
        NORMAL: "text-emerald-500",
        HIGH: "text-amber-500",
        URGENT: "text-red-500",
    };

    return (
        <div className="flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all group">
            <div className={cn(
                "p-2 rounded-lg bg-white/5",
                isOverdue ? "text-red-500" : priorityColors[deadline.priority]
            )}>
                {deadline.category === "HEARING" ? <CalendarIcon size={18} /> : <Clock size={18} />}
            </div>

            <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold text-white truncate group-hover:text-[#C5A55A] transition-colors">
                    {deadline.title}
                </h4>
                <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] text-zinc-500">
                        {formatLegalDate(new Date(deadline.deadlineDate))}
                    </span>
                    {deadline.processId && (
                        <span className="text-[10px] text-zinc-600 truncate italic">
                            Proc: {String(deadline.processId).slice(0, 8)}...
                        </span>
                    )}
                </div>
            </div>

            {isOverdue && (
                <div className="flex items-center gap-1 text-[10px] font-bold text-red-500 bg-red-500/10 px-2 py-0.5 rounded-full">
                    <AlertTriangle size={10} />
                    ATRASADO
                </div>
            )}
        </div>
    );
}
