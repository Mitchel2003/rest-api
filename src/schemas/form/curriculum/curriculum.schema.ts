import { z } from "zod";

const curriculumSchema = z.object({
  //standard
  name: z.string({
    required_error: "Nombre del equipo es requerido"
  }),
  brand: z.string({
    required_error: "Marca del equipo es requerido"
  }),
  serie: z.string({
    required_error: "Serie del equipo es requerido"
  }),
  service: z.string({
    required_error: "Servicio es requerido"
  }),
  modelEquip: z.string({
    required_error: "Modelo del equipo es requerido"
  }),
  healthRecord: z.string({
    required_error: "Registro sanitario del equipo es requerido"
  }),

  //standard technicals
  characteristics: z.string({
    required_error: "Características del equipo son requeridas"
  }),
  technicalCharacteristics: z.array(
    z.string({
      required_error: "Caracteristicas tecnicas del equipo son requeridas"
    })
  ),
  recommendationsManufacturer: z.string().optional().nullable(),

  //details
  datePurchase: z.date(),
  dateInstallation: z.date(),
  dateOperation: z.date(),
  acquisition: z.string({
    required_error: "Fecha de adquisición del equipo es requerida"
  }),
  warranty: z.string({
    required_error: "Garantía del equipo es requerida"
  }),
  price: z.string({
    required_error: "Precio del equipo es requerido"
  }),

  //equipment
  useClassification: z.string({
    required_error: "Clasificación de uso del equipo es requerida"
  }),
  typeClassification: z.string({
    required_error: "Clasificación de tipo del equipo es requerida"
  }),
  biomedicalClassification: z.string({
    required_error: "Clasificación biomédica del equipo es requerida"
  }),
  riskClassification: z.string({
    required_error: "Clasificación de riesgo del equipo es requerida"
  }),
  technologyPredominant: z.array(
    z.string({
      required_error: "Tecnologías predominantes del equipo son requeridas"
    })
  ),
  powerSupply: z.array(
    z.string({
      required_error: "Suministro de energía del equipo es requerido"
    })
  ),

  //maintenance
  employmentMaintenance: z.string({
    required_error: "Empleo del mantenimiento es requerido"
  }),
  frequencyMaintenance: z.string({
    required_error: "Frecuencia de mantenimiento es requerida"
  }),
  typeMaintenance: z.array(
    z.string({
      required_error: "Tipos de mantenimiento son requeridos"
    })
  ),
  manualsMaintenance: z.string({
    required_error: "Manuales de mantenimiento son requeridos"
  }),

  //relationship
  office: z.string({
    required_error: "Oficina es requerida"
  }),
  inspection: z.string({
    required_error: "Inspección es requerida"
  }),
  /*representative: z.string({
    required_error: "Representante es requerido"
  }),*/
  /*supplier: z.string({
    required_error: "Proveedor es requerido"
  }),*/
  /*manufacturer: z.string({
    required_error: "Fabricante es requerido"
  })*/
})

export default curriculumSchema