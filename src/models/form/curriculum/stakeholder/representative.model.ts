import { Representative } from "@/types/form/curriculum/stakeholder/representative.type";
import configSchema from "@/utils/schema";
import mongoose, { Schema } from "mongoose";

const representativeSchema: Schema<Representative> = new Schema({
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  city: {
    type: String,
    required: true,
    trim: true
  }
}, configSchema)

export default mongoose.model('representative', representativeSchema)