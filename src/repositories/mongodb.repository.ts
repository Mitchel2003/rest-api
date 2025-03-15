import { Repository, Doc, Query, Populate } from "@/types/repository.type";
import { Document, Model } from "mongoose";

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

  /** Permite buscar un registro por su query */
  async findOne(query: Query, populate?: Populate): Promise<Doc<T> | null> {
    const req = this.model.findOne(query);
    if (populate) {// to prepare the query with populate
      if (Array.isArray(populate)) { populate.forEach(e => req.populate(typeof e === 'string' ? { path: e } : e)) }
      else { req.populate(typeof populate === 'string' ? { path: populate } : populate) }
    }
    return await req.exec() as Doc<T> | null;
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