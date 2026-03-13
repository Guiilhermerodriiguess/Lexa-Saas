"use client";

import { X, Calendar, Gavel, FileText, Clock, Sparkles, MoreHorizontal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/shared/ui/button";
import { cn } from "@/shared/lib/utils";

interface ProcessViewSheetProps {
    process: any;
    isOpen: boolean;
    onClose: () => void;
}

export function ProcessViewSheet({ process, isOpen, onClose }: ProcessViewSheetProps) {
    if (!process) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed inset-y-0 right-0 z-50 w-full max-w-xl bg-white dark:bg-navy shadow-premium border-l border-white/10"
                    >
                        {/* Header */}
                        <header className="p-6 border-b border-white/10 flex items-center justify-between bg-navy/5 dark:bg-white/5">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-xl bg-gold/10 flex items-center justify-center">
                                    <Gavel className="text-gold h-5 w-5" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold font-display text-navy dark:text-white uppercase tracking-tight">
                                        Detalhes do Processo
                                    </h2>
                                    <p className="text-xs text-muted-foreground">{process.process_number || "Número não informado"}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Button variant="ghost" size="icon" className="rounded-full">
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" className="rounded-full" onClick={onClose}>
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                        </header>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-8 no-scrollbar h-[calc(100vh-160px)]">
                            {/* Title Section */}
                            <section>
                                <h1 className="text-2xl font-display font-bold text-navy dark:text-white leading-tight">
                                    {process.title}
                                </h1>
                                <div className="flex gap-2 mt-3">
                                    <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-[10px] font-bold uppercase tracking-wider">
                                        {process.status}
                                    </span>
                                    <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-muted-foreground text-[10px] font-bold uppercase tracking-wider">
                                        Tribunal: TJSP
                                    </span>
                                </div>
                            </section>

                            {/* Grid Info */}
                            <section className="grid grid-cols-2 gap-4">
                                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                                    <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest mb-1 flex items-center gap-1.5">
                                        <Clock className="h-3 w-3" /> Atualizado em
                                    </p>
                                    <p className="text-sm font-semibold text-navy dark:text-white">12/03/2026</p>
                                </div>
                                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                                    <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest mb-1 flex items-center gap-1.5">
                                        <FileText className="h-3 w-3" /> Classe Judiciária
                                    </p>
                                    <p className="text-sm font-semibold text-navy dark:text-white">Procedimento Comum</p>
                                </div>
                            </section>

                            {/* Description */}
                            <section className="space-y-3">
                                <h4 className="text-xs font-bold uppercase tracking-widest text-gold">Análise Preambular</h4>
                                <div className="p-4 rounded-2xl bg-gold/5 border border-gold/10">
                                    <p className="text-sm leading-relaxed text-muted-foreground italic">
                                        "{process.description || "O processo está sendo analisado pela Aruna IA para extração de riscos e oportunidades."}"
                                    </p>
                                </div>
                            </section>

                            {/* Timeline Placeholder */}
                            <section className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <h4 className="text-xs font-bold uppercase tracking-widest text-gold text-navy dark:text-white">Movimentações</h4>
                                    <Button variant="link" className="text-gold text-xs h-auto p-0">Ver todas</Button>
                                </div>
                                <div className="space-y-4 border-l border-white/10 ml-2 pl-6 relative">
                                    {[1, 2].map((_, i) => (
                                        <div key={i} className="relative">
                                            <div className="absolute -left-[31px] top-1.5 h-2 w-2 rounded-full bg-gold border-4 border-navy" />
                                            <p className="text-xs text-muted-foreground mb-1">Ontem às 14:30</p>
                                            <p className="text-sm font-medium text-navy dark:text-white">Publicação de despacho/decisão interlocutória.</p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </div>

                        {/* Footer Actions */}
                        <footer className="absolute bottom-0 left-0 right-0 p-6 bg-white/50 dark:bg-navy/50 backdrop-blur-xl border-t border-white/10 flex gap-3">
                            <Button className="flex-1 bg-gold text-navy hover:bg-gold/90 font-bold h-11 rounded-xl shadow-lg border-0">
                                Gerar Petição Aruna
                            </Button>
                            <Button variant="outline" className="flex-1 border-white/10 h-11 rounded-xl">
                                Adicionar Prazo
                            </Button>
                        </footer>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
