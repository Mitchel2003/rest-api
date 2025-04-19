import { ManufacturerHeadquarter } from "relation/manufacturerHeadquarter.type";
import configSchema from "@/utils/schema";
import mongoose, { Schema } from "mongoose";

const manufacturerHeadquarterSchema: Schema<ManufacturerHeadquarter> = new Schema({
  manufacturer: {
    type: Schema.Types.ObjectId,
    ref: 'manufacturer',
    required: true
  },
  headquarter: { type: String, required: true }
}, configSchema);

export default mongoose.model('manufacturer_headquarter', manufacturerHeadquarterSchema);