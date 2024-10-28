import { State } from "@/types/location/state.type";
import configSchema from "@/utils/schema";
import mongoose, { Schema } from "mongoose";

const stateSchema: Schema<State> = new Schema({
  name: {
    type: String,
    required: true
  },
  country: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'country'
  }
}, configSchema);

export default mongoose.model('state', stateSchema);