import { Client } from "../../types/user/client.type";
import configSchema from "../../utils/schema";
import mongoose, { Schema } from "mongoose";

const clientSchema: Schema<Client> = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, trim: true },
  phone: { type: Number, required: true, trim: true },
  nit: { type: String, required: true, unique: true, trim: true },
}, configSchema)

export default mongoose.model('client', clientSchema)