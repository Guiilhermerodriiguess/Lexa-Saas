"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Gavel, 
  Calendar, 
  FileText, 
  Users, 
  Wallet, 
  Settings,
  ShieldCheck
} from "lucide-react";
import { cn } from "@/shared/lib/utils";

const navItems = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Processos", href: "/processes", icon: Gavel },
  { name: "Agenda", href: "/calendar", icon: Calendar },
  { name: "Documentos", href: "/documents", icon: FileText },
  { name: "CRM", href: "/crm", icon: Users },
  { name: "Financeiro", href: "/finance", icon: Wallet },
  { name: "Backoffice", href: "/backoffice", icon: ShieldCheck },
  { name: "Configurações", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-border/50 bg-background/60 backdrop-blur-xl transition-all duration-300">
      <div className="flex h-full flex-col px-4 py-8">
        <div className="mb-10 px-2">
          <h1 className="text-2xl font-bold tracking-tighter text-foreground">
            LEXA<span className="text-primary/60">SAAS</span>
          </h1>
          <p className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground/60">
            Legal Operating System
          </p>
        </div>

        <nav className="flex-1 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                  isActive 
                    ? "bg-primary/10 text-primary shadow-[0_0_15px_rgba(0,0,0,0.05)]" 
                    : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                )}
              >
                <item.icon className={cn(
                  "h-5 w-5 transition-transform duration-200 group-hover:scale-110",
                  isActive ? "text-primary" : "text-muted-foreground/60 group-hover:text-foreground"
                )} />
                {item.name}
                {isActive && (
                  <div className="ml-auto h-1.5 w-1.5 rounded-full bg-primary" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto border-t border-border/40 pt-6">
          <div className="rounded-xl border border-border/40 bg-accent/30 p-4 backdrop-blur-sm">
            <p className="text-xs font-semibold text-foreground/80">Plano Premium</p>
            <p className="mt-1 text-[10px] text-muted-foreground">Suporte 24/7 Ativado</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
