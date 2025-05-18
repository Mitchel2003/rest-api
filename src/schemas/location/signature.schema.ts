import { z } from "zod";

const signatureSchema = z.object({
  url: z
    .string({ required_error: "URL de la firma requerida" })
    .url({ message: "URL de firma inválida" }),
  active: z
    .boolean()
    .default(true),
  headquarter: z
    .string({ required_error: "Sede de la firma requerida" })
})

export default signatureSchema