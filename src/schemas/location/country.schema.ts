import { z } from "zod";

const countrySchema = z.object({
  name: z
    .string({ required_error: "Nombre de país requerido" })
    .min(3, { message: "Nombre de país debe tener al menos 3 caracteres" }),
})

export default countrySchema