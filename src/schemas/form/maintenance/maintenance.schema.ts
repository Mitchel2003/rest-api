import { z } from "zod";

export const maintenanceSchema = z.object({
  //timestandard
  dateNextMaintenance: z
    .string({ required_error: "La fecha del próximo mantenimiento es requerida" }).datetime(),

  dateMaintenance: z.string().datetime().optional().nullable(),

  //maintenance
  statusEquipment: z
    .string({ required_error: "El estado del equipo es requerido" }),

  observations: z
    .string({ required_error: "Las observaciones son requeridas" }),


  //received
  receivedBy: z
    .string({ required_error: "El nombre de la persona que recibe es requerido" }),

  nameEngineer: z
    .string({ required_error: "El nombre del ingeniero es requerido" }),

  invimaEngineer: z
    .string({ required_error: "El INVIMA del ingeniero es requerido" }),

  //references
  curriculum: z
    .string({ required_error: "El ID del curriculum es requerido" }),
});

export const checkSchema = z.object({
  name: z.string({
    required_error: "El nombre del check es requerido"
  }),
  inactive: z.boolean().optional().default(false)
});