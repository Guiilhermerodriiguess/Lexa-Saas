"use client";

import { trpc } from "@/trpc/client";
import { toast } from "sonner";
import { type CreateClientSchema } from "@/entities/client/model/schema";
import { z } from "zod";

/**
 * HOOK: useClients
 * Gerencia a lógica de listagem e criação de clientes.
 */
export function useClients() {
    const utils = trpc.useUtils();

    const { data: clients, isLoading, error } = trpc.crm.list.useQuery();

    const createMutation = trpc.crm.create.useMutation({
        onSuccess: () => {
            toast.success("Cliente cadastrado com sucesso!");
            utils.crm.list.invalidate(); // Recarrega a lista
        },
        onError: (err) => {
            toast.error(`Falha ao cadastrar: ${err.message}`);
        },
    });

    return {
        clients,
        isLoading,
        error,
        createClient: createMutation.mutate,
        isCreating: createMutation.status === "pending",
    };
}
