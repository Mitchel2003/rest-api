import { InspectionHeadquarter } from "@/types/relation/curriculum/inspectionHeadquarter.type";
import configSchema from "@/utils/schema";
import mongoose, { Schema } from "mongoose";

const inspectionHeadquarterSchema: Schema<InspectionHeadquarter> = new Schema({
  inspection: {
    type: Schema.Types.ObjectId,
    ref: 'inspection',
    required: true
  },
  headquarter: {
    type: Schema.Types.ObjectId,
    ref: 'headquarter',
    required: true
  },
  curriculum: {
    type: Schema.Types.ObjectId,
    ref: 'curriculum',
    required: true
  }
}, configSchema);

export default mongoose.model('inspection_headquarter', inspectionHeadquarterSchema);