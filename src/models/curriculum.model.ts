import { Curriculum } from "../interfaces/model.interface";
import mongoose, { Schema } from "mongoose";

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
  user: {
    type: String,
    ref: 'user',
    required: true
  }
}, { timestamps: true, versionKey: false })

export default mongoose.model('curriculum', curriculumSchema);
