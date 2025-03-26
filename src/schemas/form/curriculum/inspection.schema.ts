import { z } from "zod";

const inspectionSchema = z.object({
  inactive: z.boolean().optional().default(false),
  name: z
    .string({ required_error: "El nombre de inspección es requerido" }),
  typeInspection: z
    .array(z.string({ required_error: "Tipos de inspección son requeridas" }))
})

export default inspectionSchema