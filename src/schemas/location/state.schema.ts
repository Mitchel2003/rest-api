import { z } from "zod";

const stateSchema = z.object({
  name: z
    .string({ required_error: "Nombre de departamento requerido" })
    .min(3, { message: "Nombre de departamento debe tener al menos 3 caracteres" }),
  country: z
    .string({ required_error: "País requerido" })
})

export default stateSchema