import { Activity } from "form/activity.type";
import configSchema from "@/utils/schema";
import mongoose, { Schema } from "mongoose";

const activitySchema: Schema<Activity> = new Schema({
  dateAssignment: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    required: false,
    default: 'pendiente'
  },

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