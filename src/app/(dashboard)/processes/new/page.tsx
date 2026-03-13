"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createProcess } from "@/features/process/create/actions";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function NewProcessPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const form = new FormData(e.currentTarget);

    const result = await createProcess({
      title: form.get("title") as string,
      process_number: (form.get("process_number") as string) || null,
      type: (form.get("type") as "judicial" | "administrative" | "consultation") || undefined,
      court: (form.get("court") as string) || null,
      jurisdiction: (form.get("jurisdiction") as string) || null,
      client_name: (form.get("client_name") as string) || null,
      opposing_party: (form.get("opposing_party") as string) || null,
      notes: (form.get("notes") as string) || null,
    });

    if (result.error) {
      toast.error("Erro ao criar processo", { description: result.error });
      setLoading(false);
    } else {
      toast.success("Processo criado com sucesso!");
      router.push("/processes");
      router.refresh();
    }
  }

  const inputClass =
    "w-full rounded-xl border border-border/50 bg-background px-4 py-2.5 text-sm placeholder:text-muted-foreground/50 focus:border-[#C5A55A]/50 focus:outline-none focus:ring-2 focus:ring-[#C5A55A]/20 transition-all";

  return (
    <div className="mx-auto max-w-2xl space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-3">
        <Link href="/processes" className="rounded-lg p-2 text-muted-foreground hover:bg-accent/50 transition-colors">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Novo Processo</h1>
          <p className="text-sm text-muted-foreground">Preencha as informações do novo processo jurídico.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="rounded-2xl border border-border/40 bg-card p-6 space-y-5">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Informações Principais
          </h2>

          <div className="space-y-1.5">
            <label htmlFor="title" className="text-sm font-medium">Título do Processo *</label>
            <input id="title" name="title" required placeholder="Ex: Ação Indenizatória - Silva vs. Santos" className={inputClass} />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label htmlFor="process_number" className="text-sm font-medium">Número do Processo</label>
              <input id="process_number" name="process_number" placeholder="0001234-56.2024.8.26.0000" className={`${inputClass} font-mono`} />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="type" className="text-sm font-medium">Tipo</label>
              <select id="type" name="type" defaultValue="judicial" className={inputClass}>
                <option value="judicial">Judicial</option>
                <option value="administrative">Administrativo</option>
                <option value="consultation">Consulta</option>
              </select>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label htmlFor="court" className="text-sm font-medium">Tribunal / Vara</label>
              <input id="court" name="court" placeholder="TJSP - 1ª Vara Cível" className={inputClass} />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="jurisdiction" className="text-sm font-medium">Jurisdição</label>
              <input id="jurisdiction" name="jurisdiction" placeholder="São Paulo - SP" className={inputClass} />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border/40 bg-card p-6 space-y-5">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Partes Envolvidas</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label htmlFor="client_name" className="text-sm font-medium">Cliente</label>
              <input id="client_name" name="client_name" placeholder="Nome do cliente" className={inputClass} />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="opposing_party" className="text-sm font-medium">Parte Contrária</label>
              <input id="opposing_party" name="opposing_party" placeholder="Nome da parte contrária" className={inputClass} />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border/40 bg-card p-6 space-y-5">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Observações</h2>
          <textarea name="notes" rows={4} placeholder="Notas adicionais sobre o processo..." className={`${inputClass} resize-none`} />
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <Link href="/processes" className="rounded-xl border border-border/50 px-5 py-2.5 text-sm font-medium text-muted-foreground hover:bg-accent/50 transition-colors">
            Cancelar
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-xl bg-[#C5A55A] px-5 py-2.5 text-sm font-semibold text-[#0C1220] shadow-sm transition-all hover:bg-[#D4BA7A] disabled:opacity-50 active:scale-[0.98]"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            {loading ? "Salvando..." : "Salvar Processo"}
          </button>
        </div>
      </form>
    </div>
  );
}
