import { z } from "zod";

const notificationSchema = z.object({
  title: z
    .string({ required_error: "El título es requerido" }),
  message: z
    .string({ required_error: "El mensaje es requerido" }),
  type: z
    .string({ required_error: "El tipo es requerido" }),
  url: z
    .string().optional(),

  //references
  sender: z
    .string({ required_error: "El ID del remitente es requerido" }),
  recipient: z
    .string({ required_error: "El ID del destinatario es requerido" })
})

export default notificationSchema