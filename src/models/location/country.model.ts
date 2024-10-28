import { Country } from "@/types/location/country.type";
import configSchema from "@/utils/schema";
import mongoose, { Schema } from "mongoose";

const countrySchema: Schema<Country> = new Schema({
  name: {
    type: String,
    required: true
  }
}, configSchema);

export default mongoose.model('country', countrySchema);