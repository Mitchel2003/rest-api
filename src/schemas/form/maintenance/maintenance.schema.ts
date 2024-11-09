import { z } from "zod";

const maintenanceSchema = z.object({
  //timestandard
  dateNextMaintenance: z
    .date({ required_error: "La fecha del próximo mantenimiento es requerida" }),

  dateMaintenance: z.date().optional(),

  //maintenance
  typeMaintenance: z
    .string({ required_error: "El tipo de mantenimiento es requerido" }),

  statusEquipment: z
    .string({ required_error: "El estado del equipo es requerido" }),

  faultEquipment: z.boolean().optional().default(false),

  faultDescription: z
    .string({ required_error: "La descripción de la falla es requerida" }),

  inspections: z
    .array(z.string({ required_error: "Las inspecciones son requeridas" })),

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
  equipment: z
    .string({ required_error: "El ID del equipo es requerido" }),

  headquarter: z
    .string({ required_error: "El ID de la sede es requerido" })
});

export default maintenanceSchema;
