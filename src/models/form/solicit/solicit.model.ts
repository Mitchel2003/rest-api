import { Solicit } from "@/types/form/solicit/solicit.type";
import configSchema from "@/utils/schema";
import mongoose, { Schema } from "mongoose";

const solicitSchema: Schema<Solicit> = new Schema({
  message: {
    type: String,
    required: true
  },
  priority: {
    type: Boolean,
    required: true
  },
  status: {
    type: String,
    required: false,
    default: 'pendiente'
  },

  //relationship
  curriculum: {
    type: Schema.Types.ObjectId,
    ref: 'curriculum',
    required: true
  }
}, configSchema);

export default mongoose.model('solicit', solicitSchema);