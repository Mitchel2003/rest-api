import { Area } from "@/types/location/area.type";
import configSchema from "@/utils/schema";
import mongoose, { Schema } from "mongoose";

const areaSchema: Schema<Area> = new Schema({
  name: {
    type: String,
    required: true
  },
  headquarter: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'headquearter'
  }
}, configSchema);

export default mongoose.model('area', areaSchema);