import mongoose, { Schema } from "mongoose";
import configSchema from "../utils/schema";
import {
  Headquarter as TypeHeadquarter,
  UserHeadquarter as TypeUserHeadquarter,

  Country as TypeCountry,
  State as TypeState,
  City as TypeCity
} from "../interfaces/model.interface";

/*--------------------------------------------------headquarter association--------------------------------------------------*/
const headquarterSchema: Schema<TypeHeadquarter> = new Schema({//headquarter
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  city: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'city'
  },
  client: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'client'
  }
}, configSchema);

const userHeadquarterSchema: Schema<TypeUserHeadquarter> = new Schema({//user headquarter
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'user'
  },
  headquarter: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'headquarter'
  }
}, configSchema);

export const Headquarter = mongoose.model('headquarter', headquarterSchema);
export const UserHeadquarter = mongoose.model('user_headquarter', userHeadquarterSchema);
/*---------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------location global--------------------------------------------------*/
const citySchema: Schema<TypeCity> = new Schema({//city
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

const stateSchema: Schema<TypeState> = new Schema({//state
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

const countrySchema: Schema<TypeCountry> = new Schema({//country
  name: {
    type: String,
    required: true
  }
}, configSchema);

export const City = mongoose.model('city', citySchema);
export const State = mongoose.model('state', stateSchema);
export const Country = mongoose.model('country', countrySchema);
/*---------------------------------------------------------------------------------------------------------*/