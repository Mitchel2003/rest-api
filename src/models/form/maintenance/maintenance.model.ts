import { Maintenance } from "@/types/form/maintenance/maintenance.type";
import configSchema from "@/utils/schema";
import mongoose, { Schema } from "mongoose";

const maintenanceSchema: Schema<Maintenance> = new Schema({
  //timestandard
  dateNextMaintenance: {
    type: String,
    requerid: true
  },
  dateMaintenance: {
    type: String,
    requerid: false,
    default: new Date(Date.now()).toISOString()
  },

  //maintenance
  typeMaintenance: {
    type: String,
    requerid: true
  },
  statusEquipment: {
    type: String,
    requerid: true
  },
  observations: {
    type: String,
    requerid: true
  },

  //relationship
  curriculum: {
    type: Schema.Types.ObjectId,
    ref: 'curriculum',
    required: true
  }
}, configSchema);

export default mongoose.model('maintenance', maintenanceSchema);