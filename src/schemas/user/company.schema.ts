import { z } from "zod"

export const companySchema = z.object({
  name: z
    .string({ required_error: "El nombre es requerido" })
    .min(5, "El nombre debe tener al menos 5 caracteres"),
  nit: z
    .string({ required_error: "El NIT es requerido" })
    .min(10, "El NIT debe tener al menos 10 caracteres")
    .max(20, "El NIT no puede exceder los 20 caracteres"),
  invima: z
    .string({ required_error: "El invima es requerido" })
    .min(5, "El invima debe tener al menos 5 caracteres"),
  profesionalLicense: z
    .string({ required_error: "La licencia profesional es requerida" })
    .min(5, "La licencia profesional debe tener al menos 5 caracteres")
})