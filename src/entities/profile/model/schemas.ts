import { z } from "zod/v4";

/** Schema para atualização do próprio perfil */
export const updateProfileSchema = z.object({
  display_name: z.string().min(1, "Nome é obrigatório").max(100).optional(),
  avatar_url: z.string().url("URL inválida").optional().nullable(),
  role: z.enum(["OWNER", "ADMIN", "MEMBER"]).optional(),
});


export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
