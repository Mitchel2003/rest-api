import { z } from "zod";

/** @link https://github.com/Mitchel2003/rest-api/blob/main/README.md#001 */
const stateSchema = z.object({
  name: z
    .string({ required_error: "Nombre de departamento requerido" })
    .min(3, { message: "Nombre de departamento debe tener al menos 3 caracteres" }),
  country: z
    .string({ required_error: "País requerido" })
})

export default stateSchema