import { Equipment } from "../interfaces/model.interface";
import mongoose, { Schema } from "mongoose";

const equipmentSchema: Schema<Equipment> = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  user: {
    type: String,
    ref: 'user',
    required: true
  }
}, { timestamps: true, versionKey: false })

export default mongoose.model('equipment', equipmentSchema);
