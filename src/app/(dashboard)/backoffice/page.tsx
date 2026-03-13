import { Building2, ScrollText, Shield, Users } from "lucide-react";
import { createSupabaseServerClient } from "@/shared/api/supabase/server";

export default async function BackofficePage() {
  const supabase = await createSupabaseServerClient();

  const { data: tenants } = await supabase.from("tenants").select("*").order("created_at", { ascending: false });
  const { data: profiles } = await supabase.from("profiles").select("*");
  const { count: auditCount } = await supabase.from("universal_audit_logs").select("*", { count: "exact", head: true });

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Backoffice</h1>
        <p className="text-sm text-muted-foreground">Administração de tenants e segurança do sistema.</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-border/40 bg-card p-5">
          <div className="flex items-center gap-2 text-[#C5A55A] mb-2">
            <Building2 className="h-4 w-4" /> <span className="text-xs font-semibold uppercase">Tenants</span>
          </div>
          <h3 className="text-2xl font-bold">{tenants?.length ?? 0}</h3>
        </div>
        <div className="rounded-2xl border border-border/40 bg-card p-5">
          <div className="flex items-center gap-2 text-blue-500 mb-2">
            <Users className="h-4 w-4" /> <span className="text-xs font-semibold uppercase">Usuários</span>
          </div>
          <h3 className="text-2xl font-bold">{profiles?.length ?? 0}</h3>
        </div>
        <div className="rounded-2xl border border-border/40 bg-card p-5">
          <div className="flex items-center gap-2 text-emerald-500 mb-2">
            <ScrollText className="h-4 w-4" /> <span className="text-xs font-semibold uppercase">Logs de Auditoria</span>
          </div>
          <h3 className="text-2xl font-bold">{auditCount ?? 0}</h3>
        </div>
      </div>

      {/* Tenants list */}
      {tenants && tenants.length > 0 && (
        <div className="rounded-2xl border border-border/40 bg-card overflow-hidden">
          <div className="border-b border-border/30 p-4">
            <h3 className="text-sm font-semibold flex items-center gap-2">
              <Shield className="h-4 w-4 text-[#C5A55A]" /> Tenants Registrados
            </h3>
          </div>
          {tenants.map((t, idx) => (
            <div key={t.id} className={`flex items-center justify-between p-4 ${idx < tenants.length - 1 ? "border-b border-border/30" : ""}`}>
              <div>
                <p className="text-sm font-semibold">{t.name || t.slug}</p>
                <p className="text-xs text-muted-foreground font-mono">{t.clerk_org_id}</p>
              </div>
              <span className="text-xs font-bold text-[#C5A55A] uppercase bg-[#C5A55A]/10 px-2 py-0.5 rounded-full">
                {t.plan}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
