import { z } from "zod";

const reminderSchema = z.object({
  subject: z.string({
    required_error: "El asunto del recordatorio es requerido"
  }),
  message: z.string({
    required_error: "El mensaje del recordatorio es requerido"
  }),
  equipment: z.string({
    required_error: "El ID del equipo es requerido"
  })
});

export default reminderSchema; 