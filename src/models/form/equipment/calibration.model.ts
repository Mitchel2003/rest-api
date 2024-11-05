import { Calibration } from "@/types/form/equipment/calibration.type";
import mongoose, { Schema } from "mongoose";
import configSchema from "@/utils/schema";

const calibrationSchema: Schema<Calibration> = new Schema({
  name: {
    type: String,
    required: true
  },
  typeMeasurement: {
    type: String,
    requerid: true
  }
}, configSchema);

export default mongoose.model('calibration', calibrationSchema);