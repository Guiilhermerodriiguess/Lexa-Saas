import { z } from "zod";

export const TransactionTypeSchema = z.enum(['INCOME', 'EXPENSE']);
export const TransactionStatusSchema = z.enum(['PENDING', 'PAID', 'CANCELED']);

export const FinancialTransactionSchema = z.object({
    id: z.string().uuid().optional(),
    tenantId: z.string().optional(),
    processId: z.string().uuid().optional().nullable(),
    categoryId: z.string().uuid().optional().nullable(),
    title: z.string().min(3, "O título deve ter pelo menos 3 caracteres"),
    description: z.string().optional().nullable(),
    amount: z.number().positive("O valor deve ser maior que zero"),
    type: TransactionTypeSchema,
    status: TransactionStatusSchema.default('PENDING'),
    dueDate: z.date().or(z.string().transform((val) => new Date(val))),
    paymentDate: z.date().or(z.string().transform((val) => new Date(val))).optional().nullable(),
    paymentMethod: z.string().optional().nullable(),
    createdAt: z.date().optional(),
});

export type FinancialTransaction = z.infer<typeof FinancialTransactionSchema>;

export const CreateTransactionSchema = FinancialTransactionSchema.omit({ id: true, tenantId: true, createdAt: true });

export const FinancialCategorySchema = z.object({
    id: z.string().uuid().optional(),
    tenantId: z.string().optional(),
    name: z.string().min(1),
    type: TransactionTypeSchema,
    color: z.string().optional(),
});

export type FinancialCategory = z.infer<typeof FinancialCategorySchema>;
