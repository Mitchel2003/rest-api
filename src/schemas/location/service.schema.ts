import { z } from "zod";

const serviceSchema = z.object({
  name: z
    .string({ required_error: "Nombre de servicio requerido" })
    .min(3, { message: "Nombre de servicio debe tener al menos 3 caracteres" }),
})

export default serviceSchema