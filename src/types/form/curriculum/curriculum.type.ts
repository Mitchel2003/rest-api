import { Document, Schema } from "mongoose";

export interface Curriculum extends Document {
  //standard
  name: string,
  brand: string,
  serie: string,
  modelEquip: string,
  healthRecord: string,
  photoUrl: string,
  characteristics: string,
  recommendationsManufacturer: string,

  //details
  datePurchase: Date,
  dateInstallation: Date,
  dateOperation: Date,
  dateManufacturing: Date,
  acquisition: string,
  warranty: string,
  price: number,

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
  serviceOffice: Schema.Types.ObjectId,
  representative: Schema.Types.ObjectId,
  supplier: Schema.Types.ObjectId,
  manufacturer: Schema.Types.ObjectId,
}