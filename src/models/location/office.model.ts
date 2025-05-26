import { Office } from "@/types/location/office.type";
import configSchema from "@/utils/schema";
import mongoose, { Schema } from "mongoose";

const officeSchema: Schema<Office> = new Schema({
  inventory: {
    type: String,
    required: false,
    unique: true,
    maxlength: 3
  },
  name: {
    type: String,
    required: true
  },
  group: {
    type: String,
    required: true
  },
  services: {
    type: [String],
    required: true
  },
  headquarter: {
    type: Schema.Types.ObjectId,
    ref: 'headquarter',
    required: true
  }
}, configSchema);

export default mongoose.model('office', officeSchema);