import { z } from "zod";

const citySchema = z.object({
  name: z
    .string({ required_error: "Nombre de ciudad requerido" })
    .min(3, { message: "Nombre de ciudad debe tener al menos 3 caracteres" }),
  state: z
    .string({ required_error: "Departamento de ciudad requerido" })
})

export default citySchema