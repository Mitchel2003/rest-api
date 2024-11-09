import { z } from "zod";

export const serviceOfficeSchema = z.object({
  service: z.string({
    required_error: "El ID del servicio es requerido"
  }),
  office: z.string({
    required_error: "El ID de la oficina es requerido"
  })
});

export const inspectionHeadquarterSchema = z.object({
  inspection: z.string({
    required_error: "El ID de la inspección es requerido"
  }),
  headquarter: z.string({
    required_error: "El ID de la sede es requerido"
  }),
  curriculum: z.string({
    required_error: "El ID del curriculum es requerido"
  })
});

export const representativeHeadquarterSchema = z.object({
  representative: z.string({
    required_error: "El ID del representante es requerido"
  }),
  headquarter: z.string({
    required_error: "El ID de la sede es requerido"
  })
});


export const supplierHeadquarterSchema = z.object({
  supplier: z.string({
    required_error: "El ID del proveedor es requerido"
  }),
  headquarter: z.string({
    required_error: "El ID de la sede es requerido"
  })
});

export const manufacturerHeadquarterSchema = z.object({
  manufacturer: z.string({
    required_error: "El ID del fabricante es requerido"
  }),
  headquarter: z.string({
    required_error: "El ID de la sede es requerido"
  })
});