import { Manufacturer } from "@/types/form/curriculum/stakeholder/manufacturer.model";
import configSchema from "@/utils/schema";
import mongoose, { Schema } from "mongoose";

const manufacturerSchema: Schema<Manufacturer> = new Schema({
  name: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  }
}, configSchema)

export default mongoose.model('manufacturer', manufacturerSchema)