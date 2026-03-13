"use client";

import { trpc } from "@/trpc/client";
import { useEffect } from "react";
import { useAuth, useOrganization } from "@clerk/nextjs";

/**
 * HOOK: useSyncProfile
 * Este hook monitora a sessão do Clerk e dispara a mutação de sincronização
 * sempre que um usuário loga ou troca de organização.
 */
export function useSyncProfile() {
    const { isSignedIn, userId } = useAuth();
    const { organization } = useOrganization();
    const syncMutation = trpc.auth.sync.useMutation();

    useEffect(() => {
        // Só sincroniza se estiver logado e dentro de uma organização
        if (isSignedIn && userId && organization?.id) {
            syncMutation.mutate(undefined, {
                onSuccess: (data) => {
                    console.log("✅ Sincronização Clerk ↔ Supabase realizada:", data);
                },
                onError: (err) => {
                    console.error("❌ Falha na sincronização:", err.message);
                },
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSignedIn, userId, organization?.id]);

    return {
        isSyncing: syncMutation.status === "pending",
        isSynced: syncMutation.status === "success",
        error: syncMutation.error,
    };
}
