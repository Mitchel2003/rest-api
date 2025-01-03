import { z } from "zod";

const officeSchema = z.object({
  name: z
    .string({ required_error: "Nombre de oficina requerido" })
    .min(3, { message: "Nombre de oficina debe tener al menos 3 caracteres" })
    .max(50, { message: "Nombre de oficina no puede exceder los 50 caracteres" }),
  area: z
    .string({ required_error: "Área requerida" })
})

export default officeSchema;