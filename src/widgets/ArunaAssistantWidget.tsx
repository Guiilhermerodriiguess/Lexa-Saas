"use client";

import React from "react";
import { Sparkles, Brain, ArrowRight, Lightbulb } from "lucide-react";
import { ArunaSearchInput } from "../features/aruna-intelligence/ui/ArunaSearchInput";

export function ArunaAssistantWidget() {
    return (
        <section className="relative overflow-hidden rounded-3xl border border-[#C5A55A]/20 bg-gradient-to-br from-[#C5A55A]/10 via-black to-black p-8 shadow-2xl">
            {/* Background patterns */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#C5A55A]/5 rounded-full blur-[100px] -mr-32 -mt-32" />

            <div className="relative z-10 flex flex-col gap-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="p-3 rounded-2xl bg-[#C5A55A] shadow-[0_0_20px_rgba(197,165,90,0.3)]">
                            <Brain className="text-black h-6 w-6" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black tracking-tight text-white flex items-center gap-2">
                                ASSISTENTE ARUNA
                                <Sparkles size={16} className="text-[#C5A55A]" />
                            </h2>
                            <p className="text-xs text-zinc-400 font-medium uppercase tracking-widest">Inteligência Jurídica Nativa</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md">
                        <Lightbulb size={16} className="text-[#C5A55A]" />
                        <span className="text-[10px] font-bold text-zinc-300">DICA: Peça um resumo do processo 100234...</span>
                    </div>
                </div>

                <ArunaSearchInput />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                        { title: "Resumo de Movimentações", desc: "Aruna traduz juridiquês para você.", color: "text-[#C5A55A]" },
                        { title: "Busca por Significado", desc: "Esqueça palavras-chave exatas.", color: "text-emerald-500" },
                        { title: "Análise de Probabilidade", desc: "Baseado em casos similares.", color: "text-blue-500" },
                    ].map((feat, i) => (
                        <div key={i} className="group p-4 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-all cursor-pointer">
                            <h4 className={cn("text-xs font-bold mb-1 group-hover:translate-x-1 transition-transform flex items-center gap-2", feat.color)}>
                                {feat.title}
                                <ArrowRight size={12} />
                            </h4>
                            <p className="text-[10px] text-zinc-500 leading-relaxed">{feat.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function cn(...inputs: any[]) {
    return inputs.filter(Boolean).join(" ");
}
