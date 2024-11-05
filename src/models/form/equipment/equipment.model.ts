import { Equipment } from "@/types/form/equipment/equipment.type";
import mongoose, { Schema } from "mongoose";
import configSchema from "@/utils/schema";

const EquipmentSchema: Schema<Equipment> = new Schema({
  status: { type: String, requerid: true },
  curriculum: {
    type: Schema.Types.ObjectId,
    ref: 'curriculum',
    required: true
  }
}, configSchema);

export default mongoose.model('equipment', EquipmentSchema);