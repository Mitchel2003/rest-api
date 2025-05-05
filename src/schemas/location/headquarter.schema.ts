import { z } from "zod";

const headquarterSchema = z.object({
  name: z
    .string({ required_error: "Nombre de sede requerido" })
    .min(3, { message: "Nombre de sede debe tener al menos 3 caracteres" })
    .max(50, { message: "Nombre de sede no puede exceder los 50 caracteres" }),
  address: z
    .string({ required_error: "Dirección de sede requerida" })
    .min(3, { message: "Dirección de sede debe tener al menos 3 caracteres" })
    .max(50, { message: "Dirección de sede no puede exceder los 50 caracteres" }),
  city: z
    .string({ required_error: "Ciudad de sede requerida" }),
  client: z
    .string({ required_error: "Cliente de sede requerido (User)" })
})

export default headquarterSchema