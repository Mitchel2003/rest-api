import { z } from "zod";

const calibrationSchema = z.object({
  name: z.string({
    required_error: "El nombre de la calibración es requerido"
  }),
  typeMeasurement: z.string({
    required_error: "El tipo de medición es requerido"
  })
});

export default calibrationSchema; 