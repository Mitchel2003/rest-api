import { z } from "zod";

export const checkMaintenanceSchema = z.object({
  value: z.string({
    required_error: "El valor es requerido"
  }),
  check: z.string({
    required_error: "El ID del checkeo es requerido"
  }),
  maintenance: z.string({
    required_error: "El ID del mantenimiento es requerido"
  })
});