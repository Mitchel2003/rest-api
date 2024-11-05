import { Accessory } from "@/types/form/curriculum/accessory.type";
import configSchema from "@/utils/schema";
import mongoose, { Schema } from "mongoose";

const accessorySchema: Schema<Accessory> = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  serie: { type: String, required: true },
  modelEquip: { type: String, required: true },
  curriculum: {
    type: Schema.Types.ObjectId,
    ref: 'curriculum',
    required: true
  },
}, configSchema);

export default mongoose.model('accessory', accessorySchema);