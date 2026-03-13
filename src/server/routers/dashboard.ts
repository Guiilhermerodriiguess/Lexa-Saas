import { createTRPCRouter, tenantProcedure } from "../trpc";
import { db } from "../db/client";
import { TRPCError } from "@trpc/server";

export const dashboardRouter = createTRPCRouter({
    getOverview: tenantProcedure.query(async ({ ctx }) => {
        const today = new Date();
        const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate()).toISOString();

        const in14Days = new Date(today);
        in14Days.setDate(in14Days.getDate() + 14);
        const endOf14Days = in14Days.toISOString();

        // 1. Fetch Events (Deadlines) for the next 14 days
        const { data: deadlines, error: deadlinesError } = await db
            .from("deadlines")
            .select("id, title, deadline_date, status, processes(title)")
            .eq("tenant_id", ctx.tenantId)
            .gte("deadline_date", startOfToday)
            .lte("deadline_date", endOf14Days)
            .order("deadline_date", { ascending: true })
            .limit(30);

        if (deadlinesError) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: deadlinesError.message });

        // 2. Fetch Recent Active Processes
        const { data: processes, error: processesError } = await db
            .from("processes")
            .select("id, title, status, process_number, updated_at")
            .eq("tenant_id", ctx.tenantId)
            .eq("status", "ACTIVE")
            .order("updated_at", { ascending: false })
            .limit(5);

        if (processesError) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: processesError.message });

        // 3. Fetch Stats (Counts)
        const [{ count: processesCount }, { count: clientsCount }] = await Promise.all([
            db.from("processes").select("*", { count: "exact", head: true }).eq("tenant_id", ctx.tenantId).eq("status", "ACTIVE"),
            db.from("clients").select("*", { count: "exact", head: true }).eq("tenant_id", ctx.tenantId)
        ]);

        // 4. Fetch Timesheet (Mock for now until Timesheet module is fully ported)
        const timesheetToday = {
            totalMins: 0,
            billable: 0,
            entries: 0
        };

        // Map events to the expected format of lexanova-core (id, title, start_time, end_time, category)
        const mappedEvents = (deadlines || []).map(d => {
            const processData = d.processes as any;
            const processTitle = Array.isArray(processData) ? processData[0]?.title : processData?.title;
            return {
                id: d.id,
                title: processTitle ? `${d.title} - ${processTitle}` : d.title,
                start_time: d.deadline_date,
                end_time: d.deadline_date, // Deadlines typically don't have an end time in Lexa-Saas current schema
                category: "prazo" // Map to prazo for now
            };
        });

        return {
            eventos: mappedEvents,
            processos: processes,
            stats: {
                totalProcessos: processesCount ?? 0,
                totalClientes: clientsCount ?? 0,
            },
            timesheetToday
        };
    }),
});
