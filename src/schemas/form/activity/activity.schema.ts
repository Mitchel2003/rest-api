import { z } from "zod";

const activitySchema = z.object({
  dateAssignment: z
    .string().datetime(),

  //references
  engineer: z
    .string({ required_error: "El ID del colaborador es requerido" }),
  solicit: z
    .string({ required_error: "El ID de la solicitud es requerido" }),
})

export default activitySchema