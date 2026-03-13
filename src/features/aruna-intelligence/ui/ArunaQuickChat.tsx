"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, X, Sparkles, MessageSquare, Bot, ArrowRight } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { Textarea } from "@/shared/ui/textarea";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { cn } from "@/shared/lib/utils";

interface Msg {
    id: string;
    role: "user" | "assistant";
    content: string;
    timestamp: Date;
}

export function ArunaQuickChat() {
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState("");
    const [msgs, setMsgs] = useState<Msg[]>([]);
    const [isTyping, setIsTyping] = useState(false);
    const endRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (open) {
            endRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [msgs, isTyping, open]);

    const handleSend = async () => {
        const text = input.trim();
        if (!text || isTyping) return;

        const userMsg: Msg = {
            id: crypto.randomUUID(),
            role: "user",
            content: text,
            timestamp: new Date(),
        };

        setMsgs((p) => [...p, userMsg]);
        setInput("");
        setIsTyping(true);

        // TODO: Integrar com tRPC aruna.chat ou Edge Function Real
        setTimeout(() => {
            const assistantMsg: Msg = {
                id: crypto.randomUUID(),
                role: "assistant",
                content: `Olá! Sou a **Aruna**, sua assistente jurídica. \n\nEstou operando em modo de visualização para este novo stack v4.1. Em breve, estarei conectada aos seus processos e documentos para análises em tempo real. \n\nComo posso ajudar você com sua agenda ou prazos hoje?`,
                timestamp: new Date(),
            };
            setMsgs((p) => [...p, assistantMsg]);
            setIsTyping(false);
        }, 1500);
    };

    return (
        <>
            {/* Floating Button */}
            <motion.button
                onClick={() => setOpen(true)}
                className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-2xl bg-navy dark:bg-gold text-white dark:text-navy border-2 border-white/10"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
            >
                <Sparkles className="h-6 w-6" />
                <span className="absolute -top-1 -right-1 flex h-4 w-4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-gold border-2 border-navy"></span>
                </span>
            </motion.button>

            {/* Chat Window */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95, transformOrigin: "bottom right" }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="fixed bottom-24 right-6 z-50 flex h-[580px] w-[400px] flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/80 dark:bg-navy/90 backdrop-blur-2xl shadow-premium ring-1 ring-white/20"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4 bg-navy/5 dark:bg-white/5">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-gold/20 to-gold/5 border border-gold/20">
                                    <Sparkles className="h-5 w-5 text-gold" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold tracking-tight text-navy dark:text-white font-display">ARUNA IA</h3>
                                    <p className="text-[10px] font-medium uppercase tracking-widest text-gold opacity-80">Assistente Jurídica</p>
                                </div>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 rounded-full hover:bg-red-500/10 hover:text-red-500"
                                onClick={() => setOpen(false)}
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 flex flex-col no-scrollbar">
                            {msgs.length === 0 && (
                                <div className="flex flex-col items-center justify-center h-full text-center space-y-4 px-4">
                                    <div className="h-20 w-20 rounded-3xl bg-gold/10 flex items-center justify-center">
                                        <Bot className="h-10 w-10 text-gold" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-navy dark:text-white">Inicie uma conversa</h4>
                                        <p className="text-xs text-muted-foreground mt-1">Pergunte sobre seus processos, prazos ou peça para redigir um documento.</p>
                                    </div>
                                </div>
                            )}
                            {msgs.map((m) => (
                                <div key={m.id} className={cn("flex gap-3", m.role === "user" ? "flex-row-reverse" : "flex-row")}>
                                    <div className={cn(
                                        "max-w-[85%] rounded-2xl px-4 py-3 text-sm shadow-sm",
                                        m.role === "user"
                                            ? "bg-navy text-white rounded-tr-sm"
                                            : "bg-white dark:bg-white/5 border border-white/10 text-navy dark:text-white rounded-tl-sm"
                                    )}>
                                        {m.role === "assistant" ? (
                                            <div className="prose prose-sm dark:prose-invert max-w-none">
                                                <ReactMarkdown>{m.content}</ReactMarkdown>
                                            </div>
                                        ) : (
                                            <p>{m.content}</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                            {isTyping && (
                                <div className="flex gap-3">
                                    <div className="bg-white dark:bg-white/5 border border-white/10 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
                                        <div className="flex gap-1.5 h-4 items-center">
                                            <div className="h-1.5 w-1.5 rounded-full bg-gold/60 animate-bounce" style={{ animationDelay: '0ms' }} />
                                            <div className="h-1.5 w-1.5 rounded-full bg-gold/60 animate-bounce" style={{ animationDelay: '150ms' }} />
                                            <div className="h-1.5 w-1.5 rounded-full bg-gold/60 animate-bounce" style={{ animationDelay: '300ms' }} />
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={endRef} />
                        </div>

                        {/* Input */}
                        <div className="p-4 bg-white/50 dark:bg-white/5 border-t border-white/10 backdrop-blur-md">
                            <div className="relative flex items-end gap-2 rounded-2xl border border-white/20 bg-white dark:bg-navy/50 px-3 py-2 shadow-sm focus-within:border-gold/50 transition-all">
                                <Textarea
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
                                    placeholder="Fale com a Aruna..."
                                    className="min-h-[44px] max-h-[120px] resize-none border-0 bg-transparent text-sm focus-visible:ring-0 py-2.5 px-2 placeholder:text-muted-foreground/60 w-full no-scrollbar shadow-none"
                                    rows={1}
                                />
                                <Button
                                    size="icon"
                                    onClick={handleSend}
                                    disabled={!input.trim() || isTyping}
                                    className={cn(
                                        "h-9 w-9 shrink-0 rounded-xl mb-1 transition-all",
                                        input.trim() ? "bg-gold text-navy shadow-lg hover:scale-105" : "bg-muted text-muted-foreground"
                                    )}
                                >
                                    <Send className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
