import { initTRPC, TRPCError } from "@trpc/server";
import { type NextRequest } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { ZodError } from "zod";
import "server-only";

/**
 * 1. CONTEXT
 * Define o contexto compartilhado por todos os procedimentos tRPC.
 * Extrai o orgId (tenant_id) do Clerk para garantir o isolamento.
 */
export const createTRPCContext = async (opts: { req: NextRequest }) => {
    const session = await auth();

    return {
        req: opts.req,
        auth: session,
        tenantId: session.orgId,
    };
};

/**
 * 2. INITIALIZATION
 * Inicializa o tRPC com customização de formatação de erros para o Zod.
 */
const t = initTRPC.context<typeof createTRPCContext>().create({
    errorFormatter({ shape, error }) {
        return {
            ...shape,
            data: {
                ...shape.data,
                zodError:
                    error.cause instanceof ZodError ? error.cause.flatten() : null,
            },
        };
    },
});

/**
 * 3. ROUTER & PROCEDURES
 * Exporta os construtores de routers e procedimentos.
 */
export const createTRPCRouter = t.router;

/**
 * Procedimento Público (No-Auth)
 */
export const publicProcedure = t.procedure;

/**
 * Procedimento de Tenant (Auth + OrgId obrigatório)
 * Este é o guardião do Multitenancy no LEXA-SAAS.
 */
export const tenantProcedure = t.procedure.use(({ ctx, next }) => {
    if (!ctx.auth.userId || !ctx.tenantId) {
        throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "Você precisa estar em uma Organização (Tenant) para acessar estes dados.",
        });
    }

    return next({
        ctx: {
            ...ctx,
            userId: ctx.auth.userId,
            tenantId: ctx.tenantId,
        },
    });
});
