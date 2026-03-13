"use client";

import { trpc } from "@/trpc/client";
import { toast } from "sonner";
import { z } from "zod";

/**
 * HOOK: useDeadlines
 * Gerencia a lógica de consulta e mutação de prazos processuais.
 */
export function useDeadlines() {
    const utils = trpc.useUtils();

    // Listar prazos próximos para o Dashboard
    const { data: upcoming, isLoading: isLoadingUpcoming } = trpc.deadline.getUpcoming.useQuery();

    const statusMutation = trpc.deadline.updateStatus.useMutation({
        onSuccess: () => {
            toast.success("Status do prazo atualizado!");
            utils.deadline.getUpcoming.invalidate();
        },
        onError: (err) => {
            toast.error(`Erro ao atualizar: ${err.message}`);
        },
    });

    return {
        upcoming,
        isLoadingUpcoming,
        updateStatus: statusMutation.mutate,
        isUpdating: statusMutation.status === "pending",
    };
}
