import { CalibrationEquipment } from "@/types/relation/equipment/calibrationEquipment.type";
import configSchema from "@/utils/schema";
import mongoose, { Schema } from "mongoose";

const calibrationEquipmentSchema: Schema<CalibrationEquipment> = new Schema({
  date: {
    type: Date,
    required: false,
    default: new Date(Date.now())
  },
  value: {
    type: String,
    required: true
  },
  provider: {
    type: String,
    required: true
  },
  calibration: {
    type: Schema.Types.ObjectId,
    ref: 'calibration',
    required: true
  },
  equipment: {
    type: Schema.Types.ObjectId,
    ref: 'equipment',
    required: true
  }
}, configSchema);

export default mongoose.model('calibration_equipment', calibrationEquipmentSchema);