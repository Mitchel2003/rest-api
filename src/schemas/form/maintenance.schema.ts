import { z } from "zod";

export const maintenanceSchema = z.object({
  //timestandard
  dateNextMaintenance: z
    .string().datetime().optional().nullable(),
  dateMaintenance: z
    .string().datetime().optional().nullable(),

  //maintenance
  typeMaintenance: z
    .string({ required_error: "El tipo de mantenimiento es requerido" }),
  statusEquipment: z
    .string({ required_error: "El estado del equipo es requerido" }),
  observations: z
    .string({ required_error: "Las observaciones son requeridas" }),
  metadata: z
    .object({}).optional().nullable(),

  //references
  curriculum: z
    .string({ required_error: "El ID del curriculum es requerido" }),
  createdBy: z
    .string({ required_error: "El ID del usuario creador es requerido" }),
});