"use client";

import { UserButton, OrganizationSwitcher } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import {
  LayoutDashboard,
  Gavel,
  Calendar,
  FileText,
  Users,
  Wallet,
  ShieldCheck,
  Settings,
  Sun,
  Moon,
  ChevronRight,
} from "lucide-react";

const routeLabels: Record<string, { label: string; icon: React.ElementType }> = {
  "/dashboard": { label: "Dashboard", icon: LayoutDashboard },
  "/processes": { label: "Processos", icon: Gavel },
  "/calendar": { label: "Agenda", icon: Calendar },
  "/documents": { label: "Documentos", icon: FileText },
  "/crm": { label: "CRM", icon: Users },
  "/finance": { label: "Financeiro", icon: Wallet },
  "/backoffice": { label: "Backoffice", icon: ShieldCheck },
  "/settings": { label: "Configurações", icon: Settings },
};

function getRouteInfo(pathname: string) {
  if (routeLabels[pathname]) return routeLabels[pathname];
  const match = Object.entries(routeLabels).find(
    ([key]) => key !== "/dashboard" && pathname.startsWith(key)
  );
  return match ? match[1] : routeLabels["/dashboard"];
}

function getBreadcrumbs(pathname: string) {
  const parts = pathname.split("/").filter(Boolean);
  const crumbs: { label: string; href: string }[] = [];
  let path = "";
  for (const part of parts) {
    path += `/${part}`;
    const info = routeLabels[path];
    if (info) {
      crumbs.push({ label: info.label, href: path });
    } else {
      // Sub-pages
      const labels: Record<string, string> = {
        new: "Novo",
        edit: "Editar",
        drafts: "Minutas",
        contracts: "Contratos",
        appointments: "Compromissos",
        fees: "Honorários",
        billing: "Faturamento",
        audit: "Auditoria",
        pipeline: "Pipeline",
        deadlines: "Prazos",
      };
      crumbs.push({ label: labels[part] || part, href: path });
    }
  }
  return crumbs;
}

export function Header() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const route = getRouteInfo(pathname);
  const Icon = route.icon;
  const breadcrumbs = getBreadcrumbs(pathname);

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-border/30 bg-background/80 px-6 backdrop-blur-xl">
      {/* Left: Breadcrumbs */}
      <div className="flex items-center gap-1.5 text-sm min-w-0">
        <Icon className="h-4 w-4 text-[#C5A55A] shrink-0" />
        {breadcrumbs.map((crumb, idx) => (
          <span key={crumb.href} className="flex items-center gap-1.5 min-w-0">
            {idx > 0 && <ChevronRight className="h-3 w-3 text-muted-foreground/40 shrink-0" />}
            <span
              className={
                idx === breadcrumbs.length - 1
                  ? "font-semibold truncate"
                  : "text-muted-foreground truncate"
              }
            >
              {crumb.label}
            </span>
          </span>
        ))}
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-3">
        {/* Dark Mode Toggle */}
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="rounded-lg p-2 text-muted-foreground hover:bg-accent/50 hover:text-foreground transition-colors"
          aria-label="Alternar tema"
        >
          {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>

        <OrganizationSwitcher
          hidePersonal
          appearance={{
            elements: {
              rootBox: "flex items-center",
              organizationSwitcherTrigger:
                "rounded-lg border border-border/50 px-3 py-1.5 text-xs hover:bg-accent/50 transition-colors",
            },
          }}
        />
        <UserButton
          appearance={{
            elements: {
              avatarBox: "h-7 w-7",
            },
          }}
        />
      </div>
    </header>
  );
}
