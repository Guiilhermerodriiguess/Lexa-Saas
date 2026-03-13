-- 1. EXTENSÕES
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. TABELA DE TENANTS (Escritórios)
-- O ID aqui mapeia diretamente para o orgId do Clerk.
CREATE TABLE IF NOT EXISTS public.tenants (
    id TEXT PRIMARY KEY, -- Clerk Organisation ID (org_...)
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 3. TABELA DE PERFIS (Usuários)
CREATE TABLE IF NOT EXISTS public.profiles (
    id TEXT PRIMARY KEY, -- Clerk User ID (user_...)
    tenant_id TEXT NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
    full_name TEXT,
    email TEXT,
    role TEXT DEFAULT 'MEMBER' CHECK (role IN ('OWNER', 'ADMIN', 'MEMBER')),
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 4. TABELA DE AUDITORIA UNIVERSAL
CREATE TABLE IF NOT EXISTS public.universal_audit_logs (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    tenant_id TEXT NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
    user_id TEXT NOT NULL,
    action TEXT NOT NULL, -- 'CREATE', 'UPDATE', 'DELETE'
    target_table TEXT NOT NULL,
    target_id TEXT NOT NULL,
    old_data JSONB,
    new_data JSONB,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 5. ROW LEVEL SECURITY (RLS)
ALTER TABLE public.tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.universal_audit_logs ENABLE ROW LEVEL SECURITY;

-- 6. POLÍTICAS DE RLS
-- Nota: Estas políticas assumem que o tenant_id é passado via JWT customizado ou extraído no backend.
-- Como usamos tRPC (Server-Side) com service_role para bypass controlado pelo middleware, 
-- as políticas aqui servem como rede de segurança para acessos diretos via Supabase Client.

-- Tenants: Usuários só veem o seu próprio Tenant
CREATE POLICY "Users can view their own tenant" ON public.tenants
    FOR SELECT USING (id IN (
        SELECT tenant_id FROM public.profiles WHERE profiles.id = auth.uid()::text -- Adaptado para Clerk ID
    ));

-- Profiles: Usuários só veem perfis do mesmo Tenant
CREATE POLICY "Users can view profiles in the same tenant" ON public.profiles
    FOR SELECT USING (tenant_id IN (
        SELECT tenant_id FROM public.profiles WHERE profiles.id = auth.uid()::text
    ));

-- Audit Logs: Isolamento total por Tenant
CREATE POLICY "Tenant isolation for audit logs" ON public.universal_audit_logs
    FOR ALL USING (tenant_id IN (
        SELECT tenant_id FROM public.profiles WHERE profiles.id = auth.uid()::text
    ));

-- 7. TRIGGERS PARA UPDATED_AT
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_tenants_updated_at BEFORE UPDATE ON public.tenants FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
