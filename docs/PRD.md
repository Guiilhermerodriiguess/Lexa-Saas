# PRD - LEXA-SAAS: Sistema Operacional Jurídico do Brasil (v4.0 Greenfield)

## 1. Visão Geral do Produto (🚀 Guilherme - CEO & CTO)

O **LEXA-SAAS** é concebido para ser o **Sistema Operacional Jurídico do Brasil**. Ele unifica todas as operações de um escritório de advocacia em um único ecossistema seguro, inteligente e preditivo. O objetivo é a excelência inquestionável, com foco em remover a carga burocrática do advogado através de tecnologia de ponta.

### Prioridade Inegociável

- **Zero Bugs Críticos:** O core do sistema deve ser inabalável. Nenhuma feature nova enquanto houver bug crítico aberto.
- **Aderência Total:** 100% de precisão nas regras de negócio e requisitos de front-end.
- **Testes Abrangentes:** Unitários + integração + E2E em toda nova funcionalidade.
- **Inovação sobre Base Sólida:** BI Preditivo e IA Aruna somente após o core operacional estar 100% estável.

---

## 2. Domínios do Sistema (Domain-Driven Design)

O LEXA-SAAS é modularizado por domínios de negócio, cada um com autonomia técnica e lógica.

### 2.1 Legal Core (⚖️ Dr. Andressa - Jurídico)

Este é o motor do sistema. Ele gerencia o ciclo de vida da prática jurídica.

#### Entidades Principais

- **Processo Jurídico:**
  - Campus: `{ id, tenant_id, numero, tribunal, vara, cliente_id, responsavel_id, status, tipo, data_distribuicao, prazo_fatal, movimentacoes[] }`
  - Regras: Validação de máscara de número CNJ, integração com tokens de tribunais para captura automática.
- **Contrato/Minuta:**
  - Campos: `{ id, tenant_id, titulo, cliente_id, versao, status (rascunho, revisao, assinado), signatarios[], conteudo (Rich Text/Markdown), data_assinatura }`
  - Regras: Versionamento imutável após assinatura, integração com assinaturas digitais.
- **Prazo:**
  - Campos: `{ id, tenant_id, processo_id, descricao, data_limite, tipo (comum, fatal), alertas[], cumprido }`
  - Regras: Alertas automáticos via Push/Email (T-5, T-2, T-1 dia).
- **Correspondente:**
  - Campos: `{ id, tenant_id, advogado_id, tarefa, valor, status, prazo }`

### 2.2 CRM - Relacionamento com Clientes (📋 Carla - PO)

Focado no crescimento do faturamento e retenção de base.

#### Entidades Principais

- **Cliente:**
  - Campos: `{ id, tenant_id, nome, cpf_cnpj, tipo (PF/PJ), contatos[], enderecos[], historico_interacoes[], funil_status }`
  - Regras: Unicidade por CPF/CNPJ dentro do mesmo tenant.
- **Lead:**
  - Campos: `{ id, tenant_id, origem, status (quente, frio, convertido), responsavel_id, valor_estimado, data_contato }`
  - Regras: Funil de vendas integrado à agenda do advogado.

### 2.3 Financeiro (💰 Sabrine - Financeiro)

Gestão de honorários, fluxo de caixa e viabilidade econômica.

#### Entidades Principais

- **Honorário:**
  - Campos: `{ id, tenant_id, processo_id, cliente_id, valor, tipo (exito, fixo, mensal), status, parcelas[], vencimento }`
  - Regras: Cálculo de impostos automático baseado na categoria do escritório.
- **Conta:**
  - Campos: `{ id, tenant_id, descricao, tipo (entrada/saida), valor, data, categoria, conciliado }`
- **Plano Assinatura (SaaS Control):**
  - Campos: `{ id, tenant_id, nome, valor_mensal, features_liberadas[], status }`

### 2.4 Operacional (👑 Leo - Tech Lead)

Gestão interna e infraestrutura humana.

#### Entidades Principais

- **Colaborador:**
  - Campos: `{ id, tenant_id, usuario_id, cargo, departamento, salario, ferias[], ponto[] }`
- **Fornecedor:**
  - Campos: `{ id, tenant_id, nome, cnpj, categoria, contratos_ativos[] }`

### 2.5 Inteligência (🤖 Aruna - IA)

Automação e análise preditiva.

#### Entidades Principais

- **Relatório BI:** `{ id, tenant_id, tipo, filtros, dados_agregados, gerado_em }`
- **Tarefa IA:** `{ id, tenant_id, tipo (petição, análise, resumo), input, output, status, modelo (GPT-4o/Claude/Aruna-Proprietária) }`

### 2.6 Backoffice SaaS (Super Admin)

Controle global da plataforma pela equipe LEXA.

#### Entidades Principais

- **Tenant/Escritório:** `{ id, nome, plano_id, status (ativo, suspenso, trial), configuracoes_customizadas, criado_em }`
- **Admin SaaS:** `{ id, email, role (SuperAdmin, Support, Auditor), permissoes[] }`

---

## 3. Requisitos de UX e Design (✨ Sofia - UX & 🖌️ Theo - Design System)

- **Aesthetics Premium:** Uso de cores harmônicas, tipografia moderna (Inter/Outfit) e dark mode nativo.
- **Micro-animações:** Feedback tátil e visual para toda ação do usuário.
- **Micro-copy Jurídico:** Linguagem clara que evita o "juridiquês" desnecessário para o cliente final, mas mantém a precisão para o advogado.

---

## 4. Critérios de Aceite e Qualidade (🔒 Bruno - QA)

- **Cobertura de Código:** Mínimo 80% em lógica de negócio (entities/features).
- **Performance:** Carregamento de módulos críticos < 1.0s.
- **Segurança (LGPD):** Auditoria em 100% das mutations. NENHUM dado pode ser exposto a outro tenant.

---

---

## 5. Template de Contexto Rápido (🚀 Guilherme - CEO)
>
> **Copie e cole este bloco no início de cada nova conversa** para reativar o TIME LEXA sem precisar repetir o Prompt Mestre inteiro.

```text
═══════════════════════════════════════════════
 LEXA-SAAS — Contexto de Sessão
═══════════════════════════════════════════════
Projeto: LEXA-SAAS (Sistema Operacional Jurídico do Brasil)
Stack: Next.js 15 / TypeScript Strict / tRPC / Supabase / Clerk / Shadcn/UI / Vitest / Playwright
Arquitetura: Feature-Sliced Design (FSD)

Fase atual: [PREENCHER: Fase 1 / 2 / 3 / 4]
Sprint atual: [PREENCHER: ex. Sprint 1 — Setup Base]

Guardrails ativos:
- Arquivos < 300 linhas | Funções < 40 linhas
- TypeScript Strict, zero `any`
- tenant_id obrigatório em toda query
- Testes unitários + integração obrigatórios
- Zod em todo input tRPC

Tarefa desta sessão: [PREENCHER]
Feature/módulo: [PREENCHER]
Especialistas necessários: [PREENCHER]
═══════════════════════════════════════════════
```
