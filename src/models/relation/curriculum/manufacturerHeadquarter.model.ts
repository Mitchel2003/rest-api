import { ManufacturerHeadquarter } from "@/types/relation/curriculum/manufacturerHeadquarter.type";
import configSchema from "@/utils/schema";
import mongoose, { Schema } from "mongoose";

const manufacturerHeadquarterSchema: Schema<ManufacturerHeadquarter> = new Schema({
  manufacturer: {
    type: Schema.Types.ObjectId,
    ref: 'manufacturer',
    required: true
  },
  headquarter: {
    type: Schema.Types.ObjectId,
    ref: 'headquarter',
    required: true
  }
}, configSchema);

export default mongoose.model('manufacturer_headquarter', manufacturerHeadquarterSchema);