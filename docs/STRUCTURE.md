# Estrutura de Pastas - LEXA-SAAS (Feature-Sliced Design)

Esta estrutura foi desenhada por **Marcus (Arquiteto)** e aprovada por **Jean (CTO)** para garantir escalabilidade e manutenção simplificada.

```text
/ (root)
├── .cursorrules          # Regras do TIME LEXA
├── PRD.md                # Visão de Produto
├── SPECS.md              # Especificações Técnicas
├── STRUCTURE.md          # Este guia de estrutura
├── supabase/             # Migrations, Seed e Configurações do Supabase
│   └── migrations/
├── public/               # Assets estáticos (Images, Fonts, Favicon)
└── src/
    ├── app/              # [LAYER 1] Next.js App Router (Providers, Global Styles, Layouts, Routes)
    │   ├── api/          # API Routes
    │   ├── (auth)/       # Rotas de Autenticação (Clerk hooks)
    │   ├── (dashboard)/  # Rotas Internas do App
    │   └── layout.tsx    # Root Layout
    ├── processes/        # [LAYER 2] Fluxos complexos (Ex: Onboarding, Checkout)
    ├── pages/            # [LAYER 3] Páginas completas (Composição de Widgets)
    │   ├── Home/
    │   └── Processes/
    ├── widgets/          # [LAYER 4] Blocos auto-contidos de UI (Ex: Sidebar, Sidebar, ProcessFeed)
    ├── features/         # [LAYER 5] Ações interativas do usuário (Ex: CreateProcess, AddComment)
    ├── entities/         # [LAYER 6] Dados de domínio (Ex: Process, Profile, Tenant)
    │   ├── process/
    │   │   ├── model/    # Types & Zod Schemas
    │   │   └── ui/       # Simple UI fragments (ProcessCard)
    │   └── tenant/
    └── shared/           # [LAYER 7] Infraestrutura e UI Kit reutilizável
        ├── api/          # API Client (Fetch/Tanstack)
        ├── ui/           # Shadcn/UI Components
        ├── lib/          # Utilities (date-fns, clsx)
        └── hooks/        # Custom generic hooks
```

## Por que FSD?
1.  **Exploração:** Fácil encontrar onde a lógica de uma "Feature" reside.
2.  **Desacoplamento:** Uma "Feature" não deve depender de outra "Feature", apenas de "Entities" ou "Shared".
3.  **Escalabilidade:** Novas funcionalidades são adicionadas como novos slices, sem poluir o código existente.

---

> Proposta de **Marcus (Arquiteto)**.
