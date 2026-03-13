import { z } from "zod";

export const DocumentCategorySchema = z.enum(['PETITION', 'CONTRACT', 'EVIDENCE', 'COURT_ORDER', 'OTHER']);

export const DocumentSchema = z.object({
    id: z.string().uuid().optional(),
    tenantId: z.string().optional(),
    processId: z.string().uuid().optional().nullable(),
    name: z.string().min(1, "O nome do arquivo é obrigatório"),
    fileExtension: z.string(),
    fileSizeBytes: z.number().optional().nullable(),
    storagePath: z.string(),
    category: DocumentCategorySchema.default('OTHER'),
    createdAt: z.date().or(z.string().transform((val) => new Date(val))).optional(),
});

export type Document = z.infer<typeof DocumentSchema>;

export const CreateDocumentSchema = DocumentSchema.omit({ id: true, tenantId: true, createdAt: true });

export const TemplateSchema = z.object({
    id: z.string().uuid().optional(),
    tenantId: z.string().optional(),
    title: z.string().min(3, "O título deve ter pelo menos 3 caracteres"),
    description: z.string().optional().nullable(),
    content: z.string().optional().nullable(),
    category: z.enum(['DRAFT', 'OFFICIAL']).default('DRAFT'),
});

export type DocumentTemplate = z.infer<typeof TemplateSchema>;
