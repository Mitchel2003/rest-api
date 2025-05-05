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
    .max(50, { message: "Nombre demasiado largo" }),
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
    .enum(['admin', 'company', 'collaborator', 'client'], { required_error: "El rol es requerido" }),
  permissions: z
    .array(z.string())
    .optional(),
  metadata: z
    .object({})
    .optional(),
  //company and collaborator (handle behavior)
  belongsTo: z
    .string()
    .optional(),
  type: z
    .enum(['contractor', 'independent'], { required_error: "El tipo es requerido" })
    .optional(),
  classification: z
    .enum(['biomédico', 'red de frio', 'equipo computo'], { required_error: "La clasificación es requerida" })
    .optional()
})