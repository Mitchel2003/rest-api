import { Document } from "mongoose"
import { Query } from "repository.type"

export interface Country extends Document {
  name: string,
  createdAt?: Date,
  updatedAt?: Date
}

export interface CountryService {
  createCountry(country: Country): Promise<Country>
  findCountrys(query?: Query): Promise<Country[]>
  findOneCountry(query: Query): Promise<Country>
  findCountryById(id: string): Promise<Country | null>
  updateCountry(id: string, cv: Partial<Country>): Promise<Country | null>
  DeleteCountry(id: string): Promise<boolean>
}