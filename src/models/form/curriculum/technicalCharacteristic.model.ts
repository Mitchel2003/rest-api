import { TechnicalCharacteristic } from "@/types/form/curriculum/technicalCharacteristic.type";
import configSchema from "@/utils/schema";
import mongoose, { Schema } from "mongoose";

const technicalCharacteristicSchema: Schema<TechnicalCharacteristic> = new Schema({
  speed: { type: String, required: false },
  power: { type: String, required: false },
  weight: { type: String, required: false },
  voltage: { type: String, required: false },
  amperage: { type: String, required: false },
  capacity: { type: String, required: false },
  pressure: { type: String, required: false },
  humidity: { type: String, required: false },
  frequency: { type: String, required: false },
  temperature: { type: String, required: false },
  curriculum: { type: Schema.Types.ObjectId, required: true },
}, configSchema);

export default mongoose.model('technical_characteristic', technicalCharacteristicSchema);