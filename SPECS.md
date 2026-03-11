# SPECS - LEXA-SAAS: Arquitetura e Estrutura Técnica (v1.0)

## 1. Stack Tecnológica (Jean - CTO)
*   **Frontend:** Next.js 15 (App Router, React 19).
*   **Linguagem:** TypeScript (Strict Mode).
*   **Estilização:** Tailwind CSS + Shadcn/UI (Radix UI).
*   **Autenticação/Orgs:** Clerk (Gestão de Identidade e Multi-tenancy).
*   **Backend/Banco:** Supabase (PostgreSQL + RLS + Storage).
*   **Comunicação:** TanStack Query (v5) + Server Actions (type-safe fetching).
*   **Testes:** Vitest (Unit/Integration), Playwright (E2E).
*   **Infra:** Docker (Dockerfile + docker-compose) para Self-Hosting.

---

## 2. Arquitetura de Pastas: Feature-Sliced Design - FSD (Marcus - Arquiteto)
O projeto seguirá rigorosamente o padrão FSD para garantir desacoplamento:

```text
src/
  app/          # Configurações globais, providers, layout principal, rotas (Next.js App Router)
  processes/    # [Opcional no FSD clássico] - Fluxos que cruzam múltiplas páginas
  pages/        # Composição de widgets em páginas completas
  widgets/      # Componentes complexos que combinam múltiplas features (ex: Sidebar, Header)
  features/     # Lógica de negócio interativa (ex: CreateProcess, EditContract, ProcessFilters)
  entities/     # Lógica de dados e modelos (ex: Process, Tenant, User, Invoice)
  shared/       # Reutilizáveis: UI Kit (Shadcn), Utils, API Client, Hooks genéricos
```

---

## 3. Modelo de Dados e Multitenancy (Rafael - DBA)
Todas as tabelas relacionadas a dados de clientes DEVEM conter a coluna `tenant_id`.

### Tabelas Core (Supabase Schema: public)
*   **tenants**: `id (uuid), slug (text), name (text), clerk_org_id (text), created_at`.
*   **profiles**: `id (uuid), user_id (text - Clerk ID), tenant_id (uuid), role (text), metadata (jsonb)`.
*   **processes**: `id (uuid), tenant_id (uuid), title (text), folder_number (text), status (text), legal_details (jsonb)`.
*   **universal_audit_logs**: `id (uuid), tenant_id (uuid), user_id (uuid), action (text), target_table (text), old_data (jsonb), new_data (jsonb)`.

### Estratégia de RLS (Kai - Segurança)
```sql
-- Exemplo de política para processos
CREATE POLICY "Tenants can only see their own processes"
ON public.processes
FOR ALL
USING (
  tenant_id = (SELECT tenant_id FROM profiles WHERE user_id = auth.uid())
);
```

---

## 4. Estratégia de Deploy (Nina - DevOps)
O projeto deve ser "Docker-ready" desde o dia 1.
*   **Dockerfile:** Multi-stage build para Next.js.
*   **CI/CD:** GitHub Actions para rodar testes, lint e build da imagem Docker.
*   **Hosting:** Flexibilidade para rodar em VPS (Coolify/Dokku) ou Cloud escalável (AWS/GCP).

---

## 5. Protocolo de Type-Safety (Luna - Frontend)
*   Toda resposta do banco deve ser tipada via `database.types.ts` (gerado pelo Supabase CLI).
*   Uso de `Zod` para validação de formulários e schemas de API.
*   Server Actions devem retornar objetos `{ data, error }` padronizados.

---

> [!WARNING]
> É expressamente proibido o uso de `any` ou ignorar erros de lint. A qualidade do código é a base da nossa estabilidade.
