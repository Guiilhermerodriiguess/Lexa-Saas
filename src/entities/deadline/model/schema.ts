import { z } from "zod";

export const DeadlineCategorySchema = z.enum(["PROCEDURAL", "HEARING", "ADMINISTRATIVE", "MEETING"]);
export const DeadlineStatusSchema = z.enum(["PENDING", "COMPLETED", "CANCELED", "OVERDUE"]);

export const DeadlineSchema = z.object({
    id: z.string().uuid().optional(),
    processId: z.string().uuid().optional().nullable(),
    title: z.string().min(3, "O título deve ter pelo menos 3 caracteres"),
    description: z.string().optional().nullable(),
    deadlineDate: z.date().or(z.string().transform((val) => new Date(val))),
    category: DeadlineCategorySchema.default("PROCEDURAL"),
    status: DeadlineStatusSchema.default("PENDING"),
    priority: z.enum(["LOW", "NORMAL", "HIGH", "URGENT"]).default("NORMAL"),
    assignedTo: z.string().optional().nullable(),
    isAllDay: z.boolean().default(false),
    tenantId: z.string().optional(),
});

export type Deadline = z.infer<typeof DeadlineSchema>;

export const CreateDeadlineSchema = DeadlineSchema.omit({ id: true, tenantId: true });
