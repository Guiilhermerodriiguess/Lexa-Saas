-- 1. TABELA DE CLIENTES
CREATE TABLE IF NOT EXISTS public.clients (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    tenant_id TEXT NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    document_type TEXT CHECK (document_type IN ('CPF', 'CNPJ')),
    document_number TEXT,
    email TEXT,
    phone TEXT,
    address JSONB,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. TABELA DE PROCESSOS
CREATE TABLE IF NOT EXISTS public.processes (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    tenant_id TEXT NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
    client_id UUID NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
    process_number TEXT NOT NULL, -- Número CNJ
    title TEXT NOT NULL,
    description TEXT,
    status TEXT DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'SUSPENDED', 'ARCHIVED', 'COMPLETED')),
    priority TEXT DEFAULT 'NORMAL' CHECK (priority IN ('LOW', 'NORMAL', 'HIGH', 'URGENT')),
    court TEXT, -- Tribunal
    instance TEXT, -- Instância
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 3. TABELA DE EVENTOS/MOVIMENTAÇÕES
CREATE TABLE IF NOT EXISTS public.process_events (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    tenant_id TEXT NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
    process_id UUID NOT NULL REFERENCES public.processes(id) ON DELETE CASCADE,
    event_type TEXT NOT NULL, -- 'MOVEMENT', 'MILESTONE', 'HEARING'
    title TEXT NOT NULL,
    description TEXT,
    event_date TIMESTAMPTZ DEFAULT now(),
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. ROW LEVEL SECURITY (RLS)
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.processes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.process_events ENABLE ROW LEVEL SECURITY;

-- 5. POLÍTICAS DE RLS (Sincronizadas com o perfil do usuário)
CREATE POLICY "Clients isolation by tenant" ON public.clients
    FOR ALL USING (tenant_id IN (
        SELECT tenant_id FROM public.profiles WHERE profiles.id = auth.uid()::text
    ));

CREATE POLICY "Processes isolation by tenant" ON public.processes
    FOR ALL USING (tenant_id IN (
        SELECT tenant_id FROM public.profiles WHERE profiles.id = auth.uid()::text
    ));

CREATE POLICY "Process events isolation by tenant" ON public.process_events
    FOR ALL USING (tenant_id IN (
        SELECT tenant_id FROM public.profiles WHERE profiles.id = auth.uid()::text
    ));

-- 6. TRIGGERS PARA UPDATED_AT
CREATE TRIGGER update_clients_updated_at BEFORE UPDATE ON public.clients FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_processes_updated_at BEFORE UPDATE ON public.processes FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- 7. ÍNDICES DE PERFORMANCE
CREATE INDEX idx_clients_tenant ON public.clients(tenant_id);
CREATE INDEX idx_processes_tenant ON public.processes(tenant_id);
CREATE INDEX idx_processes_client ON public.processes(client_id);
CREATE INDEX idx_events_process ON public.process_events(process_id);
