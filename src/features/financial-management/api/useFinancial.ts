"use client";

import { trpc } from "@/trpc/client";
import { toast } from "sonner";

export function useFinancial() {
    const utils = trpc.useUtils();

    // Resumo do Dashboard
    const { data: summary, isLoading: isLoadingSummary } = trpc.financial.getSummary.useQuery();

    // Listagem Recente
    const { data: recentTransactions, isLoading: isLoadingRecent } = trpc.financial.list.useQuery({ limit: 5 });

    const createMutation = trpc.financial.create.useMutation({
        onSuccess: () => {
            toast.success("Transação lançada com sucesso!");
            utils.financial.getSummary.invalidate();
            utils.financial.list.invalidate();
        },
        onError: (err) => {
            toast.error(`Erro ao lançar transação: ${err.message}`);
        },
    });

    return {
        summary,
        isLoadingSummary,
        recentTransactions,
        isLoadingRecent,
        createTransaction: createMutation.mutate,
        isCreating: createMutation.status === "pending",
    };
}
