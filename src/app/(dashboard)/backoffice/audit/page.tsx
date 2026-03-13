import { ScrollText, Search } from "lucide-react";
import { createSupabaseServerClient } from "@/shared/api/supabase/server";
import { cn } from "@/shared/lib/utils";

export default async function AuditPage() {
  const supabase = await createSupabaseServerClient();

  const { data: logs } = await supabase
    .from("universal_audit_logs")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(20);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Auditoria</h1>
        <p className="text-sm text-muted-foreground">Logs de atividades e alterações no sistema.</p>
      </div>

      {!logs || logs.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border/60 bg-accent/10 py-20">
          <ScrollText className="h-8 w-8 text-muted-foreground/50" />
          <h3 className="mt-4 text-lg font-semibold">Nenhum log registrado</h3>
          <p className="mt-1 text-sm text-muted-foreground">Os logs de auditoria aparecerão aqui conforme ações forem realizadas.</p>
        </div>
      ) : (
        <div className="rounded-2xl border border-border/40 bg-card overflow-hidden">
          {logs.map((log, idx) => (
            <div key={log.id} className={cn("p-4 hover:bg-accent/30 transition-colors", idx < logs.length - 1 && "border-b border-border/30")}>
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">{log.action}</p>
                <span className="text-xs text-muted-foreground">{new Date(log.created_at).toLocaleString("pt-BR")}</span>
              </div>
              {log.new_data && (
                <p className="mt-1 text-xs text-muted-foreground">
                  {typeof log.new_data === "string" ? log.new_data : JSON.stringify(log.new_data, null, 0)}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
