import { PieChart, TrendingUp, TrendingDown, DollarSign, Receipt, CreditCard, ArrowUpRight, ArrowDownRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/shared/lib/utils";

const financeStats = [
  { name: "Receita Mensal", value: "R$ 142.500", trend: "+12%", up: true, icon: TrendingUp },
  { name: "Despesas", value: "R$ 38.200", trend: "+3%", up: false, icon: TrendingDown },
  { name: "Lucro Líquido", value: "R$ 104.300", trend: "+18%", up: true, icon: DollarSign },
  { name: "A Receber", value: "R$ 67.800", trend: "8 faturas", up: true, icon: Receipt },
];

const recentTransactions = [
  { description: "Honorários — Silva & Assoc.", amount: "+R$ 15.000", date: "Hoje", type: "entrada" },
  { description: "Custas Processuais — TJ/SP", amount: "-R$ 2.850", date: "Hoje", type: "saida" },
  { description: "Honorários — Oliveira", amount: "+R$ 8.500", date: "Ontem", type: "entrada" },
  { description: "Licença Software Jurídico", amount: "-R$ 1.200", date: "08/03", type: "saida" },
  { description: "Honorários — Tech Corp", amount: "+R$ 25.000", date: "05/03", type: "entrada" },
];

export default function FinancePage() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Financeiro</h1>
          <p className="text-sm text-muted-foreground">Visão geral das finanças do escritório.</p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/finance/fees" className="inline-flex items-center gap-1.5 rounded-xl border border-border/50 px-4 py-2.5 text-sm font-medium hover:bg-accent/50 transition-colors">
            <Receipt className="h-4 w-4" /> Honorários
          </Link>
          <Link href="/finance/billing" className="inline-flex items-center gap-1.5 rounded-xl bg-[#C5A55A] px-4 py-2.5 text-sm font-semibold text-[#0C1220] shadow-sm hover:bg-[#D4BA7A] active:scale-[0.98]">
            <CreditCard className="h-4 w-4" /> Faturamento
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {financeStats.map((stat) => (
          <div key={stat.name} className="rounded-2xl border border-border/40 bg-card p-5">
            <div className="flex items-start justify-between">
              <div className="rounded-lg bg-accent/50 p-2">
                <stat.icon className="h-4 w-4 text-[#C5A55A]" />
              </div>
              <span className={cn("inline-flex items-center gap-0.5 text-xs font-semibold", stat.up ? "text-emerald-500" : "text-red-500")}>
                {stat.up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                {stat.trend}
              </span>
            </div>
            <div className="mt-3">
              <p className="text-xs text-muted-foreground">{stat.name}</p>
              <h3 className="mt-0.5 text-xl font-bold">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Recent transactions */}
      <div className="rounded-2xl border border-border/40 bg-card overflow-hidden">
        <div className="border-b border-border/30 p-4">
          <h3 className="text-sm font-semibold">Movimentações Recentes</h3>
        </div>
        {recentTransactions.map((tx, idx) => (
          <div key={tx.description} className={cn("flex items-center justify-between p-4 hover:bg-accent/30 transition-colors", idx < recentTransactions.length - 1 && "border-b border-border/30")}>
            <div>
              <p className="text-sm font-medium">{tx.description}</p>
              <p className="text-xs text-muted-foreground">{tx.date}</p>
            </div>
            <span className={cn("text-sm font-bold", tx.type === "entrada" ? "text-emerald-500" : "text-red-500")}>
              {tx.amount}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
