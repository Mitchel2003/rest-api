import { z } from "zod";

const officeSchema = z.object({
  name: z
    .string({ required_error: "Nombre de oficina requerido" })
    .min(3, { message: "Nombre de oficina debe tener al menos 3 caracteres" })
    .max(50, { message: "Nombre de oficina no puede exceder los 50 caracteres" }),
  group: z
    .string({ required_error: "Grupo requerido" })
    .min(1, { message: "Debes seleccionar un grupo" }),
  services: z
    .array(z.string({ required_error: "Servicio requerido" }))
    .min(1, { message: "Debe seleccionar al menos un servicio" }),
  headquarter: z
    .string({ required_error: "Sede requerida" })
})

export default officeSchema;