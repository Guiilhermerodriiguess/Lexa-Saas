# ROADMAP - LEXA-SAAS: Planejamento Estratégico Exaustivo (v4.0)

Este roadmap detalha as quatro fases fundamentais para a construção do **Sistema Operacional Jurídico do Brasil**. Cada fase possui objetivos técnicos, de negócio e critérios de saída rigorosos.

---

## 📅 Fase 1 — Fundação e Infraestrutura (Semanas 1-4)

**Objetivo:** Estabelecer o alicerce técnico inabalável com suporte a multitenancy nativo.

### Milestones Técnicos

- [ ] **Setup do Monorepo Greenfield:**
  - Inicialização Next.js 15 (App Router).
  - Configuração rigorosa de TypeScript (no-any, strict).
  - Configuração do tRPC (Server/Client context).
- [ ] **Infraestrutura de Dados (🗄️ Rafael):**
  - Setup do Supabase Project.
  - Implementação das tabelas core: `tenants`, `profiles`, `universal_audit_logs`.
  - Ativação de Row Level Security (RLS) em 100% das tabelas.
- [ ] **Autenticação e Identidade (🔐 Kai):**
  - Integração com Clerk Organizations para isolamento de tenants.
  - Sincronização automática de Webhooks (Clerk -> Supabase).
- [ ] **Design System Base (🖌️ Theo):**
  - Integração Shadcn/UI customizado com tokens LEXA.
  - Layout principal (Desktop/Mobile) seguindo Feature-Sliced Design.

**Critério de Saída:** Um usuário consegue criar uma organização no Clerk, logar no LEXA e ver um dashboard vazio isolado de outros usuários, com pipeline de CI/CD verde.

---

## 📅 Fase 2 — Legal Core: O Motor Jurídico (Semanas 5-10)

**Objetivo:** Implementar as funcionalidades que resolvem a dor central do advogado.

### Milestones de Produto (📋 Carla)

- [ ] **Gestão de Processos (Módulo Core):**
  - CRUD Completo de Processos e Movimentações.
  - Histórico de alterações com auditoria universal.
- [ ] **Agenda e Prazos Inteligentes:**
  - Engine de cálculo de prazos jurídicos.
  - Sistema de alertas e notificações (In-app, Email, Push).
- [ ] **CRM e Relacionamento:**
  - Cadastro de clientes e leads.
  - Gestão de contatos e histórico de interações por processo.
- [ ] **Documentos e Minutas:**
  - Repositório versionado de documentos.
  - Geração de documentos via templates estruturados.

**Critério de Saída:** Validação da **⚖️ Dra. Andressa** sobre a precisão das regras processuais e aprovação do **🔒 Bruno (QA)** sem bugs críticos.

---

## 📅 Fase 3 — Financeiro e Gestão Operacional (Semanas 11-16)

**Objetivo:** Garantir a sustentabilidade financeira do escritório e a viabilidade do SaaS.

### Milestones Financeiros (💰 Sabrine)

- [ ] **Módulo Financeiro Completo:**
  - Controle de honorários (faturados vs. recebidos).
  - Fluxo de caixa, custas processuais e despesas administrativas.
- [ ] **Gestão RH e Equipe:**
  - Controle de colaboradores, permissões granulares por cargo.
  - Gestão básica de performance e tarefas.
- [ ] **Backoffice SaaS Admin:**
  - Dashboard de controle de tenants (SaaS-Side).
  - Gestão de planos, limites de uso e faturamento das assinaturas.

**Critério de Saída:** Auditoria financeira confirmando cálculos de 100% de precisão e segurança de dados multitenant validada.

---

## 📅 Fase 4 — Inteligência Aruna e Escala (Semanas 17+)

**Objetivo:** Diferencial competitivo através de IA e automação massiva.

### Milestones de Inteligência (🤖 Aruna)

- [ ] **IA Aruna (IA Nativa):**
  - Busca semântica em todo o acervo do tenant.
  - Resumos de movimentações processuais.
  - Análise preditiva de êxito baseado em histórico de tribunais.
- [ ] **Automação de Captura:**
  - Crawlers integrados para captura automática de novos processos nos tribunais.
- [ ] **BI Gerencial:**
  - Dashboards executivos com métricas de rentabilidade.
- [ ] **Operacional Avançado:**
  - Newsletter automática para clientes.
  - Funcionalidade "Meu Dia" (Dashboard diário do advogado).

**Critério de Saída:** Core operacional 100% estável rodando funcionalidades de IA com latência controlada.

---

> [!CAUTION]
> Nenhuma funcionalidade de Fase 4 será iniciada se houver dívida técnica acumulada das fases anteriores. O TIME LEXA prioriza a fundação sólida.
