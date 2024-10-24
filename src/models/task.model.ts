import { Task } from "../interfaces/model.interface";
import mongoose, { Schema } from "mongoose";
import configSchema from "../utils/schema";

const taskSchema: Schema<Task> = new Schema({
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

  //reference to the user who created the task
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'user'
  }
}, configSchema)

export default mongoose.model('task', taskSchema);