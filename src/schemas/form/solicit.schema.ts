import { z } from "zod";

const solicitSchema = z.object({
  message: z
    .string({ required_error: "El mensaje es requerido" }),
  priority: z
    .boolean().optional().default(false),

  //references
  curriculum: z
    .string({ required_error: "El ID del curriculum es requerido" }),
})

export default solicitSchema