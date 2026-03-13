import type { Metadata } from "next";
import Link from "next/link";
import {
  Gavel,
  Shield,
  Zap,
  BarChart3,
  Clock,
  Brain,
  ArrowRight,
  CheckCircle2,
  Star,
  ChevronRight,
} from "lucide-react";
import { LexaLogo, LexaIcon } from "@/shared/ui/logo";

export const metadata: Metadata = {
  title: "LEXA — Tecnologia a Serviço do Direito",
  description:
    "O Sistema Operacional Jurídico do Brasil. Unifique operações, automatize rotinas e tome decisões com inteligência artificial. Plataforma completa para escritórios de advocacia.",
  keywords: [
    "software jurídico",
    "gestão de processos",
    "advocacia",
    "tecnologia jurídica",
    "legaltech",
    "LEXA",
    "escritório de advocacia",
  ],
  openGraph: {
    title: "LEXA — O Sistema Operacional Jurídico do Brasil",
    description:
      "Unifique operações, automatize rotinas e tome decisões com inteligência artificial.",
    type: "website",
    locale: "pt_BR",
  },
};

const features = [
  { icon: Gavel, title: "Gestão de Processos", description: "Visão 360° de todos os processos jurídicos com andamentos automáticos e histórico completo.", color: "text-[#C5A55A]", bg: "bg-[#C5A55A]/10" },
  { icon: Clock, title: "Agenda Inteligente", description: "Controle de prazos fatais com alertas push/email. Nunca mais perca um prazo.", color: "text-emerald-500", bg: "bg-emerald-500/10" },
  { icon: Shield, title: "Segurança LGPD", description: "Criptografia ponta a ponta, isolamento de dados multi-tenant e conformidade total.", color: "text-blue-500", bg: "bg-blue-500/10" },
  { icon: Brain, title: "IA Aruna", description: "Busca semântica, análise preditiva e automação de documentos com inteligência artificial.", color: "text-violet-500", bg: "bg-violet-500/10" },
  { icon: BarChart3, title: "Financeiro Completo", description: "Gestão de honorários, custas, despesas e faturamento em um só lugar.", color: "text-teal-500", bg: "bg-teal-500/10" },
  { icon: Zap, title: "Performance Extrema", description: "Interface premium com carregamento < 1.5s. Construído com Next.js e Supabase.", color: "text-amber-500", bg: "bg-amber-500/10" },
];

const plans = [
  { name: "Starter", price: "R$ 197", description: "Para advogados autônomos", features: ["Até 100 processos", "1 usuário", "Gestão de prazos", "Suporte por email"], highlighted: false },
  { name: "Professional", price: "R$ 497", description: "Para escritórios em crescimento", features: ["Processos ilimitados", "Até 10 usuários", "IA Aruna (busca semântica)", "Financeiro completo", "Suporte prioritário", "Integrações com tribunais"], highlighted: true },
  { name: "Enterprise", price: "Sob consulta", description: "Para grandes escritórios", features: ["Tudo do Professional", "Usuários ilimitados", "IA avançada (preditiva)", "API personalizada", "SLA dedicado", "Onboarding VIP"], highlighted: false },
];

const stats = [
  { value: "500+", label: "Escritórios Ativos" },
  { value: "50k+", label: "Processos Gerenciados" },
  { value: "99.9%", label: "Uptime Garantido" },
  { value: "4.9/5", label: "Satisfação" },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ═══ NAVBAR ═══ */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/30 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <LexaLogo />
          <div className="hidden items-center gap-8 md:flex">
            <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Funcionalidades</a>
            <a href="#pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Planos</a>
            <a href="#about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Sobre</a>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/sign-in" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Entrar</Link>
            <Link href="/sign-up" className="inline-flex items-center gap-1.5 rounded-xl bg-[#C5A55A] px-5 py-2.5 text-sm font-semibold text-[#0C1220] shadow-lg shadow-[#C5A55A]/20 transition-all hover:bg-[#D4BA7A] hover:shadow-xl hover:shadow-[#C5A55A]/30 active:scale-[0.98]">
              Começar Grátis <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </nav>

      {/* ═══ HERO ═══ */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-16">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0C1220] via-[#111D35] to-background" />
          <div className="absolute top-1/4 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-[#C5A55A]/5 blur-[120px]" />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `linear-gradient(rgba(197,165,90,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(197,165,90,0.3) 1px, transparent 1px)`, backgroundSize: "60px 60px" }} />
        </div>

        <div className="mx-auto max-w-5xl px-6 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#C5A55A]/20 bg-[#C5A55A]/10 px-4 py-1.5 text-sm">
            <Star className="h-3.5 w-3.5 text-[#C5A55A]" />
            <span className="text-[#C5A55A] font-medium">O Sistema Operacional Jurídico do Brasil</span>
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            Excelência Jurídica.<br />
            <span className="bg-gradient-to-r from-[#C5A55A] to-[#D4BA7A] bg-clip-text text-transparent">Tecnologia de Ponta.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-[#8B95A5] sm:text-xl">
            Unifique operações, automatize rotinas e tome decisões com inteligência artificial. LEXA é a plataforma definitiva para escritórios de advocacia.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/sign-up" className="group inline-flex items-center gap-2 rounded-2xl bg-[#C5A55A] px-8 py-4 text-base font-bold text-[#0C1220] shadow-2xl shadow-[#C5A55A]/25 transition-all hover:bg-[#D4BA7A] hover:shadow-[#C5A55A]/40 hover:scale-[1.02] active:scale-[0.98]">
              Começar Gratuitamente <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <a href="#features" className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white/20">
              Ver Funcionalidades <ChevronRight className="h-5 w-5" />
            </a>
          </div>

          <div className="mt-20 grid grid-cols-2 gap-8 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-3xl font-bold text-white">{s.value}</p>
                <p className="mt-1 text-sm text-[#8B95A5]">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FEATURES ═══ */}
      <section id="features" className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#C5A55A]">Funcionalidades</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Tudo que seu escritório precisa.<br /><span className="text-muted-foreground">Em uma só plataforma.</span></h2>
          </div>
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div key={f.title} className="group relative overflow-hidden rounded-2xl border border-border/40 bg-card p-8 transition-all duration-300 hover:border-[#C5A55A]/30 hover:shadow-lg hover:shadow-[#C5A55A]/5">
                <div className={`inline-flex rounded-xl ${f.bg} p-3`}><f.icon className={`h-6 w-6 ${f.color}`} /></div>
                <h3 className="mt-5 text-lg font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.description}</p>
                <div className="absolute -right-4 -bottom-4 h-32 w-32 rounded-full bg-[#C5A55A]/5 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PRICING ═══ */}
      <section id="pricing" className="py-24 bg-accent/30">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#C5A55A]">Planos</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Escolha o plano ideal</h2>
            <p className="mt-4 text-muted-foreground">Comece grátis. Escale quando precisar.</p>
          </div>
          <div className="mt-16 grid gap-8 lg:grid-cols-3">
            {plans.map((plan) => (
              <div key={plan.name} className={`relative rounded-2xl border p-8 transition-all ${plan.highlighted ? "border-[#C5A55A]/50 bg-card shadow-xl shadow-[#C5A55A]/10 scale-[1.02]" : "border-border/40 bg-card hover:border-border/80 hover:shadow-lg"}`}>
                {plan.highlighted && <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#C5A55A] px-4 py-1 text-xs font-bold text-[#0C1220]">MAIS POPULAR</div>}
                <h3 className="text-lg font-semibold">{plan.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{plan.description}</p>
                <div className="mt-6"><span className="text-4xl font-bold">{plan.price}</span>{plan.price !== "Sob consulta" && <span className="text-muted-foreground">/mês</span>}</div>
                <ul className="mt-8 space-y-3">{plan.features.map((f) => (<li key={f} className="flex items-center gap-2.5 text-sm"><CheckCircle2 className="h-4 w-4 text-[#C5A55A] shrink-0" />{f}</li>))}</ul>
                <Link href="/sign-up" className={`mt-8 block w-full rounded-xl py-3 text-center text-sm font-semibold transition-all ${plan.highlighted ? "bg-[#C5A55A] text-[#0C1220] hover:bg-[#D4BA7A] shadow-lg shadow-[#C5A55A]/20" : "border border-border/50 text-foreground hover:bg-accent/50"}`}>Começar Agora</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA + FOOTER ═══ */}
      <section id="about" className="py-24">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <LexaIcon size={48} className="mx-auto" />
          <h2 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">Pronto para transformar seu escritório?</h2>
          <p className="mt-4 text-lg text-muted-foreground">Junte-se a centenas de escritórios que já usam LEXA para alcançar excelência jurídica.</p>
          <Link href="/sign-up" className="mt-8 group inline-flex items-center gap-2 rounded-2xl bg-[#C5A55A] px-8 py-4 text-base font-bold text-[#0C1220] shadow-2xl shadow-[#C5A55A]/25 transition-all hover:bg-[#D4BA7A] active:scale-[0.98]">
            Começar Gratuitamente <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </section>

      <footer className="border-t border-border/30 bg-card/50 py-12">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-2">
              <LexaIcon size={24} />
              <span className="text-sm font-semibold">LEXA<span className="text-[#C5A55A]">§</span></span>
              <span className="text-xs text-muted-foreground ml-2">Tecnologia a Serviço do Direito.</span>
            </div>
            <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} LEXA SAAS. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
