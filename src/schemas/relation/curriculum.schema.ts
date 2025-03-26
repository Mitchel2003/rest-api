import { z } from "zod";

export const representativeHeadquarterSchema = z.object({
  representative: z
    .string({ required_error: "El ID del representante es requerido" }),
  headquarter: z
    .string({ required_error: "El ID de la sede es requerido" })
});

export const supplierHeadquarterSchema = z.object({
  supplier: z
    .string({ required_error: "El ID del proveedor es requerido" }),
  headquarter: z
    .string({ required_error: "El ID de la sede es requerido" })
});

export const manufacturerHeadquarterSchema = z.object({
  manufacturer: z
    .string({ required_error: "El ID del fabricante es requerido" }),
  headquarter: z
    .string({ required_error: "El ID de la sede es requerido" })
});