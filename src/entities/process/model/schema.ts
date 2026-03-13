import { z } from "zod";

export const ProcessStatusSchema = z.enum(["ACTIVE", "SUSPENDED", "ARCHIVED", "COMPLETED"]);
export const ProcessPrioritySchema = z.enum(["LOW", "NORMAL", "HIGH", "URGENT"]);

export const ProcessSchema = z.object({
    id: z.string().uuid().optional(),
    clientId: z.string().uuid("Selecione um cliente"),
    processNumber: z.string().min(1, "Número do processo é obrigatório"),
    title: z.string().min(3, "Título deve ter pelo menos 3 caracteres"),
    description: z.string().optional().nullable(),
    status: ProcessStatusSchema.default("ACTIVE"),
    priority: ProcessPrioritySchema.default("NORMAL"),
    court: z.string().optional().nullable(),
    instance: z.string().optional().nullable(),
    tenantId: z.string().optional(),
});

export type Process = z.infer<typeof ProcessSchema>;

export const CreateProcessSchema = ProcessSchema.omit({ id: true, tenantId: true });
