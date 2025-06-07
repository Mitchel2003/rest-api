import { Activity } from "form/activity.type";
import configSchema from "@/utils/schema";
import mongoose, { Schema } from "mongoose";

const activitySchema: Schema<Activity> = new Schema({
  timeHours: { type: { start: String, end: String }, required: true },
  description: { type: String, required: true },
  dateAssignment: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    required: false,
    default: 'pendiente'
  },

  //state active
  timeSpent: { type: Number, default: null, required: false },
  isActive: { type: Boolean, default: false, required: false },
  lastResumedAt: { type: Date, default: null, required: false },

  //relationship
  collaborator: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  solicit: {
    type: Schema.Types.ObjectId,
    ref: 'solicit',
    required: true
  }
}, configSchema);

export default mongoose.model('activity', activitySchema);