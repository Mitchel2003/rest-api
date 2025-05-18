import { Signature } from "@/types/location/signature.type";
import configSchema from "@/utils/schema";
import mongoose, { Schema } from "mongoose";

const signatureSchema: Schema<Signature> = new Schema({
  url: {
    type: String,
    required: true
  },
  active: {
    type: Boolean,
    required: false,
    default: true
  },
  headquarter: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'headquarter'
  }
}, configSchema);

export default mongoose.model<Signature>("signature", signatureSchema);
