import { z } from "zod";

export const inspectionSchema = z.object({
  name: z.string({
    required_error: "El nombre de inspección es requerido"
  }),
  inactive: z.boolean().optional().default(false),
  typeInspection: z.array(
    z.string({
      required_error: "Tipos de inspección son requeridas"
    })
  )
});

export const typeInspectionSchema = z.object({
  name: z.string({
    required_error: "El nombre del tipo de inspección es requerido"
  }),
  inactive: z.boolean().optional().default(false)
});