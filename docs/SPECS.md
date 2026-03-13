# SPECS - LEXA-SAAS: Arquitetura e Estrutura Técnica (v4.0)

## 1. Stack Tecnológica (📊 Jean - CTO)

O LEXA-SAAS utiliza uma stack moderna focada em **Type-Safety End-to-End** e **Escalabilidade Multitenant**.

| Camada              | Tecnologia                  | Detalhes Adicionais                                   |
| ------------------- | --------------------------- | ----------------------------------------------------- |
| **Framework**       | Next.js 15 (App Router)     | React 19, Server Components por padrão.               |
| **Linguagem**       | TypeScript Strict           | Tipagem rigorosa, zero `any`.                        |
| **Auth**            | Clerk (Organizations)       | Gestão de Tenants via Organizations do Clerk.         |
| **Banco de Dados**  | Supabase (PostgreSQL)       | RLS ativo, Realtime, Webhooks (Node.js).             |
| **Deploy/Infra**    | Docker / Self-Hosted        | Independência total da Vercel (Next.js Standalone).  |
| **API / Backend**   | **tRPC** (Node.js Runtime)  | API routes em Node.js (sem Edge Vercel).             |
| **UI**              | Tailwind + Shadcn/UI        | Customização via Design Tokens (Theo).               |
| **Testes**          | Vitest + Playwright         | Unitários, Integração e E2E (Bruno).                 |
| **Arquitetura**     | **Feature-Sliced Design**   | Estrutura modular desacoplada.                        |

> **🚨 DIRETRIZ ARQUITETURAL: REMOÇÃO VERCEL & REESTRUTURAÇÃO BACKEND**
> O backend foi reestruturado para ser **100% agnóstico de provedor cloud**. Nenhuma funcionalidade deve depender das Edge Functions da Vercel ou serviços proprietários. O deploy é executado estritamente via **Docker / Self-Hosted** (Next.js Standalone Node.js).

---

## 2. Estrutura de Pastas - FSD (🏛️ Marcus - Arquiteto)

Seguimos fielmente o padrão **Feature-Sliced Design (FSD)** conforme definido na v4.0:

```text
src/
├── app/                          # Rotas e entrypoints (Next.js)
├── processes/                    # Lógica de fluxos complexos multi-página
├── widgets/                      # Composição de múltiplas features (ex: Header, Sidebar)
├── features/                     # Lógica de negócio interativa e isolada
│   ├── [feature-name]/
│   │   ├── ui/                   # Componentes React
│   │   ├── model/                # Tipos, store, schemas Zod
│   │   ├── api/                  # Routers tRPC específicos da feature
│   │   ├── lib/                  # Helpers e utils locais
│   │   └── index.ts              # Exportações públicas (Public API)
├── entities/                     # Lógica de dados e modelos (ex: processo, cliente)
├── shared/                       # Código agnóstico (UI Kit, lib, hooks)
├── server/                       # Camada de Backend (tRPC Core)
│   ├── routers/                  # Agregação de routers tRPC
│   ├── middleware/               # Auth, Tenant, Logging
│   ├── db/                       # Cliente Supabase tipado
│   └── services/                 # Serviços de domínio compartilhados
└── trpc/                         # Configuração de Infra do tRPC

docs/                             # Documentação técnica e de produto
├── features/                     # Documentação por feature específica
├── PRD.md
├── SPECS.md
└── ROADMAP.md

prompts/                          # Hierarquia de prompts do TIME LEXA
├── arch/                         # Decisões de arquitetura
├── db/                           # Database e RLS
├── features/                     # Prompts por funcionalidade
├── devops/                       # Infra e CI/CD
└── qa/                           # Estratégias de teste

supabase/
├── migrations/                   # SQL versionado
└── seed/                         # Dados iniciais

tests/
├── unit/
├── integration/
└── e2e/
```

---

## 3. Padrão de API tRPC (👑 Leo - Tech Lead)

Toda comunicação deve seguir o padrão `tenantProcedure`:

```typescript
// server/routers/processo.ts
export const processoRouter = createTRPCRouter({
  list: tenantProcedure
    .input(z.object({ filtros: ProcessoFiltrosSchema }))
    .query(async ({ ctx, input }) => {
      const { data, error } = await ctx.db
        .from('processos')
        .select('*')
        .eq('tenant_id', ctx.tenantId); // Obrigatório mesmo com RLS
      if (error) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });
      return data;
    }),

  create: tenantProcedure
    .input(CreateProcessoSchema)
    .mutation(async ({ ctx, input }) => {
      // Validação extra, auditoria e persistência
    }),
});
```

---

## 4. Multitenancy e Auditoria (🗄️ Rafael - DBA & 🔐 Kai - Segurança)

### 4.1 Schema de Auditoria Universal

```sql
CREATE TABLE universal_audit_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  tenant_id UUID NOT NULL REFERENCES tenants(id),
  user_id TEXT NOT NULL, -- Clerk User ID
  action TEXT NOT NULL, -- 'CREATE', 'UPDATE', 'DELETE'
  target_table TEXT NOT NULL,
  target_id UUID NOT NULL,
  old_data JSONB,
  new_data JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE universal_audit_logs ENABLE ROW LEVEL SECURITY;
```

### 4.2 Regras de Ouro

1. **NUNCA** acessar banco sem `tenant_id`.
2. **NUNCA** expor `service_role key` no cliente.
3. **SEMPRE** extrair `tenant_id` da Organização do Clerk no middleware tRPC.
4. **SEMPRE** usar RLS como segunda camada de segurança.

---

## 5. Protocolo de Qualidade (🔒 Bruno - QA)

- **DoD (Definition of Done):** Feature só é pronta se tiver testes unitários (Vitest) e E2E (Playwright) para o caminho feliz.
- **Coverage:** Mínimo 80% em `entities/` e `features/`.

---

> [!WARNING]
> Proibido o uso de `any` ou ignorar erros de lint. A qualidade do código é a base da nossa estabilidade.
