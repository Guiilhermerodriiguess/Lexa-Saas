import { UserPlus, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NewClientPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-3">
        <Link href="/crm" className="rounded-lg p-2 text-muted-foreground hover:bg-accent/50 transition-colors">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Novo Cliente</h1>
          <p className="text-sm text-muted-foreground">Cadastre um novo cliente no CRM.</p>
        </div>
      </div>

      <form className="space-y-6">
        <div className="rounded-2xl border border-border/40 bg-card p-6 space-y-5">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Informações Pessoais</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Nome Completo *</label>
              <input className="w-full rounded-xl border border-border/50 bg-background px-4 py-2.5 text-sm focus:border-[#C5A55A]/50 focus:outline-none focus:ring-2 focus:ring-[#C5A55A]/20 transition-all" placeholder="Nome do cliente" />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">CPF/CNPJ</label>
              <input className="w-full rounded-xl border border-border/50 bg-background px-4 py-2.5 text-sm font-mono focus:border-[#C5A55A]/50 focus:outline-none focus:ring-2 focus:ring-[#C5A55A]/20 transition-all" placeholder="000.000.000-00" />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Email</label>
              <input type="email" className="w-full rounded-xl border border-border/50 bg-background px-4 py-2.5 text-sm focus:border-[#C5A55A]/50 focus:outline-none focus:ring-2 focus:ring-[#C5A55A]/20 transition-all" placeholder="email@exemplo.com" />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Telefone</label>
              <input className="w-full rounded-xl border border-border/50 bg-background px-4 py-2.5 text-sm focus:border-[#C5A55A]/50 focus:outline-none focus:ring-2 focus:ring-[#C5A55A]/20 transition-all" placeholder="(00) 00000-0000" />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border/40 bg-card p-6 space-y-5">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Endereço</h2>
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Endereço Completo</label>
            <input className="w-full rounded-xl border border-border/50 bg-background px-4 py-2.5 text-sm focus:border-[#C5A55A]/50 focus:outline-none focus:ring-2 focus:ring-[#C5A55A]/20 transition-all" placeholder="Rua, número, bairro, cidade - UF" />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Observações</label>
            <textarea rows={3} className="w-full rounded-xl border border-border/50 bg-background px-4 py-3 text-sm focus:border-[#C5A55A]/50 focus:outline-none focus:ring-2 focus:ring-[#C5A55A]/20 transition-all resize-none" placeholder="Notas sobre o cliente..." />
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Link href="/crm" className="rounded-xl border border-border/50 px-5 py-2.5 text-sm font-medium text-muted-foreground hover:bg-accent/50 transition-colors">Cancelar</Link>
          <button type="submit" className="inline-flex items-center gap-2 rounded-xl bg-[#C5A55A] px-5 py-2.5 text-sm font-semibold text-[#0C1220] shadow-sm transition-all hover:bg-[#D4BA7A] active:scale-[0.98]">
            <UserPlus className="h-4 w-4" />
            Salvar Cliente
          </button>
        </div>
      </form>
    </div>
  );
}
