import { Maintenance } from "form/maintenance.type";
import configSchema from "@/utils/schema";
import mongoose, { Schema } from "mongoose";

const maintenanceSchema: Schema<Maintenance> = new Schema({
  //timestandard
  signedAt: {
    type: Date,
    required: false
  },
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
  metadata: {
    default: {},
    type: Object,
    required: false
  },

  //relationship
  curriculum: {
    type: Schema.Types.ObjectId,
    ref: 'curriculum',
    required: true
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  signature: {
    type: Schema.Types.ObjectId,
    ref: 'signature',
    required: false
  }
}, configSchema);

export default mongoose.model('maintenance', maintenanceSchema);