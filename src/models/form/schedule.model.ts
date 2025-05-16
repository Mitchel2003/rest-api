import { Schedule } from "form/schedule.type";
import configSchema from "@/utils/schema";
import mongoose, { Schema } from "mongoose";

const scheduleSchema: Schema<Schedule> = new Schema({
  typeClassification: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  //relationship
  client: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  }
}, configSchema);

export default mongoose.model('schedule', scheduleSchema);