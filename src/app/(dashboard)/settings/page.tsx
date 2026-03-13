"use client";

import { UserButton, OrganizationProfile } from "@clerk/nextjs";
import { Settings as SettingsIcon, User, Building2, Palette, Bell } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Configurações</h1>
        <p className="text-sm text-muted-foreground">Gerencie seu perfil e preferências do escritório.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Quick settings */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Atalhos</h3>

          <div className="space-y-2">
            {[
              { icon: User, label: "Perfil Pessoal", desc: "Nome, email e avatar" },
              { icon: Building2, label: "Organização", desc: "Equipe e configurações" },
              { icon: Palette, label: "Aparência", desc: "Tema e customizações" },
              { icon: Bell, label: "Notificações", desc: "Email e push alerts" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3 rounded-xl border border-border/40 bg-card p-4 hover:border-[#C5A55A]/30 transition-colors cursor-pointer">
                <div className="rounded-lg bg-accent/50 p-2">
                  <item.icon className="h-4 w-4 text-[#C5A55A]" />
                </div>
                <div>
                  <p className="text-sm font-semibold">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Clerk Organization Profile */}
        <div className="lg:col-span-2">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-4">
            Gerenciamento da Organização
          </h3>
          <div className="rounded-2xl border border-border/40 bg-card p-6 flex items-center justify-center min-h-[400px]">
            <OrganizationProfile
              routing="hash"
              appearance={{
                elements: {
                  rootBox: "w-full",
                  card: "shadow-none border-none bg-transparent",
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
