import { z } from "zod";

export const calibrationEquipmentSchema = z.object({
  value: z.string({
    required_error: "El valor de la calibración es requerido"
  }),
  provider: z.string({
    required_error: "El proveedor de la calibración es requerido"
  }),
  calibration: z.string({
    required_error: "El ID de la calibración es requerido"
  }),
  equipment: z.string({
    required_error: "El ID del equipo es requerido"
  })
});