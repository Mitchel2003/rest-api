import { ServiceOffice } from "@/types/relation/curriculum/serviceOffice.type";
import configSchema from "@/utils/schema";
import mongoose, { Schema } from "mongoose";

const serviceOfficeSchema: Schema<ServiceOffice> = new Schema({
  service: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'service'
  },
  office: {
    type: Schema.Types.ObjectId,
    ref: 'office',
    required: true
  }
}, configSchema);

export default mongoose.model('service_office', serviceOfficeSchema);