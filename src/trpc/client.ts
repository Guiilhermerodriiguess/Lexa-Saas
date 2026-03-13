"use client";

import { createTRPCReact } from "@trpc/react-query";
import { type AppRouter } from "@/server/routers";

/**
 * tRPC REACT HOOKS
 * Cria os hooks tipados baseados no AppRouter do servidor.
 * Permite usar trpc.healthcheck.useQuery() com Type-Safety total.
 */
export const trpc = createTRPCReact<AppRouter>();
