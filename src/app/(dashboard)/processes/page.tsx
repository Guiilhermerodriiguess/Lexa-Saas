import { createSupabaseServerClient } from "@/shared/api/supabase/server";
import Link from "next/link";
import { Plus, Gavel, Search, MoreVertical } from "lucide-react";
import { cn } from "@/shared/lib/utils";

const statusColors: Record<string, string> = {
  active: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  archived: "bg-gray-500/10 text-gray-600 dark:text-gray-400",
  closed: "bg-red-500/10 text-red-600 dark:text-red-400",
  suspended: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
};

const statusLabels: Record<string, string> = {
  active: "Ativo", archived: "Arquivado", closed: "Encerrado", suspended: "Suspenso",
};

const typeLabels: Record<string, string> = {
  judicial: "Judicial", administrative: "Administrativo", consultation: "Consulta",
};

interface Props {
  searchParams: Promise<{ q?: string; status?: string }>;
}

export default async function ProcessesPage({ searchParams }: Props) {
  const params = await searchParams;
  const query = params.q || "";
  const statusFilter = params.status || "";

  const supabase = await createSupabaseServerClient();

  let request = supabase
    .from("processes")
    .select("*")
    .order("created_at", { ascending: false });

  if (query) {
    request = request.or(
      `title.ilike.%${query}%,process_number.ilike.%${query}%,client_name.ilike.%${query}%`
    );
  }

  if (statusFilter) {
    request = request.eq("status", statusFilter);
  }

  const { data: processes, error } = await request;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Processos</h1>
          <p className="text-sm text-muted-foreground">
            Gerencie todos os processos jurídicos do escritório.
          </p>
        </div>
        <Link
          href="/processes/new"
          className="inline-flex items-center gap-2 rounded-xl bg-[#C5A55A] px-4 py-2.5 text-sm font-semibold text-[#0C1220] shadow-sm transition-all hover:bg-[#D4BA7A] active:scale-[0.98]"
        >
          <Plus className="h-4 w-4" />
          Novo Processo
        </Link>
      </div>

      {/* Search + Filters */}
      <form className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            name="q"
            defaultValue={query}
            placeholder="Buscar por título, número, cliente..."
            className="w-full rounded-xl border border-border/50 bg-background py-2.5 pl-10 pr-4 text-sm placeholder:text-muted-foreground/60 focus:border-[#C5A55A]/50 focus:outline-none focus:ring-2 focus:ring-[#C5A55A]/20 transition-all"
          />
        </div>
        <select
          name="status"
          defaultValue={statusFilter}
          className="rounded-xl border border-border/50 bg-background px-3 py-2.5 text-sm focus:border-[#C5A55A]/50 focus:outline-none focus:ring-2 focus:ring-[#C5A55A]/20 transition-all"
        >
          <option value="">Todos os Status</option>
          <option value="active">Ativo</option>
          <option value="archived">Arquivado</option>
          <option value="closed">Encerrado</option>
          <option value="suspended">Suspenso</option>
        </select>
        <button
          type="submit"
          className="rounded-xl bg-accent/50 px-4 py-2.5 text-sm font-medium hover:bg-accent transition-colors"
        >
          Filtrar
        </button>
      </form>

      {/* Results count */}
      {(query || statusFilter) && (
        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            {processes?.length ?? 0} resultado(s)
            {query && <> para &quot;{query}&quot;</>}
            {statusFilter && <> • Status: {statusLabels[statusFilter]}</>}
          </p>
          <Link href="/processes" className="text-xs text-[#C5A55A] hover:underline">
            Limpar filtros
          </Link>
        </div>
      )}

      {/* Process list */}
      {error ? (
        <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-6 text-center">
          <p className="text-sm text-destructive">Erro ao carregar processos: {error.message}</p>
        </div>
      ) : !processes || processes.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border/60 bg-accent/10 py-16">
          <div className="rounded-2xl bg-accent/30 p-4">
            <Gavel className="h-8 w-8 text-muted-foreground/50" />
          </div>
          <h3 className="mt-4 text-lg font-semibold">
            {query ? "Nenhum resultado encontrado" : "Nenhum processo encontrado"}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {query ? "Tente outros termos de busca." : "Crie seu primeiro processo para começar."}
          </p>
          {!query && (
            <Link href="/processes/new" className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#C5A55A] px-4 py-2 text-sm font-semibold text-[#0C1220] transition-all hover:bg-[#D4BA7A]">
              <Plus className="h-4 w-4" /> Criar Processo
            </Link>
          )}
        </div>
      ) : (
        <div className="rounded-2xl border border-border/40 bg-card overflow-hidden">
          {processes.map((process, idx) => (
            <Link
              key={process.id}
              href={`/processes/${process.id}`}
              className={cn(
                "group flex items-center justify-between p-4 transition-colors hover:bg-accent/30",
                idx < processes.length - 1 && "border-b border-border/30"
              )}
            >
              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold truncate">{process.title}</p>
                  <span className={cn("inline-flex rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide shrink-0", statusColors[process.status] || statusColors.active)}>
                    {statusLabels[process.status] || process.status}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  {process.process_number && <span className="font-mono">{process.process_number}</span>}
                  <span>{typeLabels[process.type] || process.type}</span>
                  {process.court && <span>• {process.court}</span>}
                  {process.client_name && <span className="hidden sm:inline">• {process.client_name}</span>}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground hidden md:inline">
                  {new Date(process.created_at).toLocaleDateString("pt-BR")}
                </span>
                <MoreVertical className="h-4 w-4 text-muted-foreground/40 group-hover:text-muted-foreground transition-colors" />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
