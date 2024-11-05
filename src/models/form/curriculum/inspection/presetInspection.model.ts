import { PresetInspection } from "@/types/form/curriculum/inspection/presetInspection.type";
import configSchema from "@/utils/schema";
import mongoose, { Schema } from "mongoose";

const presetInspectionSchema: Schema<PresetInspection> = new Schema({
  namePreset: {
    type: String,
    required: true
  },
  inactive: {
    type: Boolean,
    required: false,
    default: false
  }
}, configSchema);

export default mongoose.model('preset_inspection', presetInspectionSchema);