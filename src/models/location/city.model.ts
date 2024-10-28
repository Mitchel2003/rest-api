import { City } from "@/types/location/city.type";
import configSchema from "@/utils/schema";
import mongoose, { Schema } from "mongoose";

const citySchema: Schema<City> = new Schema({
  name: {
    type: String,
    required: true
  },
  state: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'state'
  }
}, configSchema);

export default mongoose.model('city', citySchema);