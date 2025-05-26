import { Headquarter } from "@/types/location/headquarter.type";
import configSchema from "@/utils/schema";
import mongoose, { Schema } from "mongoose";

const headquarterSchema: Schema<Headquarter> = new Schema({
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
  address: {
    type: String,
    required: true
  },
  city: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'city'
  },
  client: {//user represents the client
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'user'
  }
}, configSchema);

export default mongoose.model('headquarter', headquarterSchema);