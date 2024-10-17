import { Task } from "../interfaces/model.interface";
import mongoose, { Schema } from "mongoose";

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
}, { timestamps: true, versionKey: false })

export default mongoose.model('task', taskSchema);
