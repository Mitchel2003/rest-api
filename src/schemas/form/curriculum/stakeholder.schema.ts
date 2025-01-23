import { z } from "zod";

export const representativeSchema = z.object({
  name: z
    .string({ required_error: "El nombre del representante es requerido" }),
  phone: z
    .string({ required_error: "El teléfono es requerido" }),
  city: z
    .string({ required_error: "La ciudad es requerida" })
})

export const supplierSchema = z.object({
  name: z
    .string({ required_error: "El nombre del proveedor es requerido" }),
  phone: z
    .string({ required_error: "El teléfono es requerido" }),
  city: z
    .string({ required_error: "La ciudad es requerida" })
})

export const manufacturerSchema = z.object({
  name: z
    .string({ required_error: "El nombre del fabricante es requerido" }),
  phone: z
    .string({ required_error: "El teléfono es requerido" }),
  country: z
    .string({ required_error: "El país es requerido" })
})