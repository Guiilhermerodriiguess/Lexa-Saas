-- 1. ATIVAR EXTENSÃO PGVECTOR
CREATE EXTENSION IF NOT EXISTS vector;

-- 2. ADICIONAR COLUNAS DE EMBEDDING
-- Usaremos 1536 dimensões (padrão OpenAI text-embedding-3-small)
ALTER TABLE public.processes ADD COLUMN IF NOT EXISTS embedding vector(1536);
ALTER TABLE public.documents ADD COLUMN IF NOT EXISTS embedding vector(1536);

-- 3. FUNÇÃO PARA BUSCA SEMÂNTICA EM PROCESSOS
-- Esta função será chamada via RPC do Supabase
CREATE OR REPLACE FUNCTION match_processes (
  query_embedding vector(1536),
  match_threshold float,
  match_count int,
  p_tenant_id text
)
RETURNS TABLE (
  id uuid,
  tenant_id text,
  title text,
  case_number text,
  similarity float
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    p.id,
    p.tenant_id,
    p.title,
    p.case_number,
    1 - (p.embedding <=> query_embedding) AS similarity
  FROM public.processes p
  WHERE p.tenant_id = p_tenant_id
    AND 1 - (p.embedding <=> query_embedding) > match_threshold
  ORDER BY p.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;

-- 4. ÍNDICES VETORIAIS (IVFFLAT ou HNSW)
-- HNSW é mais rápido para busca mas mais lento para inserir/atualizar
CREATE INDEX IF NOT EXISTS idx_processes_embedding ON public.processes USING hnsw (embedding vector_cosine_ops);
CREATE INDEX IF NOT EXISTS idx_documents_embedding ON public.documents USING hnsw (embedding vector_cosine_ops);

-- Nota: O RLS já está ativo nas tabelas. A função RPC respeita os parâmetros de tenant_id passados pelo tRPC.
