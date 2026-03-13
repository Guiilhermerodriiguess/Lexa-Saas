"use client";

import { trpc } from "@/trpc/client";
import { toast } from "sonner";

export function useDocuments(processId?: string | null) {
    const utils = trpc.useUtils();

    const { data: documents, isLoading } = trpc.document.list.useQuery({ processId });

    const createMutation = trpc.document.create.useMutation({
        onSuccess: () => {
            toast.success("Documento registrado com sucesso!");
            utils.document.list.invalidate();
        },
        onError: (err) => {
            toast.error(`Erro ao registrar documento: ${err.message}`);
        },
    });

    return {
        documents,
        isLoading,
        registerDocument: createMutation.mutate,
        isRegistering: createMutation.status === "pending",
    };
}
