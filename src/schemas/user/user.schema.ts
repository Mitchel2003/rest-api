import { z } from "zod"

export const userSchema = z.object({
  //to auth-firebase
  email: z
    .string({ required_error: "El correo electrónico es requerido" })
    .email({ message: "Correo electrónico inválido" }),
  password: z
    .string({ required_error: "La contraseña es requerida" })
    .min(6, { message: "La contraseña es demasiado corta" }),
  //to user credentials
  username: z
    .string({ required_error: "El nombre es requerido" })
    .min(5, { message: "Nombre demasiado corto" })
    .max(50, { message: "Nombre demasiado largo" }),
  phone: z
    .string({ required_error: "El teléfono es requerido" })
    .min(6, { message: "El teléfono es demasiado corto" })
    .max(15, { message: "El teléfono es demasiado largo" }),
  //dependent role
  nit: z
    .string()
    .optional()
    .nullable(),
  invima: z
    .string()
    .optional()
    .nullable(),
  profesionalLicense: z
    .string()
    .optional()
    .nullable(),
  //access (role)
  role: z
    .enum(['client', 'company', 'engineer', 'admin'], { required_error: "El rol es requerido" }),
  permissions: z
    .array(z.string())
    .optional()
    .nullable(),
})