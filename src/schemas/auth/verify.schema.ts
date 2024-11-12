import { z } from "zod"

export const resetPasswordSchema = z.object({
  password: z
    .string({ required_error: "La contraseña es requerida" })
    .min(6, { message: "La contraseña es demasiado corta" }),
})

export const forgotPasswordSchema = z.object({
  email: z
    .string({ required_error: "El correo electrónico es requerido" })
    .email({ message: "Correo electrónico inválido" }),
})