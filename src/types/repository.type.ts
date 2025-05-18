import { Document, Types, PopulateOptions, PipelineStage } from "mongoose";

export interface Options {
  populate?: PopulateOptions | (string | PopulateOptions)[]
  limit?: number
  query?: Query
}
export type Populate = string | PopulateOptions | (string | PopulateOptions)[]
export type Doc<T> = T & Document<Types.ObjectId>
export type Query = Record<string, unknown>

export interface Repository<T> {
  create(data: T, populate?: Populate): Promise<Doc<T>>
  find(query?: Query, populate?: Populate): Promise<Doc<T>[]>
  findById(id: string, populate?: Populate): Promise<Doc<T> | null>
  findOne(query: Query, populate?: Populate): Promise<Doc<T> | null>
  findByUsers(options: Options & { userIds: string[] }, customPipeline: (objectIds: Types.ObjectId[], query: Query) => PipelineStage[]): Promise<Doc<T>[]>
  verifyOwnership(contextIds: string[], pipeline: PipelineStage[]): Promise<boolean>
  update(id: string, data: Partial<Doc<T>>, populate?: Populate): Promise<Doc<T> | null>
  updateMany(query: Query, update: any): Promise<boolean>
  delete(id: string, populate?: Populate): Promise<Doc<T> | null>
}
/*---------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------tools--------------------------------------------------*/
/** Certains us to convert doc on compatible Doc<T> */
export const asDoc = <T>(doc: MongoDoc): Doc<T> => {
  const { _id, __v, ...rest } = doc
  return { ...rest, _id: new Types.ObjectId(_id.toString()) } as Doc<T>
}
export interface MongoDoc extends Omit<any, '_id'> {
  _id: { toString(): string }
  [key: string]: any
}
export interface Aggregated extends Omit<any, '_id'> {
  _id: Types.ObjectId
  __v: number
}