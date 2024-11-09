import { z } from "zod";

export const representativeSchema = z.object({
  name: z
    .string({ required_error: "El nombre del representante es requerido" }),
  email: z
    .string({ required_error: "El correo electrónico del representante es requerido" })
    .email({ message: "El correo electrónico del representante es inválido" }),
  phone: z
    .string({ required_error: "El teléfono del representante es requerido" })
});

export const supplierSchema = z.object({
  name: z
    .string({ required_error: "El nombre del proveedor es requerido" }),
  email: z
    .string({ required_error: "El correo electrónico del proveedor es requerido" })
    .email({ message: "El correo electrónico del proveedor es inválido" }),
  phone: z
    .string({ required_error: "El teléfono del proveedor es requerido" }),
  nit: z
    .string({ required_error: "El NIT del proveedor es requerido" })
    .regex(/^\d+$/, { message: "El NIT del proveedor debe contener solo números" })
});

export const manufacturerSchema = z.object({
  name: z
    .string({ required_error: "El nombre del fabricante es requerido" }),
  email: z
    .string({ required_error: "El correo electrónico del fabricante es requerido" })
    .email({ message: "El correo electrónico del fabricante es inválido" }),
  phone: z
    .string({ required_error: "El teléfono del fabricante es requerido" })
});