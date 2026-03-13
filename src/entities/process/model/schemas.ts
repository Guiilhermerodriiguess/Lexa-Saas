import { z } from "zod/v4";

/** Schema para criação de um processo jurídico via formulário */
export const createProcessSchema = z.object({
  title: z
    .string()
    .min(3, "Título deve ter pelo menos 3 caracteres")
    .max(200),
  folder_number: z.string().max(50).optional().nullable(),
  process_number: z.string().max(50).optional().nullable(),
  status: z
    .enum(["active", "archived", "closed", "suspended"])
    .optional(),
  type: z
    .enum(["judicial", "administrative", "consultation"])
    .optional(),
  court: z.string().max(100).optional().nullable(),
  jurisdiction: z.string().max(100).optional().nullable(),
  client_name: z
    .string()
    .min(2, "Nome do cliente deve ter pelo menos 2 caracteres")
    .max(200)
    .optional()
    .nullable(),
  opposing_party: z.string().max(200).optional().nullable(),
  notes: z.string().max(5000).optional().nullable(),
  filed_at: z.string().optional().nullable(),
});

/** Schema para atualização de um processo */
export const updateProcessSchema = createProcessSchema.partial();

export type CreateProcessInput = z.infer<typeof createProcessSchema>;
export type UpdateProcessInput = z.infer<typeof updateProcessSchema>;
