import { CheckMaintenance } from "@/types/relation/maintenance/checkMaintenance.type";
import configSchema from "@/utils/schema";
import mongoose, { Schema } from "mongoose";

const CheckMaintenanceSchema: Schema<CheckMaintenance> = new Schema({
  value: {
    type: String,
    required: false,
  },
  check: {
    type: Schema.Types.ObjectId,
    ref: 'check',
    required: true
  },
  maintenance: {
    type: Schema.Types.ObjectId,
    ref: 'maintenance',
    required: true
  }
}, configSchema);

export default mongoose.model('check_maintenance', CheckMaintenanceSchema);