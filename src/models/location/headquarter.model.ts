import { Headquarter } from "@/types/location/headquarter.type";
import configSchema from "@/utils/schema";
import mongoose, { Schema } from "mongoose";

const headquarterSchema: Schema<Headquarter> = new Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  city: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'city'
  },
  client: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'client'
  }
}, configSchema);

export default mongoose.model('headquarter', headquarterSchema);