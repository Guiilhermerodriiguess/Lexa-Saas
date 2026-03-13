-- 1. TABELA DE DOCUMENTOS (METADADOS DE ARQUIVOS)
CREATE TABLE IF NOT EXISTS public.documents (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    tenant_id TEXT NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
    process_id UUID REFERENCES public.processes(id) ON DELETE CASCADE, -- Vínculo opcional com processo
    name TEXT NOT NULL,
    file_extension TEXT NOT NULL,
    file_size_bytes BIGINT,
    storage_path TEXT NOT NULL, -- Caminho no Supabase Storage
    category TEXT DEFAULT 'OTHER' CHECK (category IN ('PETITION', 'CONTRACT', 'EVIDENCE', 'COURT_ORDER', 'OTHER')),
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. TABELA DE TEMPLATES DE DOCUMENTOS (MINUTAS)
CREATE TABLE IF NOT EXISTS public.document_templates (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    tenant_id TEXT NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    content TEXT, -- Conteúdo em Markdown ou JSON para o editor
    category TEXT DEFAULT 'DRAFT' CHECK (category IN ('DRAFT', 'OFFICIAL')),
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 3. ROW LEVEL SECURITY (RLS)
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.document_templates ENABLE ROW LEVEL SECURITY;

-- 4. POLÍTICAS DE RLS
CREATE POLICY "Documents isolation by tenant" ON public.documents
    FOR ALL USING (tenant_id IN (
        SELECT tenant_id FROM public.profiles WHERE profiles.id = auth.uid()::text
    ));

CREATE POLICY "Templates isolation by tenant" ON public.document_templates
    FOR ALL USING (tenant_id IN (
        SELECT tenant_id FROM public.profiles WHERE profiles.id = auth.uid()::text
    ));

-- 5. TRIGGERS PARA UPDATED_AT
CREATE TRIGGER update_documents_updated_at BEFORE UPDATE ON public.documents FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_templates_updated_at BEFORE UPDATE ON public.document_templates FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- 6. ÍNDICES
CREATE INDEX idx_documents_tenant ON public.documents(tenant_id);
CREATE INDEX idx_documents_process ON public.documents(process_id);
CREATE INDEX idx_templates_tenant ON public.document_templates(tenant_id);
