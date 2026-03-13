"use client";

import { trpc } from "@/trpc/client";
import { toast } from "sonner";
import { keepPreviousData } from "@tanstack/react-query";

export function useProcesses(
    page: number = 1,
    search: string = "",
    statusFilter: string = "all",
    sortField: string = "created_at",
    sortDir: "asc" | "desc" = "desc",
    viewMode: "table" | "kanban" = "table"
) {
    const utils = trpc.useUtils();

    // Page Size fixed to 15 to match Lexanova-Core
    const PAGE_SIZE = 15;

    // List Query with Pagination & Filters
    const { data: listData, isLoading, error } = trpc.process.list.useQuery(
        { page, pageSize: PAGE_SIZE, search, statusFilter, sortField, sortDir, viewMode },
        { placeholderData: keepPreviousData }
    );

    // BI Query
    const { data: biCounts } = trpc.process.getBiCounts.useQuery();

    // Mutations
    const createMutation = trpc.process.create.useMutation({
        onSuccess: () => {
            toast.success("Processo criado com sucesso!");
            utils.process.list.invalidate();
            utils.process.getBiCounts.invalidate();
        },
        onError: (err) => toast.error(`Erro ao criar processo: ${err.message}`)
    });

    const updateMutation = trpc.process.update.useMutation({
        onSuccess: () => {
            toast.success("Processo atualizado com sucesso!");
            utils.process.list.invalidate();
            utils.process.getBiCounts.invalidate();
        },
        onError: (err) => toast.error(`Erro ao atualizar processo: ${err.message}`)
    });

    const deleteMutation = trpc.process.delete.useMutation({
        onSuccess: () => {
            toast.success("Processo excluído com sucesso!");
            utils.process.list.invalidate();
            utils.process.getBiCounts.invalidate();
        },
        onError: (err) => toast.error(`Erro ao excluir processo: ${err.message}`)
    });

    return {
        processos: listData?.data || [],
        totalCount: listData?.count || 0,
        biCounts: biCounts || { total: 0, ativos: 0, suspensos: 0 },
        isLoading,
        error,
        createMutation,
        updateMutation,
        deleteMutation,
        PAGE_SIZE
    };
}
