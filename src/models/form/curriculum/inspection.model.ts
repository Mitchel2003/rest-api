import { Inspection } from "@/types/form/curriculum/inspection.type";
import configSchema from "@/utils/schema";
import mongoose, { Schema } from "mongoose";

const inspectionSchema: Schema<Inspection> = new Schema({
  name: {
    type: String,
    required: true
  },
  inactive: {
    type: Boolean,
    required: false,
    default: false
  },
  typeInspection: [{
    type: String,
    required: true
  }]
}, configSchema);

export default mongoose.model('inspection', inspectionSchema);