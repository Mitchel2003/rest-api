import { RepresentativeHeadquarter } from "@/types/relation/curriculum/representativeHeadquarter.type";
import configSchema from "@/utils/schema";
import mongoose, { Schema } from "mongoose";

const representativeHeadquarterSchema: Schema<RepresentativeHeadquarter> = new Schema({
  representative: {
    type: Schema.Types.ObjectId,
    ref: 'representative',
    required: true
  },
  headquarter: {
    type: Schema.Types.ObjectId,
    ref: 'headquarter',
    required: true
  }
}, configSchema);

export default mongoose.model('representative_headquarter', representativeHeadquarterSchema);