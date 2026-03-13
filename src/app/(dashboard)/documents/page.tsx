import { FileText, FolderOpen, Search, Plus, Upload, MoreVertical } from "lucide-react";
import { cn } from "@/shared/lib/utils";

const mockDocuments = [
  { name: "Petição Inicial — Silva vs. Santos", type: "Petição", size: "2.4 MB", updatedAt: "Hoje, 14:30", icon: "📄" },
  { name: "Contrato de Honorários — Oliveira", type: "Contrato", size: "456 KB", updatedAt: "Ontem", icon: "📋" },
  { name: "Procuração — Maria Souza", type: "Procuração", size: "128 KB", updatedAt: "08/03/2026", icon: "📜" },
  { name: "Acordo Extrajudicial — Tech Corp", type: "Acordo", size: "1.1 MB", updatedAt: "05/03/2026", icon: "🤝" },
  { name: "Recurso Ordinário — Processo #0042", type: "Recurso", size: "3.2 MB", updatedAt: "01/03/2026", icon: "⚖️" },
];

export default function DocumentsPage() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Documentos</h1>
          <p className="text-sm text-muted-foreground">
            Gerencie petições, contratos, minutas e demais documentos.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-2 rounded-xl border border-border/50 px-4 py-2.5 text-sm font-medium hover:bg-accent/50 transition-colors">
            <Upload className="h-4 w-4" />
            Upload
          </button>
          <button className="inline-flex items-center gap-2 rounded-xl bg-[#C5A55A] px-4 py-2.5 text-sm font-semibold text-[#0C1220] shadow-sm transition-all hover:bg-[#D4BA7A] active:scale-[0.98]">
            <Plus className="h-4 w-4" />
            Novo Documento
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Buscar documentos..."
          className="w-full rounded-xl border border-border/50 bg-background py-2.5 pl-10 pr-4 text-sm placeholder:text-muted-foreground/60 focus:border-[#C5A55A]/50 focus:outline-none focus:ring-2 focus:ring-[#C5A55A]/20 transition-all"
        />
      </div>

      {/* Document list */}
      <div className="rounded-2xl border border-border/40 bg-card overflow-hidden">
        {mockDocuments.map((doc, idx) => (
          <div
            key={doc.name}
            className={cn(
              "flex items-center justify-between p-4 hover:bg-accent/30 transition-colors cursor-pointer",
              idx < mockDocuments.length - 1 && "border-b border-border/30"
            )}
          >
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <span className="text-2xl">{doc.icon}</span>
              <div className="min-w-0">
                <p className="text-sm font-semibold truncate">{doc.name}</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{doc.type}</span>
                  <span>•</span>
                  <span>{doc.size}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground hidden sm:inline">{doc.updatedAt}</span>
              <MoreVertical className="h-4 w-4 text-muted-foreground/40" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
