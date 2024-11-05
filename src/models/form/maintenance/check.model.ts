import { Check } from "@/types/form/maintenance/check.type";
import configSchema from "@/utils/schema";
import mongoose, { Schema } from "mongoose";

const checkSchema: Schema<Check> = new Schema({
  name: {
    type: String,
    required: true
  },
  inactive: {
    type: Boolean,
    required: false,
    default: false
  }
}, configSchema);

export default mongoose.model('check', checkSchema);