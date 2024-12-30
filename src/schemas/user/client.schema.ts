import { z } from "zod"

export const clientSchema = z.object({
  name: z
    .string({ required_error: "El nombre es requerido" })
    .min(5, { message: "Nombre demasiado corto" })
    .max(35, { message: "Nombre demasiado largo" }),
  email: z
    .string({ required_error: "El email es requerido" })
    .email({ message: "Correo electrónico inválido" }),
  phone: z
    .number({ required_error: "El teléfono es requerido" })
    .min(4, { message: "Teléfono demasiado corto" })
    .max(15, { message: "Teléfono inválido" }),
  nit: z
    .string({ required_error: "El nit es requerido" })
    .min(15, { message: "El nit es inválido" }),
})
