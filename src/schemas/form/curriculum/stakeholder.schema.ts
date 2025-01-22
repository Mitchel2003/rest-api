import { z } from "zod";

export const representativeSchema = z.object({
  name: z
    .string({ required_error: "El nombre del representante es requerido" }),
  phone: z
    .string()
    .optional()
    .transform((val) => val === '' ? 'n/r' : val),
  city: z
    .string()
    .optional()
    .transform((val) => val === '' ? 'n/r' : val)
});

export const supplierSchema = z.object({
  name: z
    .string({ required_error: "El nombre del proveedor es requerido" }),
  phone: z
    .string()
    .optional()
    .transform((val) => val === '' ? 'n/r' : val),
  city: z
    .string()
    .optional()
    .transform((val) => val === '' ? 'n/r' : val)
});

export const manufacturerSchema = z.object({
  name: z
    .string({ required_error: "El nombre del fabricante es requerido" }),
  phone: z
    .string()
    .optional()
    .transform((val) => val === '' ? 'n/r' : val),
  country: z
    .string()
    .optional()
    .transform((val) => val === '' ? 'n/r' : val)
});