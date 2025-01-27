import { z } from "zod";

const groupSchema = z.object({
  name: z
    .string({ required_error: "Nombre de grupo requerido" })
    .min(3, { message: "Nombre de grupo debe tener al menos 3 caracteres" }),
  services: z
    .array(z.string({ required_error: "Servicio requerido" }))
    .min(1, { message: "Debe seleccionar al menos un servicio" }),
})

export default groupSchema