import { Group } from "@/types/location/group.type";
import configSchema from "@/utils/schema";
import mongoose, { Schema } from "mongoose";

const groupSchema: Schema<Group> = new Schema({
  name: {
    type: String,
    required: true
  },
  services: {
    type: [String],
    required: true
  }
}, configSchema);

export default mongoose.model('group', groupSchema);