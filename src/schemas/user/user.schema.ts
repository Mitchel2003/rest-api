import { z } from "zod"

export const userSchema = z.object({
  username: z
    .string({ required_error: "El nombre es requerido" })
    .min(5, { message: "Nombre demasiado corto" })
    .max(15, { message: "Nombre demasiado largo" }),
  email: z
    .string({ required_error: "El email es requerido" })
    .email({ message: "Correo electrónico inválido" }),
  role: z
    .enum(['engineer', 'admin'], { required_error: "El rol es requerido" }),
})
