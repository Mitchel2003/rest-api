import { RepresentativeHeadquarter } from "relation/representativeHeadquarter.type";
import configSchema from "@/utils/schema";
import mongoose, { Schema } from "mongoose";

const representativeHeadquarterSchema: Schema<RepresentativeHeadquarter> = new Schema({
  representative: {
    type: Schema.Types.ObjectId,
    ref: 'representative',
    required: true
  },
  headquarter: { type: String, required: true },
}, configSchema);

export default mongoose.model('representative_headquarter', representativeHeadquarterSchema);