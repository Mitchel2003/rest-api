import { z } from "zod";

export const verifyEmailSchema = z.object({
  code: z
    .string({ required_error: "El código de verificación es requerido" })
})