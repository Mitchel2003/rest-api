import { classificationValues, roleValues } from "@/types/user/user.type"
import { z } from "zod"

export const userSchema = z.object({
  //to auth-firebase (password is handled by firebase)
  email: z
    .string({ required_error: "El correo electrónico es requerido" })
    .email({ message: "Correo electrónico inválido" }),
  password: z
    .string({ required_error: "La contraseña es requerida" })
    .min(6, { message: "La contraseña es demasiado corta" }),
  //to user credentials (reference)
  username: z
    .string({ required_error: "El nombre es requerido" })
    .min(5, { message: "Nombre demasiado corto" })
    .max(75, { message: "Nombre demasiado largo" }),
  phone: z
    .string({ required_error: "El teléfono es requerido" })
    .min(6, { message: "El teléfono es demasiado corto" })
    .max(15, { message: "El teléfono es demasiado largo" }),
  //dependent of the role context (client, company)
  nit: z
    .string()
    .optional(),
  invima: z
    .string()
    .optional(),
  profesionalLicense: z
    .string()
    .optional(),
  //access control, with role and permissions, and metadata for files associated
  role: z
    .enum(roleValues, { required_error: "El rol es requerido" }),
  position: z
    .string({ required_error: "El cargo es requerido" })
    .min(2, { message: "El cargo es demasiado corto" })
    .max(25, { message: "El cargo es demasiado largo" }),
  permissions: z
    .array(z.string())
    .optional(),
  metadata: z
    .object({})
    .optional(),
  //handle references associated
  belongsTo: z
    .string()
    .optional()
    .nullable(),
  classification: z
    .array(z.enum(classificationValues))
    .optional()
})