import { z } from "zod";

/*--------------------------------------------------authentication--------------------------------------------------*/
export const loginSchema = z.object({
  email: z
    .string({ required_error: "El correo electrónico es requerido" })
    .email({ message: "Correo electrónico inválido" }),
  password: z
    .string({ required_error: "La contraseña es requerida" })
    .min(6, { message: "La contraseña es demasiado corta" })
})

export const registerSchema = z.object({
  username: z
    .string({ required_error: "El nombre de usuario es requerido" }),
  email: z
    .string({ required_error: "El correo electrónico es requerido" })
    .email({ message: "Correo electrónico inválido" }),
  password: z
    .string({ required_error: "La contraseña es requerida" })
    .min(6, { message: "La contraseña es demasiado corta" }),
  role: z
    .enum(['admin', 'user'], { required_error: "El rol es requerido" })
})
/*---------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------validation--------------------------------------------------*/
export const verifyEmailSchema = z.object({
  code: z
    .string({ required_error: "El código de verificación es requerido" })
})

export const forgotPasswordSchema = z.object({
  email: z
    .string({ required_error: "El correo electrónico es requerido" })
    .email({ message: "Correo electrónico inválido" }),
})

export const resetPasswordSchema = z.object({
  password: z
    .string({ required_error: "La contraseña es requerida" })
    .min(6, { message: "La contraseña es demasiado corta" }),
})
/*---------------------------------------------------------------------------------------------------------*/
