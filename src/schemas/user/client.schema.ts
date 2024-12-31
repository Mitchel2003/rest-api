import { z } from "zod"

export const clientSchema = z.object({
  name: z
    .string({
      required_error: "El nombre es requerido",
      invalid_type_error: "El nombre debe ser texto"
    })
    .min(5, "El nombre debe tener al menos 5 caracteres")
    .max(35, "El nombre no puede exceder los 35 caracteres"),
  email: z
    .string({
      required_error: "El email es requerido",
      invalid_type_error: "El email debe ser texto"
    })
    .email("El formato del correo electrónico no es válido"),
  phone: z
    .string({
      required_error: "El teléfono es requerido",
      invalid_type_error: "El teléfono debe ser un número"
    })
    .min(4, "El teléfono debe tener al menos 4 dígitos")
    .max(15, "El teléfono no puede exceder los 15 dígitos"),
  nit: z
    .string({
      required_error: "El NIT es requerido",
      invalid_type_error: "El NIT debe ser texto"
    })
    .min(10, "El NIT debe tener al menos 10 caracteres")
    .max(20, "El NIT no puede exceder los 20 caracteres")
})