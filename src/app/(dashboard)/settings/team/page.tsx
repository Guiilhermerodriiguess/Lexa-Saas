"use client";

import React from "react";
import { useTeam } from "@/features/team-management/api/useTeam";
import { Users, Shield, Mail, Calendar, Settings2, MoreVertical } from "lucide-react";
import { cn } from "@/shared/lib/utils";

export default function TeamSettingsPage() {
    const { members, isLoadingMembers } = useTeam();

    const getRoleBadge = (role: string) => {
        const roles: Record<string, { label: string; className: string }> = {
            OWNER: { label: "Dono", className: "bg-[#C5A55A]/20 text-[#C5A55A] border-[#C5A55A]/30" },
            ADMIN: { label: "Administrador", className: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" },
            MEMBER: { label: "Colaborador", className: "bg-zinc-500/10 text-zinc-500 border-white/10" },
        };

        const r = roles[role as keyof typeof roles] || roles.MEMBER;
        return (
            <span className={cn("px-2 py-0.5 rounded-full text-[10px] font-bold border", r.className)}>
                {r.label}
            </span>
        );
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <header className="flex flex-col gap-1">
                <h1 className="text-3xl font-bold tracking-tight text-white">Equipe do Escritório</h1>
                <p className="text-sm text-zinc-400">Gerencie os colaboradores e as permissões de acesso do seu tenant.</p>
            </header>

            <div className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden">
                <div className="p-6 border-b border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Users size={20} className="text-[#C5A55A]" />
                        <span className="font-bold text-white">Colaboradores ativos</span>
                        <span className="ml-2 px-2 py-0.5 bg-white/5 rounded text-xs text-zinc-500">
                            {members?.length || 0}
                        </span>
                    </div>
                    <button className="text-xs px-4 py-2 bg-[#C5A55A]/10 hover:bg-[#C5A55A]/20 text-[#C5A55A] rounded-xl font-bold border border-[#C5A55A]/20 transition-all">
                        Convidar Membro
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-white/5 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                                <th className="py-3 pl-4">Colaborador</th>
                                <th className="py-3">Cargo</th>
                                <th className="py-3">E-mail</th>
                                <th className="py-3">Desde</th>
                                <th className="py-3 pr-4 text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoadingMembers ? (
                                [1, 2].map(i => (
                                    <tr key={i} className="animate-pulse border-b border-white/5">
                                        <td colSpan={5} className="py-8"></td>
                                    </tr>
                                ))
                            ) : (
                                members?.map((member) => (
                                    <tr key={member.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-all group">
                                        <td className="py-4 pl-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#C5A55A] to-zinc-800 flex items-center justify-center text-xs font-bold text-white border border-white/10 shadow-lg">
                                                    {member.full_name?.charAt(0) || "?"}
                                                </div>
                                                <span className="text-sm font-medium text-white group-hover:text-[#C5A55A] transition-colors">
                                                    {member.full_name || "Membro sem nome"}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="py-4">
                                            {getRoleBadge(member.role)}
                                        </td>
                                        <td className="py-4">
                                            <div className="flex items-center gap-2 text-zinc-400">
                                                <Mail size={14} className="text-zinc-600" />
                                                <span className="text-xs">{member.email}</span>
                                            </div>
                                        </td>
                                        <td className="py-4">
                                            <div className="flex items-center gap-2 text-zinc-400">
                                                <Calendar size={14} className="text-zinc-600" />
                                                <span className="text-xs">{new Date(member.created_at).toLocaleDateString()}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 pr-4 text-right">
                                            <button className="p-2 text-zinc-500 hover:text-white transition-all">
                                                <MoreVertical size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <section className="p-6 rounded-2xl border border-white/10 bg-white/[0.03] space-y-4">
                    <div className="flex items-center gap-2 text-[#C5A55A]">
                        <Shield size={20} />
                        <h3 className="font-bold">Permissões de Acesso</h3>
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                        As permissões no LEXA são baseadas em cargos. Apenas Administradores e Donos podem ver dados financeiros e excluir processos.
                    </p>
                    <button className="text-xs font-bold text-zinc-500 hover:text-[#C5A55A] flex items-center gap-1 transition-all">
                        Ver Tabela de Permissões <Settings2 size={14} />
                    </button>
                </section>
            </div>
        </div>
    );
}
