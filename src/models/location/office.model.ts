import { Office } from "@/types/location/office.type";
import configSchema from "@/utils/schema";
import mongoose, { Schema } from "mongoose";

const officeSchema: Schema<Office> = new Schema({
  name: {
    type: String,
    required: true
  },
  area: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'area'
  }
}, configSchema);

export default mongoose.model('office', officeSchema);