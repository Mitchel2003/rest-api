import { Country as TypeCountry, State as TypeState, City as TypeCity } from "../interfaces/model.interface";
import mongoose, { Schema } from "mongoose";

/*--------------------------------------------------city--------------------------------------------------*/
const citySchema: Schema<TypeCity> = new Schema({
  name: {
    type: String,
    required: true
  },
  state: {
    type: Schema.Types.ObjectId,
    ref: 'state',
    required: true
  }
}, { timestamps: true, versionKey: false })

export const City = mongoose.model('city', citySchema)
/*---------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------state--------------------------------------------------*/
const stateSchema: Schema<TypeState> = new Schema({
  name: {
    type: String,
    required: true
  },
  country: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'country'
  }
}, { timestamps: true, versionKey: false })

export const State = mongoose.model('state', stateSchema)
/*---------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------country--------------------------------------------------*/
const countrySchema: Schema<TypeCountry> = new Schema({
  name: {
    type: String,
    required: true
  }
}, { timestamps: true, versionKey: false })

export const Country = mongoose.model('country', countrySchema)
/*---------------------------------------------------------------------------------------------------------*/