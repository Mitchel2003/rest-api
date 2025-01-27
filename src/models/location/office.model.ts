import { Office } from "@/types/location/office.type";
import configSchema from "@/utils/schema";
import mongoose, { Schema } from "mongoose";

const officeSchema: Schema<Office> = new Schema({
  name: {
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