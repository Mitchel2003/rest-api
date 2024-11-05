import { Inspection } from "@/types/form/curriculum/inspection/inspection.type";
import configSchema from "@/utils/schema";
import mongoose, { Schema } from "mongoose";

const inspectionSchema: Schema<Inspection> = new Schema({
  presetInspection: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'preset_inspection'
  },
  typeInspection: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'type_inspection'
  },
}, configSchema);

export default mongoose.model('inspection', inspectionSchema);