import { Document, Schema } from "mongoose";

export interface Curriculum extends Document {
  //standard
  name: string,
  brand: string,
  serie: string,
  service: string,
  modelEquip: string,
  healthRecord: string,

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
  typeClassification: string,
  useClassification: string,
  biomedicalClassification: string,
  riskClassification: string,
  technologyPredominant: string[],
  powerSupply: string[],

  //technical characteristics
  technicalCharacteristics: object,

  //maintenance
  employmentMaintenance: string,
  frequencyMaintenance: string,
  typeMaintenance: string[],
  manualsMaintenance: string,

  //relationship
  office: Schema.Types.ObjectId,
  inspection: Schema.Types.ObjectId,
  representative: Schema.Types.ObjectId,
  supplier: Schema.Types.ObjectId,
  manufacturer: Schema.Types.ObjectId,
}