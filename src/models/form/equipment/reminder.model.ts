import { Reminder } from "@/types/form/equipment/reminder.type";
import mongoose, { Schema } from "mongoose";
import configSchema from "@/utils/schema";

const reminderSchema: Schema<Reminder> = new Schema({
  date: {
    type: Date,
    requerid: false,
    default: new Date(Date.now())
  },
  subject: {
    type: String,
    requerid: true
  },
  message: {
    type: String,
    requerid: true
  },
  equipment: {
    type: Schema.Types.ObjectId,
    ref: 'equipment',
    required: true
  }
}, configSchema);

export default mongoose.model('reminder', reminderSchema);