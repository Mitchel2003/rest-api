import { Document, Schema } from "mongoose"
import { Query } from "repository.type"

export interface State extends Document {
  name: string,
  country: Schema.Types.ObjectId,
  createdAt?: Date,
  updatedAt?: Date
}

export interface StateService {
  createState(state: State): Promise<State>
  findStates(query?: Query): Promise<State[]>
  findOneState(query: Query): Promise<State>
  findStateById(id: string): Promise<State | null>
  updateState(id: string, cv: Partial<State>): Promise<State | null>
  DeleteState(id: string): Promise<boolean>
}