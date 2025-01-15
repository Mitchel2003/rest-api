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
  statusEquipment: {
    type: String,
    requerid: true
  },
  observations: {
    type: String,
    requerid: true
  },

  //received
  receivedBy: {
    type: String,
    requerid: true
  },
  nameEngineer: {
    type: String,
    requerid: true
  },
  invimaEngineer: {
    type: String,
    requerid: true
  },

  //references
  curriculum: {
    type: Schema.Types.ObjectId,
    required: true
  }
}, configSchema);

export default mongoose.model('maintenance', maintenanceSchema);