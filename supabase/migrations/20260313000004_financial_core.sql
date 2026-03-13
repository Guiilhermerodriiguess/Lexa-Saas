-- 1. TABELA DE CATEGORIAS FINANCEIRAS
CREATE TABLE IF NOT EXISTS public.financial_categories (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    tenant_id TEXT NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('INCOME', 'EXPENSE')),
    color TEXT DEFAULT '#C5A55A',
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. TABELA DE TRANSAÇÕES FINANCEIRAS
CREATE TABLE IF NOT EXISTS public.financial_transactions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    tenant_id TEXT NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
    process_id UUID REFERENCES public.processes(id) ON DELETE SET NULL, -- Vínculo opcional com processo (honorários/custas)
    category_id UUID REFERENCES public.financial_categories(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    description TEXT,
    amount DECIMAL(12, 2) NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('INCOME', 'EXPENSE')),
    status TEXT DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'PAID', 'CANCELED')),
    due_date DATE NOT NULL,
    payment_date DATE,
    payment_method TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 3. ROW LEVEL SECURITY (RLS)
ALTER TABLE public.financial_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.financial_transactions ENABLE ROW LEVEL SECURITY;

-- 4. POLÍTICAS DE RLS
CREATE POLICY "Categories isolation by tenant" ON public.financial_categories
    FOR ALL USING (tenant_id IN (
        SELECT tenant_id FROM public.profiles WHERE profiles.id = auth.uid()::text
    ));

CREATE POLICY "Transactions isolation by tenant" ON public.financial_transactions
    FOR ALL USING (tenant_id IN (
        SELECT tenant_id FROM public.profiles WHERE profiles.id = auth.uid()::text
    ));

-- 5. TRIGGERS PARA UPDATED_AT
CREATE TRIGGER update_financial_transactions_updated_at BEFORE UPDATE ON public.financial_transactions FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- 6. ÍNDICES
CREATE INDEX idx_financial_tenant ON public.financial_transactions(tenant_id);
CREATE INDEX idx_financial_process ON public.financial_transactions(process_id);
CREATE INDEX idx_financial_due_date ON public.financial_transactions(due_date);
CREATE INDEX idx_financial_type ON public.financial_transactions(type);
CREATE INDEX idx_categories_tenant ON public.financial_categories(tenant_id);

-- 7. CATEGORIAS PADRÃO (Opcional, mas ajuda no onboarding)
-- Nota: Isso seria melhor via código no onboarding, mas deixamos aqui como referência.
