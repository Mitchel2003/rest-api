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
  technicalCharacteristics: string[],
  recommendationsManufacturer: string,

  //details
  datePurchase: Date,
  dateInstallation: Date,
  dateOperation: Date,
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

  //maintenance
  employmentMaintenance: string,
  frequencyMaintenance: string,
  typeMaintenance: string[],
  manualsMaintenance: string,

  //relationship
  office: Schema.Types.ObjectId,
  inspection: Schema.Types.ObjectId,
  /*representative: Schema.Types.ObjectId,
  supplier: Schema.Types.ObjectId,
  manufacturer: Schema.Types.ObjectId,*/
}