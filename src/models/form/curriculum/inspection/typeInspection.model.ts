import { TypeInspection } from "@/types/form/curriculum/inspection/typeInspection.type";
import configSchema from "@/utils/schema";
import mongoose, { Schema } from "mongoose";

const typeInspectionSchema: Schema<TypeInspection> = new Schema({
  nameType: {
    type: String,
    required: true
  },
  inactive: {
    type: Boolean,
    required: false,
    default: false
  }
}, configSchema);

export default mongoose.model('type_inspection', typeInspectionSchema);