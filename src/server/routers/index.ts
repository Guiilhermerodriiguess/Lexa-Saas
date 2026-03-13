import { createTRPCRouter, publicProcedure } from "../trpc";
import { authRouter } from "./auth";
import { clientRouter } from "./client";
import { processRouter } from "./process";
import { deadlineRouter } from "./deadline";
import { documentRouter } from "./document";
import { financialRouter } from "./financial";
import { teamRouter } from "./team";
import { arunaRouter } from "./aruna";
import { analyticsRouter } from "./analytics";
import { crawlerRouter } from "./crawler";
import { dashboardRouter } from "./dashboard";

/**
 * APP ROUTER
 * Este é o ponto de entrada principal do tRPC no servidor.
 */
export const appRouter = createTRPCRouter({
    auth: authRouter,
    crm: clientRouter,
    process: processRouter,
    deadline: deadlineRouter,
    document: documentRouter,
    financial: financialRouter,
    team: teamRouter,
    aruna: arunaRouter,
    analytics: analyticsRouter,
    crawler: crawlerRouter,
    dashboard: dashboardRouter,
    healthcheck: publicProcedure.query(() => {
        return {
            status: "online",
            timestamp: new Date().toISOString(),
        };
    }),
});

// Exporta o tipo do router para o frontend
export type AppRouter = typeof appRouter;
