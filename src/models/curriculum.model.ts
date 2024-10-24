import { Curriculum } from "../interfaces/model.interface";
import mongoose, { Schema } from "mongoose";
import configSchema from "../utils/schema";

const curriculumSchema: Schema<Curriculum> = new Schema({
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

  //reference to the user who created the curriculum
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'user'
  }
}, configSchema)

export default mongoose.model('curriculum', curriculumSchema);