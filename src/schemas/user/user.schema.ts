import { z } from "zod"

export const userSchema = z.object({
  uid: z
    .string({ required_error: "El uid es requerido" }),
  username: z
    .string({ required_error: "El nombre es requerido" })
    .min(5, { message: "Nombre demasiado corto" })
    .max(50, { message: "Nombre demasiado largo" }),
  email: z
    .string({ required_error: "El email es requerido" })
    .email({ message: "Correo electrónico inválido" }),
  phone: z
    .string({ required_error: "El teléfono es requerido" }),
  role: z
    .enum(['engineer', 'admin'], { required_error: "El rol es requerido" }),
  permissions: z
    .object({})
    .optional()
    .nullable(),
})