import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { type NextRequest } from "next/server";
import { appRouter } from "@/server/routers";
import { createTRPCContext } from "@/server/trpc";

/**
 * POST/GET Handler para o tRPC no Next.js App Router.
 * Mapeia as requisições para o o handler do tRPC usando o contexto configurado.
 */
const handler = (req: NextRequest) =>
    fetchRequestHandler({
        endpoint: "/api/trpc",
        req,
        router: appRouter,
        createContext: () => createTRPCContext({ req }),
        onError:
            process.env.NODE_ENV === "development"
                ? ({ path, error }: { path: string | undefined; error: { message: string } }) => {
                    console.error(
                        `❌ erro no tRPC no caminho '${path ?? "<no-path>"}': ${error.message}`
                    );
                }
                : undefined,
    });

export { handler as GET, handler as POST };
