"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Gavel,
  Calendar,
  FileText,
  Users,
  Wallet,
  Settings,
  ShieldCheck,
  ChevronLeft,
  Plus,
  List,
  BarChart3,
  Clock,
  FolderOpen,
  Receipt,
  CreditCard,
  UserPlus,
  PieChart,
  Building2,
  ScrollText,
  Menu,
  X,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { LexaIcon } from "@/shared/ui/logo";

// ─── Types ───────────────────────────────────────────────────
interface SubItem {
  name: string;
  href: string;
  icon: LucideIcon;
}

interface NavModule {
  name: string;
  icon: LucideIcon;
  href?: string;
  color: string;
  subItems?: SubItem[];
}

// ─── Navigation Config ──────────────────────────────────────
interface NavGroup {
  label: string;
  items: NavModule[];
}

const navGroups: NavGroup[] = [
  {
    label: "Principal",
    items: [
      { name: "Dashboard", icon: LayoutDashboard, href: "/dashboard", color: "text-[#C5A55A]" },
      { name: "Aruna IA", icon: Sparkles, href: "/aruna", color: "text-[#C5A55A]" },
    ],
  },
  {
    label: "Operacional",
    items: [
      {
        name: "Processos", icon: Gavel, color: "text-[#C5A55A]",
        subItems: [
          { name: "Todos os Processos", href: "/processes", icon: List },
          { name: "Novo Processo", href: "/processes/new", icon: Plus },
          { name: "Prazos", href: "/processes/deadlines", icon: Clock },
        ],
      },
      {
        name: "Agenda", icon: Calendar, color: "text-emerald-500",
        subItems: [
          { name: "Calendário", href: "/calendar", icon: Calendar },
          { name: "Compromissos", href: "/calendar/appointments", icon: Clock },
        ],
      },
      {
        name: "Documentos", icon: FileText, color: "text-violet-500",
        subItems: [
          { name: "Todos os Documentos", href: "/documents", icon: FolderOpen },
          { name: "Minutas", href: "/documents/drafts", icon: ScrollText },
        ],
      },
    ],
  },
  {
    label: "Relacionamento",
    items: [
      {
        name: "Clientes", icon: Users, color: "text-pink-500",
        subItems: [
          { name: "Lista de Clientes", href: "/crm", icon: Users },
          { name: "Novo Cliente", href: "/crm/new", icon: UserPlus },
        ],
      },
    ],
  },
  {
    label: "Inteligência",
    items: [
      { name: "Analytics", icon: BarChart3, href: "/analytics", color: "text-blue-500" },
    ],
  },
  {
    label: "Gestão",
    items: [
      {
        name: "Financeiro", icon: Wallet, color: "text-teal-500",
        subItems: [
          { name: "Visão Geral", href: "/finance", icon: PieChart },
          { name: "Honorários", href: "/finance/fees", icon: Receipt },
          { name: "Faturamento", href: "/finance/billing", icon: CreditCard },
        ],
      },
      {
        name: "Configurações", icon: Settings, color: "text-muted-foreground",
        subItems: [
          { name: "Meu Perfil", href: "/settings", icon: Users },
          { name: "Escritório", href: "/settings/office", icon: Building2 },
          { name: "Auditoria", href: "/backoffice/audit", icon: ScrollText },
        ],
      },
    ],
  },
];

const allModules = navGroups.flatMap(g => g.items);

// ─── Component ───────────────────────────────────────────────
export function Sidebar() {
  const pathname = usePathname();
  const [activeModule, setActiveModule] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setActiveModule(null);
  }, [pathname]);

  const currentModule = allModules.find((m) => {
    if (m.href && pathname === m.href) return true;
    if (m.subItems) return m.subItems.some((sub) => pathname.startsWith(sub.href));
    return false;
  });

  const expandedModule = activeModule
    ? allModules.find((m) => m.name === activeModule)
    : null;

  const showSubPanel = expandedModule?.subItems && expandedModule.subItems.length > 0;

  function handleModuleClick(module: NavModule) {
    if (module.href && !module.subItems) {
      setActiveModule(null);
      setMobileOpen(false);
    } else {
      setActiveModule(activeModule === module.name ? null : module.name);
    }
  }

  return (
    <>
      {/* ═══ MOBILE HAMBURGER ═══ */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="fixed left-4 top-3.5 z-[60] flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar text-sidebar-foreground shadow-md lg:hidden"
        aria-label="Menu"
      >
        {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </button>

      {/* ═══ MOBILE OVERLAY ═══ */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => { setMobileOpen(false); setActiveModule(null); }}
        />
      )}

      <div className="flex h-screen">
        {/* ═══ PRIMARY SIDEBAR (Icon Rail) ═══ */}
        <aside
          className={cn(
            "fixed left-0 top-0 z-50 flex h-screen w-[68px] flex-col items-center border-r border-border/40 bg-sidebar backdrop-blur-xl py-4 transition-transform duration-300",
            mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          )}
        >
          {/* Brand Logo */}
          <Link
            href="/dashboard"
            className="mb-8 flex h-10 w-10 items-center justify-center rounded-xl transition-transform hover:scale-105"
            onClick={() => setMobileOpen(false)}
          >
            <LexaIcon size={36} />
          </Link>

          {/* Module Icons grouped by Journey */}
          <nav className="flex flex-1 flex-col items-center gap-4 w-full px-2 overflow-y-auto no-scrollbar">
            {navGroups.map((group) => (
              <div key={group.label} className="w-full flex flex-col items-center gap-1.5">
                {/* Group Label (Hidden but used for structure) */}
                <span className="text-[8px] font-bold uppercase tracking-widest text-[#C5A55A]/30 mb-0.5 lg:block hidden">
                  {group.label.substring(0, 3)}
                </span>

                {group.items.map((module) => {
                  const isActive = currentModule?.name === module.name;
                  const isExpanded = activeModule === module.name;
                  const linkHref = module.href || "#";

                  const btnEl = (
                    <button
                      key={module.name}
                      title={module.name}
                      onClick={() => handleModuleClick(module)}
                      className={cn(
                        "sidebar-nav-link relative flex h-11 w-11 items-center justify-center rounded-xl transition-all duration-300",
                        isActive || isExpanded
                          ? "bg-white/10 text-sidebar-primary shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]"
                          : "text-sidebar-foreground/45 hover:bg-white/5 hover:text-sidebar-foreground"
                      )}
                    >
                      <module.icon
                        className={cn(
                          "sidebar-icon h-5 w-5 transition-all duration-300",
                          (isActive || isExpanded) ? module.color : "opacity-70 group-hover:opacity-100"
                        )}
                      />
                      {isActive && (
                        <div className="absolute right-0 top-1/2 h-6 w-[2px] -translate-y-1/2 rounded-l-full bg-sidebar-primary shadow-[0_0_8px_rgba(197,165,90,0.5)]" />
                      )}
                    </button>
                  );

                  if (module.href && !module.subItems) {
                    return (
                      <Link key={module.name} href={linkHref} onClick={() => setMobileOpen(false)} title={module.name}>
                        {btnEl}
                      </Link>
                    );
                  }

                  return <div key={module.name}>{btnEl}</div>;
                })}
                {/* Visual Separator */}
                <div className="h-px w-4 bg-white/5 my-1" />
              </div>
            ))}
          </nav>

          <div className="mt-auto pt-4 border-t border-sidebar-border">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-accent/30">
              <span className="text-[10px] font-bold text-[#C5A55A]">v1</span>
            </div>
          </div>
        </aside>

        {/* ═══ SECONDARY SIDEBAR (Sub-menu Panel) ═══ */}
        <aside
          className={cn(
            "fixed left-[68px] top-0 z-40 h-screen border-r border-border/40 bg-sidebar/95 backdrop-blur-xl transition-all duration-300 ease-in-out overflow-hidden",
            showSubPanel ? "w-56 opacity-100" : "w-0 opacity-0"
          )}
        >
          {expandedModule?.subItems && (
            <div className="flex h-full w-56 flex-col">
              <div className="flex items-center justify-between border-b border-sidebar-border px-4 py-5">
                <div className="flex items-center gap-2.5">
                  <expandedModule.icon className={cn("h-4 w-4", expandedModule.color)} />
                  <h2 className="text-sm font-semibold tracking-tight">{expandedModule.name}</h2>
                </div>
                <button
                  onClick={() => setActiveModule(null)}
                  className="rounded-md p-1 text-muted-foreground hover:bg-sidebar-accent/50 hover:text-foreground transition-colors"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
              </div>

              <nav className="flex-1 space-y-0.5 p-3">
                {expandedModule.subItems.map((item) => {
                  const isSubActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-[13px] font-medium transition-all duration-150",
                        isSubActive
                          ? "bg-[#C5A55A]/10 text-[#C5A55A]"
                          : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-foreground"
                      )}
                    >
                      <item.icon className={cn("h-4 w-4", isSubActive ? "text-[#C5A55A]" : "text-muted-foreground/60")} />
                      {item.name}
                    </Link>
                  );
                })}
              </nav>
            </div>
          )}
        </aside>

        {/* Click-outside overlay for sub-panel (desktop) */}
        {showSubPanel && (
          <div className="fixed inset-0 z-30 hidden lg:block" onClick={() => setActiveModule(null)} />
        )}
      </div>
    </>
  );
}
