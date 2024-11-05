import { Service } from "@/types/location/service.type";
import configSchema from "@/utils/schema";
import mongoose, { Schema } from "mongoose";

const serviceSchema: Schema<Service> = new Schema({
  name: {
    type: String,
    required: true
  }
}, configSchema);

export default mongoose.model('service', serviceSchema);