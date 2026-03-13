import { createSupabaseServerClient } from "@/shared/api/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Edit,
  Calendar,
  User,
  Building,
  MapPin,
  FileText,
  Hash,
} from "lucide-react";
import { cn } from "@/shared/lib/utils";

const statusColors: Record<string, string> = {
  active: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  archived: "bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-500/20",
  closed: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
  suspended: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
};

const statusLabels: Record<string, string> = {
  active: "Ativo",
  archived: "Arquivado",
  closed: "Encerrado",
  suspended: "Suspenso",
};

const typeLabels: Record<string, string> = {
  judicial: "Judicial",
  administrative: "Administrativo",
  consultation: "Consulta",
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProcessDetailPage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createSupabaseServerClient();

  const { data: process, error } = await supabase
    .from("processes")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !process) notFound();

  return (
    <div className="mx-auto max-w-3xl space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/processes"
            className="rounded-lg p-2 text-muted-foreground hover:bg-accent/50 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              {process.title}
            </h1>
            <div className="mt-1 flex items-center gap-2">
              <span
                className={cn(
                  "inline-flex rounded-full border px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide",
                  statusColors[process.status] || statusColors.active
                )}
              >
                {statusLabels[process.status] || process.status}
              </span>
              <span className="text-xs text-muted-foreground">
                {typeLabels[process.type] || process.type}
              </span>
            </div>
          </div>
        </div>
        <Link
          href={`/processes/${id}/edit`}
          className="inline-flex items-center gap-2 rounded-xl border border-border/50 px-4 py-2 text-sm font-medium text-foreground hover:bg-accent/50 transition-colors"
        >
          <Edit className="h-4 w-4" />
          Editar
        </Link>
      </div>

      {/* Details */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Card: Dados do Processo */}
        <div className="rounded-2xl border border-border/40 bg-card p-6 space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Dados do Processo
          </h2>
          <div className="space-y-3">
            {process.process_number && (
              <InfoRow icon={Hash} label="Número" value={process.process_number} mono />
            )}
            {process.court && (
              <InfoRow icon={Building} label="Tribunal" value={process.court} />
            )}
            {process.jurisdiction && (
              <InfoRow icon={MapPin} label="Jurisdição" value={process.jurisdiction} />
            )}
            {process.folder_number && (
              <InfoRow icon={FileText} label="Pasta" value={process.folder_number} />
            )}
          </div>
        </div>

        {/* Card: Partes */}
        <div className="rounded-2xl border border-border/40 bg-card p-6 space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Partes Envolvidas
          </h2>
          <div className="space-y-3">
            {process.client_name && (
              <InfoRow icon={User} label="Cliente" value={process.client_name} />
            )}
            {process.opposing_party && (
              <InfoRow icon={User} label="Parte Contrária" value={process.opposing_party} />
            )}
          </div>
          {!process.client_name && !process.opposing_party && (
            <p className="text-sm text-muted-foreground/60 italic">
              Nenhuma parte cadastrada.
            </p>
          )}
        </div>
      </div>

      {/* Dates */}
      <div className="rounded-2xl border border-border/40 bg-card p-6 space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Datas
        </h2>
        <div className="grid gap-3 sm:grid-cols-3">
          <InfoRow
            icon={Calendar}
            label="Criado em"
            value={new Date(process.created_at).toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          />
          {process.filed_at && (
            <InfoRow
              icon={Calendar}
              label="Distribuído em"
              value={new Date(process.filed_at).toLocaleDateString("pt-BR")}
            />
          )}
          {process.closed_at && (
            <InfoRow
              icon={Calendar}
              label="Encerrado em"
              value={new Date(process.closed_at).toLocaleDateString("pt-BR")}
            />
          )}
        </div>
      </div>

      {/* Notes */}
      {process.notes && (
        <div className="rounded-2xl border border-border/40 bg-card p-6 space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Observações
          </h2>
          <p className="text-sm leading-relaxed whitespace-pre-wrap text-foreground/80">
            {process.notes}
          </p>
        </div>
      )}
    </div>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value,
  mono,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="mt-0.5 h-4 w-4 text-muted-foreground/60 shrink-0" />
      <div>
        <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
          {label}
        </p>
        <p className={cn("text-sm", mono && "font-mono")}>{value}</p>
      </div>
    </div>
  );
}
