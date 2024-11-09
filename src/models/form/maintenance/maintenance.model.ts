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
  typeMaintenance: {
    type: String,
    requerid: true
  },
  statusEquipment: {
    type: String,
    requerid: true
  },
  faultEquipment: {
    type: Boolean,
    requerid: false,
    default: false
  },
  faultDescription: {
    type: String,
    requerid: true
  },
  inspections: [{
    type: String,
    requerid: true
  }],
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
  equipment: {
    type: Schema.Types.ObjectId,
    required: true
  },
  headquarter: {
    type: Schema.Types.ObjectId,
    required: true
  }
}, configSchema);

export default mongoose.model('maintenance', maintenanceSchema);