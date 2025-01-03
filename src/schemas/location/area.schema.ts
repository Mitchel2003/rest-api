import { z } from "zod";

const areaSchema = z.object({
  name: z
    .string({ required_error: "Nombre de área requerido" })
    .min(3, { message: "Nombre de área debe tener al menos 3 caracteres" })
    .max(50, { message: "Nombre de área no puede exceder los 50 caracteres" }),
  headquarter: z
    .string({ required_error: "Sede de área requerida" })
})

export default areaSchema;