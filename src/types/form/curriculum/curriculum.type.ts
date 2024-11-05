import { Query } from "@/types/repository.type"
import { Schema } from "mongoose";
import { Document } from "mongoose";

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

export interface CurriculumService {
  createCurriculum(cv: Curriculum): Promise<Curriculum>
  findCurriculums(query?: Query): Promise<Curriculum[]>
  findOneCurriculum(query: Query): Promise<Curriculum>
  findCurriculumById(id: string): Promise<Curriculum | null>
  updateCurriculum(id: string, cv: Partial<Curriculum>): Promise<Curriculum | null>
  DeleteCurriculum(id: string): Promise<boolean>
}