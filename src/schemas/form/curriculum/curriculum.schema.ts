import { z } from "zod";

const curriculumSchema = z.object({
  //standard
  name: z
    .string({ required_error: "Nombre del equipo es requerido" }),
  brand: z
    .string({ required_error: "Marca del equipo es requerido" }),
  serie: z
    .string({ required_error: "Serie del equipo es requerido" }),
  service: z
    .string({ required_error: "Servicio es requerido" }),
  modelEquip: z
    .string({ required_error: "Modelo del equipo es requerido" }),
  healthRecord: z
    .string({ required_error: "Registro sanitario del equipo es requerido" }),
  photoUrl: z
    .string().optional().nullable(),
  metadata: z
    .object({}).optional().nullable(),

  //standard technical
  characteristics: z
    .string({ required_error: "Características del equipo son requeridas" }),
  recommendationsManufacturer: z
    .string({ required_error: "Recomendaciones del fabricante son requeridas" }),

  //details
  datePurchase: z
    .string().datetime().optional().nullable(),
  dateInstallation: z
    .string().datetime().optional().nullable(),
  dateOperation: z
    .string().datetime().optional().nullable(),
  acquisition: z
    .string({ required_error: "Tipo de adquisición del equipo es requerida" }),
  warranty: z
    .string({ required_error: "Garantía del equipo es requerida" }),
  price: z
    .string({ required_error: "Precio del equipo es requerido" }),

  //equipment
  useClassification: z
    .string({ required_error: "Clasificación de uso del equipo es requerida" }),
  typeClassification: z
    .string({ required_error: "Clasificación de tipo del equipo es requerida" }),
  equipClassification: z
    .string({ required_error: "Clasificación de equipo del equipo es requerida" }),
  biomedicalClassification: z
    .string().optional().nullable(),
  riskClassification: z
    .string().optional().nullable(),
  technologyPredominant: z
    .array(z.string({ required_error: "Tecnologías predominantes del equipo son requeridas" })),
  powerSupply: z
    .array(z.string({ required_error: "Suministro de energía del equipo es requerido" })),

  //technical characteristics
  technicalCharacteristics: z
    .object({}).optional().nullable(),

  //maintenance
  employmentMaintenance: z
    .string({ required_error: "Empleo del mantenimiento es requerido" }),
  frequencyMaintenance: z
    .string({ required_error: "Frecuencia de mantenimiento es requerida" }),
  typeMaintenance: z
    .array(z.string({ required_error: "Tipos de mantenimiento son requeridos" })),
  manualsMaintenance: z
    .array(z.string({ required_error: "Manuales de mantenimiento son requeridos" })),

  //relationship
  office: z
    .string({ required_error: "Oficina es requerida" }),
  inspection: z
    .string({ required_error: "Inspección es requerida" }),
  representative: z
    .string({ required_error: "Representante es requerido" }),
  supplier: z
    .string({ required_error: "Proveedor es requerido" }),
  manufacturer: z
    .string({ required_error: "Fabricante es requerido" }),
  createdBy: z
    .string({ required_error: "El ID del usuario creador es requerido" }),
})

export default curriculumSchema