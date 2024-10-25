import { z } from "zod";

export const citySchema = z.object({
  name: z
    .string({ required_error: "Nombre de ciudad requerido" })
    .min(3, { message: "Nombre de ciudad debe tener al menos 3 caracteres" }),
})

export const stateSchema = z.object({
  name: z
    .string({ required_error: "Nombre de departamento requerido" })
    .min(3, { message: "Nombre de departamento debe tener al menos 3 caracteres" }),
  country: z
    .string({ required_error: "País requerido" })
})

export const countrySchema = z.object({
  name: z
    .string({ required_error: "Nombre de país requerido" })
    .min(3, { message: "Nombre de país debe tener al menos 3 caracteres" }),
})
/** @link https://github.com/Mitchel2003/rest-api/blob/main/README.md#001 */