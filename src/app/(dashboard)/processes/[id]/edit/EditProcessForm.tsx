"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { updateProcess } from "@/features/process/update/actions";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import Link from "next/link";
import type { Process } from "@/entities/process";

interface EditProcessFormProps {
  process: Process;
}

function EditProcessForm({ process }: EditProcessFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const form = new FormData(e.currentTarget);

    const result = await updateProcess(process.id, {
      title: form.get("title") as string,
      process_number: (form.get("process_number") as string) || null,
      status: form.get("status") as "active" | "archived" | "closed" | "suspended",
      type: form.get("type") as "judicial" | "administrative" | "consultation",
      court: (form.get("court") as string) || null,
      jurisdiction: (form.get("jurisdiction") as string) || null,
      client_name: (form.get("client_name") as string) || null,
      opposing_party: (form.get("opposing_party") as string) || null,
      notes: (form.get("notes") as string) || null,
    });

    if (result.error) {
      setError(result.error);
      setLoading(false);
    } else {
      router.push(`/processes/${process.id}`);
      router.refresh();
    }
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-3">
        <Link
          href={`/processes/${process.id}`}
          className="rounded-lg p-2 text-muted-foreground hover:bg-accent/50 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Editar Processo</h1>
          <p className="text-sm text-muted-foreground">{process.title}</p>
        </div>
      </div>

      {error && (
        <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="rounded-2xl border border-border/40 bg-card p-6 space-y-5">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Informações Principais
          </h2>

          <div className="space-y-1.5">
            <label htmlFor="title" className="text-sm font-medium">
              Título *
            </label>
            <input
              id="title"
              name="title"
              required
              defaultValue={process.title}
              className="w-full rounded-xl border border-border/50 bg-background px-4 py-2.5 text-sm focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label htmlFor="process_number" className="text-sm font-medium">
                Número do Processo
              </label>
              <input
                id="process_number"
                name="process_number"
                defaultValue={process.process_number ?? ""}
                className="w-full rounded-xl border border-border/50 bg-background px-4 py-2.5 text-sm font-mono focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="status" className="text-sm font-medium">
                Status
              </label>
              <select
                id="status"
                name="status"
                defaultValue={process.status}
                className="w-full rounded-xl border border-border/50 bg-background px-4 py-2.5 text-sm focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              >
                <option value="active">Ativo</option>
                <option value="archived">Arquivado</option>
                <option value="closed">Encerrado</option>
                <option value="suspended">Suspenso</option>
              </select>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label htmlFor="type" className="text-sm font-medium">Tipo</label>
              <select
                id="type"
                name="type"
                defaultValue={process.type}
                className="w-full rounded-xl border border-border/50 bg-background px-4 py-2.5 text-sm focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              >
                <option value="judicial">Judicial</option>
                <option value="administrative">Administrativo</option>
                <option value="consultation">Consulta</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label htmlFor="court" className="text-sm font-medium">Tribunal</label>
              <input
                id="court"
                name="court"
                defaultValue={process.court ?? ""}
                className="w-full rounded-xl border border-border/50 bg-background px-4 py-2.5 text-sm focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="jurisdiction" className="text-sm font-medium">Jurisdição</label>
            <input
              id="jurisdiction"
              name="jurisdiction"
              defaultValue={process.jurisdiction ?? ""}
              className="w-full rounded-xl border border-border/50 bg-background px-4 py-2.5 text-sm focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>
        </div>

        <div className="rounded-2xl border border-border/40 bg-card p-6 space-y-5">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Partes Envolvidas
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label htmlFor="client_name" className="text-sm font-medium">Cliente</label>
              <input
                id="client_name"
                name="client_name"
                defaultValue={process.client_name ?? ""}
                className="w-full rounded-xl border border-border/50 bg-background px-4 py-2.5 text-sm focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="opposing_party" className="text-sm font-medium">Parte Contrária</label>
              <input
                id="opposing_party"
                name="opposing_party"
                defaultValue={process.opposing_party ?? ""}
                className="w-full rounded-xl border border-border/50 bg-background px-4 py-2.5 text-sm focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border/40 bg-card p-6 space-y-5">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Observações
          </h2>
          <textarea
            name="notes"
            rows={4}
            defaultValue={process.notes ?? ""}
            className="w-full rounded-xl border border-border/50 bg-background px-4 py-3 text-sm focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
          />
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <Link
            href={`/processes/${process.id}`}
            className="rounded-xl border border-border/50 px-5 py-2.5 text-sm font-medium text-muted-foreground hover:bg-accent/50 transition-colors"
          >
            Cancelar
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md disabled:opacity-50 active:scale-[0.98]"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            {loading ? "Salvando..." : "Salvar Alterações"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProcessForm;
