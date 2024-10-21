import { z } from "zod";

export const citySchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
})

export const stateSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
})

export const countrySchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
})
/** @link https://github.com/Mitchel2003/rest-api/blob/main/README.md#001 */