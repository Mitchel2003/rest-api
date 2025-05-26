import { Document, Schema } from "mongoose";

export interface Curriculum extends Document {
  //inventory code
  inventory?: string,

  //standard
  name: string,
  brand: string,
  serie: string,
  service: string,
  modelEquip: string,
  healthRecord: string,
  photoUrl?: string,
  metadata?: Record<string, any>,

  //standard technicals
  characteristics: string,
  recommendationsManufacturer: string,

  //details
  datePurchase: string,
  dateInstallation: string,
  dateOperation: string,
  acquisition: string,
  warranty: string,
  price: string,

  //equipment
  useClassification: string,
  typeClassification: string,
  equipClassification: string,
  riskClassification?: string,
  biomedicalClassification?: string,
  technologyPredominant: string[],
  powerSupply: string[],

  //technical characteristics
  technicalCharacteristics: object,

  //maintenance
  employmentMaintenance: string,
  frequencyMaintenance: string,
  typeMaintenance: string[],
  manualsMaintenance: string[],

  //relationship
  office: Schema.Types.ObjectId,
  inspection: Schema.Types.ObjectId,
  representative: Schema.Types.ObjectId,
  supplier: Schema.Types.ObjectId,
  manufacturer: Schema.Types.ObjectId,
  createdBy: Schema.Types.ObjectId,
}

/**
 * Metadata (�):
 * 
 * Contains data files like manuals, certificates, etc; this is them arquitecture:
 * { files: string[] => pdfs urls }
 * 
 * createdBy (�):
 * 
 * createdBy can be user role "company" or "collaborator"
 * 
 * Reference to the user who created the curriculum;
 * Its especialy useful to know references like logo, signature, or license
 * that corresponds to the user associated to the creation of the curriculum,
 * this way we can autocomplete the form with the information required
 */