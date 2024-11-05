import { Query } from "@/types/repository.type"
import { Document } from "mongoose"

export interface Country extends Document {
  name: string,
  createdAt?: Date,
  updatedAt?: Date
}

export interface CountryService {
  createCountry(country: Country): Promise<Country>
  findCountrys(query?: Query): Promise<Country[]>
  findOneCountry(query: Query): Promise<Country | null>
  findCountryById(id: string): Promise<Country | null>
  updateCountry(id: string, cv: Partial<Country>): Promise<Country | null>
  deleteCountry(id: string): Promise<boolean>
}