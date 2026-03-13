"use client";

import { trpc } from "@/trpc/client";

export function useTeam() {
    const { data: members, isLoading: isLoadingMembers } = trpc.team.list.useQuery();
    const { data: me, isLoading: isLoadingMe } = trpc.team.getMe.useQuery();

    return {
        members,
        isLoadingMembers,
        me,
        isLoadingMe,
    };
}
