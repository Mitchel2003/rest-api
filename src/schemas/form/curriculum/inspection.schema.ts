import { z } from "zod";

export const inspectionSchema = z.object({
  presetInspection: z.string({
    required_error: "El ID de la inspección predefinida es requerida"
  }),
  typeInspection: z.string({
    required_error: "El ID del tipo de inspección es requerida"
  })
});

export const typeInspectionSchema = z.object({
  nameType: z.string({
    required_error: "El nombre del tipo de inspección es requerido"
  }),
  inactive: z.boolean().optional().default(false)
});

export const presetInspectionSchema = z.object({
  namePreset: z.string({
    required_error: "El nombre de la inspección predefinida es requerido"
  }),
  inactive: z.boolean().optional().default(false)
});