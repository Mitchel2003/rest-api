import { z } from "zod";

export const maintenanceSchema = z.object({
  //timestandard
  dateNextMaintenance: z
    .string({ required_error: "La fecha del próximo mantenimiento es requerida" }).datetime(),
  dateMaintenance: z
    .string().datetime().optional().nullable(),

  //maintenance
  typeMaintenance: z
    .string({ required_error: "El tipo de mantenimiento es requerido" }),
  statusEquipment: z
    .string({ required_error: "El estado del equipo es requerido" }),
  observations: z
    .string({ required_error: "Las observaciones son requeridas" }),

  //references
  curriculum: z
    .string({ required_error: "El ID del curriculum es requerido" }),
});

export const checkSchema = z.object({
  name: z.string({ required_error: "El nombre del check es requerido" }),
  inactive: z.boolean().optional().default(false)
});