import { z } from "zod";

const activitySchema = z.object({
  timeHours: z
    .object({ start: z.string(), end: z.string() }),
  description: z
    .string({ required_error: "La descripción es requerida" }),
  dateAssignment: z
    .string().datetime(),

  //references
  collaborator: z
    .string({ required_error: "El ID del colaborador es requerido" }),
  solicit: z
    .string({ required_error: "El ID de la solicitud es requerido" }),
})

export default activitySchema