import { createClient } from "@supabase/supabase-js";
import "server-only";

/**
 * CLIENTE SUPABASE (SERVER-ONLY)
 * Utiliza as variáveis de ambiente para conexão segura no servidor.
 * Este cliente NÃO deve ser exposto no frontend.
 */
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // Role de serviço para bypass planejado ou queries internas

if (!supabaseUrl || !supabaseKey) {
    throw new Error("Variáveis de ambiente do Supabase não configuradas no servidor.");
}

export const db = createClient(supabaseUrl, supabaseKey, {
    auth: {
        persistSession: false,
        autoRefreshToken: false,
    },
});
