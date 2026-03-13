import { z } from "zod";

export const ClientSchema = z.object({
    id: z.string().uuid().optional(),
    name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
    documentType: z.enum(["CPF", "CNPJ"]),
    documentNumber: z.string().min(11, "Documento inválido"),
    email: z.string().email("E-mail inválido").optional().nullable(),
    phone: z.string().optional().nullable(),
    address: z.any().optional().nullable(),
    notes: z.string().optional().nullable(),
    tenantId: z.string().optional(),
});

export type Client = z.infer<typeof ClientSchema>;

export const CreateClientSchema = ClientSchema.omit({ id: true, tenantId: true });
