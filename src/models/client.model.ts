import { Client } from "../interfaces/model.interface";
import mongoose, { Schema } from "mongoose";
import configSchema from "../utils/schema";

const clientSchema: Schema<Client> = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, trim: true },
  phone: { type: Number, required: true, trim: true },
  nit: { type: String, required: true, unique: true, trim: true },
}, configSchema)

export default mongoose.model('client', clientSchema)