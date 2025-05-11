import { Repository, Doc, Query, Populate, Options, Aggregated, asDoc, MongoDoc } from "@/types/repository.type";
import { Document, Model, PipelineStage, Types } from "mongoose";

class MongoDBRepository<T> implements Repository<T> {
  private readonly model: Model<T & Document>
  private constructor(model: Model<T & Document>) { this.model = model }

  /**
   * Crea una instancia de un modelo database (Factory)
   * @param {Model<T & Document>} model - Corresponde al modelo en contexto
   * @returns {Repository<T>} Retorna las propiedades CRUD del modelo en cuestion
   */
  static create<T>(model: Model<T & Document>): Repository<T> {
    return new MongoDBRepository(model)
  }

  /** Permite buscar todos los registros en la base de datos, parametro opcional para filtrar los registros */
  async find(query?: Query, populate?: Populate): Promise<Doc<T>[]> {
    const req = this.model.find(query || {});
    if (populate) {
      if (Array.isArray(populate)) { populate.forEach(e => req.populate(typeof e === 'string' ? { path: e } : e)) }
      else { req.populate(typeof populate === 'string' ? { path: populate } : populate) }
    }
    return await req.exec() as Doc<T>[];
  }

  /** Permite buscar un registro por su id */
  async findById(id: string, populate?: Populate): Promise<Doc<T> | null> {
    const req = this.model.findById(id);
    if (populate) {// to prepare the query with populate
      if (Array.isArray(populate)) { populate.forEach(e => req.populate(typeof e === 'string' ? { path: e } : e)) }
      else { req.populate(typeof populate === 'string' ? { path: populate } : populate) }
    }
    return await req.exec() as Doc<T> | null;
  }

  /** Permite buscar un registro por su query */
  async findOne(query: Query, populate?: Populate): Promise<Doc<T> | null> {
    const req = this.model.findOne(query);
    if (populate) {// to prepare the query with populate
      if (Array.isArray(populate)) { populate.forEach(e => req.populate(typeof e === 'string' ? { path: e } : e)) }
      else { req.populate(typeof populate === 'string' ? { path: populate } : populate) }
    }
    return await req.exec() as Doc<T> | null;
  }

  /** Permite buscar registros por acceso */
  async findByUsers(
    options: Options & { userIds: string[] },
    customPipeline: (objectIds: Types.ObjectId[], query: Query) => PipelineStage[]
  ): Promise<Doc<T>[]> {
    const { userIds, limit, populate, query = {} } = options
    const objectIds = userIds.map(id => new Types.ObjectId(id))
    const pipeline = customPipeline(objectIds, query)//to build pipeline
    if (limit) pipeline.push({ $limit: limit } as PipelineStage)
    pipeline.push({ $sort: { createdAt: -1 } } as PipelineStage)
    //put pipeline and additional populate (optional) to deep search
    let data = await this.model.aggregate<Aggregated>(pipeline)
    if (populate) {// If populate so send it
      const ids = data.map(doc => new Types.ObjectId(doc._id.toString()))
      const populatedDocs = await this.model
        .find({ _id: { $in: ids } })
        .populate(populate)
        .sort({ createdAt: -1 }).lean()
      return populatedDocs.map(doc => asDoc<T>(doc as MongoDoc))
    }
    return data.map(doc => asDoc(doc))
  }

  /** Permite verificar propiedad de un recurso */
  async verifyOwnership(contextIds: string[], pipeline: PipelineStage[]): Promise<boolean> {
    const result = await this.model.aggregate(pipeline);
    const data = result.length > 0 ? result[0] : null;
    return data && contextIds.some(id => data.id && data.id.equals(new Types.ObjectId(id)));
  }

  /** Permite crear un nuevo registro en la base de datos */
  async create(data: T): Promise<Doc<T>> {
    const instance = new this.model(data);
    const doc = await instance.save();
    return doc.toObject() as Doc<T>;
  }

  /** Permite actualizar un registro por su id */
  async update(id: string, data: Partial<Doc<T>>, populate?: Populate): Promise<Doc<T> | null> {
    const req = this.model.findByIdAndUpdate(id, data, { new: true });
    if (populate) {// to prepare the query with populate
      if (Array.isArray(populate)) { populate.forEach(e => req.populate(typeof e === 'string' ? { path: e } : e)) }
      else { req.populate(typeof populate === 'string' ? { path: populate } : populate) }
    }
    return await req.exec() as Doc<T> | null;
  }

  /** Permite eliminar un registro por su id */
  async delete(id: string): Promise<boolean> {
    return await this.model.findByIdAndDelete(id).exec() !== null
  }
}

export default MongoDBRepository