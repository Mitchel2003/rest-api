import { Curriculum } from "@/types/form/curriculum/curriculum.type";
import mongoose, { Schema } from "mongoose";
import configSchema from "@/utils/schema";

const curriculumSchema: Schema<Curriculum> = new Schema({
  //standard
  name: { type: String, required: true },
  brand: { type: String, required: true },
  serie: { type: String, required: true },
  service: { type: String, required: true },
  modelEquip: { type: String, required: true },
  healthRecord: { type: String, required: true },
  photoUrl: { type: String, required: false },
  metadata: { type: Object, required: false, default: {} },

  //standard technical
  characteristics: { type: String, required: true },
  recommendationsManufacturer: { type: String, required: true },

  //details
  datePurchase: { type: String, required: false },
  dateInstallation: { type: String, required: false },
  dateOperation: { type: String, required: false },
  acquisition: { type: String, required: true },
  warranty: { type: String, required: true },
  price: { type: String, required: true },

  //equipment
  useClassification: { type: String, required: true },
  typeClassification: { type: String, required: true },
  equipClassification: { type: String, required: true },
  riskClassification: { type: String, required: false },
  biomedicalClassification: { type: String, required: false },
  technologyPredominant: [{ type: String, required: true }],
  powerSupply: [{ type: String, required: true }],

  //technical characteristics
  technicalCharacteristics: { type: Object, required: false, default: {} },

  //maintenance
  employmentMaintenance: { type: String, required: true },
  frequencyMaintenance: { type: String, required: true },
  typeMaintenance: [{ type: String, required: true }],
  manualsMaintenance: [{ type: String, required: true }],

  //relationship
  office: {
    type: Schema.Types.ObjectId,
    ref: 'office',
    required: true
  },
  inspection: {
    type: Schema.Types.ObjectId,
    ref: 'inspection',
    required: true
  },
  representative: {
    type: Schema.Types.ObjectId,
    ref: 'representative',
    required: true
  },
  supplier: {
    type: Schema.Types.ObjectId,
    ref: 'supplier',
    required: true
  },
  manufacturer: {
    type: Schema.Types.ObjectId,
    ref: 'manufacturer',
    required: true
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  }
}, configSchema);

// Index for performance
curriculumSchema.index({ 'office': 1, createdAt: -1 }); // Search by office and date
curriculumSchema.index({ healthRecord: 1 }); // Search by health record
curriculumSchema.index({ service: 1 }); // Search by service

export default mongoose.model('curriculum', curriculumSchema);