"use client";

import { useState, useRef, useEffect } from "react";
import { Sparkles, Send, Paperclip, Bot, User, ArrowRight, RefreshCcw } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { Textarea } from "@/shared/ui/textarea";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const SUGGESTIONS = [
  "Analisar o risco jurídico deste contrato",
  "Esboçar uma notificação extrajudicial",
  "Resumir a jurisprudência recente sobre danos morais",
  "Revisar os termos de uso para conformidade com a LGPD",
];

export default function ArunaPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;

    const newUserMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newUserMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const responseText = 
        `Com certeza! Como estou operando em **modo de simulação**, aqui está um exemplo de resposta estruturada para sua requisição: "${newUserMsg.content}".\n\n` +
        `Em uma base real, eu estaria analisando documentos, pesquisando legislação e montando uma resposta jurídica aprofundada.\n\n` +
        `Você pode observar que suporte formatações avançadas, como:\n` +
        `- **Destaques em negrito** para focar em artigos importantes.\n` +
        `- *Itálico* para citações.\n` +
        `- Listas ordenadas e blocos de código se precisar.\n\n` +
        `Me diga, qual é o próximo passo?`;

      const newBotMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: responseText,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, newBotMsg]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000); // 1.5s to 2.5s simulated delay
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Adjust textarea height automatically
  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = `${Math.min(e.target.scrollHeight, 200)}px`;
  };

  const clearChat = () => {
    setMessages([]);
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col bg-background/50 relative">
      
      {/* ─── Header ─── */}
      <header className="flex-none p-4 md:p-6 pb-2 border-b border-border/5 bg-background/80 backdrop-blur-md sticky top-0 z-10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#C5A55A]/20 to-[#C5A55A]/5 border border-[#C5A55A]/20 shadow-sm">
            <Sparkles className="h-5 w-5 text-[#C5A55A]" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
              Aruna IA
              <span className="text-[10px] uppercase font-bold tracking-wider tracking-widest bg-[#C5A55A] text-[#1e2330] px-1.5 py-0.5 rounded-sm">Beta</span>
            </h1>
            <p className="text-xs text-muted-foreground">Assistente Jurídica Inteligente</p>
          </div>
        </div>
        {messages.length > 0 && (
          <Button variant="ghost" size="sm" onClick={clearChat} className="text-muted-foreground hover:text-foreground h-8 text-xs">
            <RefreshCcw className="h-3.5 w-3.5 mr-2" />
            Novo Chat
          </Button>
        )}
      </header>

      {/* ─── Chat Area ─── */}
      <div className="flex-1 overflow-y-auto w-full mx-auto" id="scrollable-area">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full px-4 text-center max-w-2xl mx-auto py-12 md:py-24">
            <div className="relative mb-6">
              <div className="absolute inset-0 blur-2xl bg-[#C5A55A]/10 rounded-full" />
              <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-[#C5A55A]/20 to-[#C5A55A]/5 border border-[#C5A55A]/20 shadow-lg">
                <Sparkles className="h-10 w-10 text-[#C5A55A]" />
              </div>
            </div>
            
            <h2 className="text-2xl md:text-3xl font-semibold mb-3 tracking-tight">
              Como posso ajudar hoje?
            </h2>
            <p className="text-muted-foreground text-sm md:text-base mb-10 max-w-lg">
              A Aruna é uma inteligência artificial treinada para o contexto jurídico brasileiro. 
              Peça ajuda com minutas, pesquisas jurisprudenciais, resumos ou análise de risco.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
              {SUGGESTIONS.map((suggestion, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setInput(suggestion);
                  }}
                  className="flex items-center text-left gap-3 rounded-xl border border-border/40 bg-card p-4 text-sm transition-all hover:border-[#C5A55A]/40 hover:bg-[#C5A55A]/5 hover:shadow-sm"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted/50">
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <span className="text-foreground/90 font-medium">{suggestion}</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col w-full max-w-4xl mx-auto py-6 pb-32">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "px-4 md:px-8 py-6 flex w-full",
                  message.role === "assistant" 
                    ? "bg-transparent border-b border-t border-border/5" 
                    : "bg-transparent"
                )}
              >
                <div className="w-full max-w-3xl mx-auto flex gap-4 md:gap-6">
                  {/* Avatar */}
                  <div className="shrink-0 mt-1">
                    {message.role === "assistant" ? (
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#C5A55A] to-[#C5A55A]/80 shadow-sm">
                        <Sparkles className="h-4 w-4 text-[#1e2330]" />
                      </div>
                    ) : (
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sidebar-accent border border-border/50">
                        <User className="h-4 w-4 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 space-y-2 overflow-hidden">
                    <div className="font-semibold text-sm text-foreground flex items-center gap-2">
                      {message.role === "assistant" ? "Aruna IA" : "Você"}
                      <span className="text-xs font-normal text-muted-foreground/50">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <div className="text-foreground/90 leading-relaxed text-[15px] whitespace-pre-wrap">
                      {/* Fake markdown rendering for simulation */}
                      {message.content.split('\n').map((line, i) => {
                        if (line.startsWith('- ')) {
                          return <li key={i} className="ml-4 list-disc marker:text-[#C5A55A]">{line.substring(2)}</li>
                        }
                        if (line.includes('**')) {
                          // Simple bold replacement
                          const parts = line.split('**');
                          return (
                            <p key={i} className={i !== 0 ? "mt-4" : ""}>
                              {parts.map((part, j) => j % 2 === 1 ? <strong key={j} className="text-foreground">{part}</strong> : part)}
                            </p>
                          );
                        }
                        if (line === '') return null;
                        return <p key={i} className={i !== 0 ? "mt-4" : ""}>{line}</p>;
                      })}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Typing indicator */}
            {isTyping && (
              <div className="px-4 md:px-8 py-6 flex w-full bg-transparent border-t border-border/5">
                <div className="w-full max-w-3xl mx-auto flex gap-4 md:gap-6">
                  <div className="shrink-0 mt-1">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#C5A55A] to-[#C5A55A]/80 shadow-sm">
                      <Sparkles className="h-4 w-4 text-[#1e2330]" />
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <div className="font-semibold text-sm text-foreground mb-2">Aruna IA</div>
                    <div className="flex gap-1 items-center h-6">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#C5A55A]/60 animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-1.5 h-1.5 rounded-full bg-[#C5A55A]/60 animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-1.5 h-1.5 rounded-full bg-[#C5A55A]/60 animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} className="h-4" />
          </div>
        )}
      </div>

      {/* ─── Input Area ─── */}
      <div className="flex-none p-4 pb-6 md:pb-8 bg-gradient-to-t from-background via-background to-background/0 absolute bottom-0 w-full left-0 pointer-events-none">
        <div className="max-w-3xl mx-auto relative pointer-events-auto shadow-2xl rounded-2xl">
          <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-b from-card/50 to-card/80 backdrop-blur-xl border border-border/40" />
          
          <div className="flex flex-col relative rounded-2xl p-2 bg-card/50">
            <Textarea
              value={input}
              onChange={handleInput}
              onKeyDown={handleKeyDown}
              placeholder="Pergunte à Aruna (use Shift + Enter para quebrar linha)..."
              className="min-h-[52px] w-full resize-none border-0 bg-transparent py-3.5 px-4 focus-visible:ring-0 focus-visible:ring-offset-0 text-[15px] placeholder:text-muted-foreground/60 shadow-none overflow-hidden"
              rows={1}
            />
            
            <div className="flex items-center justify-between px-2 pb-1 pt-2 border-t border-border/5">
              {/* Left Actions */}
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground rounded-full">
                  <Paperclip className="h-4 w-4" />
                  <span className="sr-only">Anexar</span>
                </Button>
              </div>

              {/* Right Actions */}
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-muted-foreground/50 mr-2 hidden sm:inline-block">
                  Aruna pode cometer erros. Considere verificar.
                </span>
                <Button 
                  size="icon" 
                  disabled={!input.trim() || isTyping}
                  onClick={handleSend}
                  className={cn(
                    "h-8 w-8 rounded-full transition-all flex items-center justify-center shadow-md",
                    input.trim() 
                      ? "bg-[#C5A55A] text-[#1e2330] hover:bg-[#D4B469] hover:shadow-lg hover:-translate-y-0.5" 
                      : "bg-muted text-muted-foreground shadow-none"
                  )}
                >
                  <Send className="h-4 w-4 ml-0.5" />
                  <span className="sr-only">Enviar</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
