-- 1. TABELA DE DEADLINES (PRAZOS E COMPROMISSOS)
CREATE TABLE IF NOT EXISTS public.deadlines (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    tenant_id TEXT NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
    process_id UUID REFERENCES public.processes(id) ON DELETE CASCADE, -- Opcional (compromissos podem ser avulsos)
    title TEXT NOT NULL,
    description TEXT,
    deadline_date TIMESTAMPTZ NOT NULL, -- Data fatal
    category TEXT DEFAULT 'PROCEDURAL' CHECK (category IN ('PROCEDURAL', 'HEARING', 'ADMINISTRATIVE', 'MEETING')),
    status TEXT DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'COMPLETED', 'CANCELED', 'OVERDUE')),
    priority TEXT DEFAULT 'NORMAL' CHECK (priority IN ('LOW', 'NORMAL', 'HIGH', 'URGENT')),
    assigned_to TEXT, -- ID do usuário (perfil) responsável
    is_all_day BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. ROW LEVEL SECURITY (RLS)
ALTER TABLE public.deadlines ENABLE ROW LEVEL SECURITY;

-- 3. POLÍTICAS DE RLS
CREATE POLICY "Deadlines isolation by tenant" ON public.deadlines
    FOR ALL USING (tenant_id IN (
        SELECT tenant_id FROM public.profiles WHERE profiles.id = auth.uid()::text
    ));

-- 4. TRIGGER PARA UPDATED_AT
CREATE TRIGGER update_deadlines_updated_at BEFORE UPDATE ON public.deadlines FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- 5. ÍNDICES
CREATE INDEX idx_deadlines_tenant ON public.deadlines(tenant_id);
CREATE INDEX idx_deadlines_process ON public.deadlines(process_id);
CREATE INDEX idx_deadlines_date ON public.deadlines(deadline_date);
CREATE INDEX idx_deadlines_status ON public.deadlines(status);
