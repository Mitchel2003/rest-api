import { Maintenance } from "@/types/form/maintenance/maintenance.type";
import configSchema from "@/utils/schema";
import mongoose, { Schema } from "mongoose";

const maintenanceSchema: Schema<Maintenance> = new Schema({
  //timestandard
  dateNextMaintenance: {
    type: Date,
    requerid: true
  },
  dateMaintenance: {
    type: Date,
    requerid: false,
    default: new Date(Date.now())
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