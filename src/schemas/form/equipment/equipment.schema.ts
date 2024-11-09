import { z } from "zod";

const equipmentSchema = z.object({
  status: z.enum(["operando", "en espera", "fuera de servicio"]).default("operando"),
  dateNextMaintenance: z.date().optional().nullable(),
  dateLastMaintenance: z.date().optional().nullable(),
  curriculum: z.string({
    required_error: "El ID del curriculum es requerido"
  })
})

export default equipmentSchema; 