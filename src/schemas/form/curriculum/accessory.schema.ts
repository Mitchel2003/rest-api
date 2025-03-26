import { z } from "zod";

const accessorySchema = z.object({
  name: z
    .string({ required_error: "Nombre del accesorio es requerido" }),
  type: z
    .string({ required_error: "Tipo de accesorio es requerido" }),
  serie: z
    .string({ required_error: "Serie del accesorio es requerida" }),
  modelEquip: z
    .string({ required_error: "Modelo del accesorio es requerido" }),
  curriculum: z
    .string({ required_error: "Referencia del curriculum es requerida" })
})

export default accessorySchema