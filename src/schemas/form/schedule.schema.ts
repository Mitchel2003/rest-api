import { z } from "zod";

const scheduleSchema = z.object({
  typeClassification: z
    .string({ required_error: "El tipo de clasificación es requerido" }),
  type: z
    .string({ required_error: "El tipo es requerido" }),
  name: z
    .string({ required_error: "El nombre es requerido" }),
  url: z
    .string({ required_error: "La url es requerida" }),

  //references
  client: z
    .string({ required_error: "El ID del cliente es requerido" }),
  createdBy: z
    .string({ required_error: "El ID del creador es requerido" }),
})

export default scheduleSchema