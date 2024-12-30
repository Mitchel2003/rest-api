import { Repository, Doc, Query, Populate } from "@/types/repository.type";
import { Document, Model } from "mongoose";

class MongoDBRepository {
  /**
   * Crea una instancia de un modelo database (Factory)
   * @param {Model<T & Document>} model - Corresponde al modelo en contexto
   * @returns {Repository<T>} Retorna las propiedades CRUD del modelo en cuestion
   */
  static create<T>(model: Model<T & Document>): Repository<T> {
    return {
      /** Permite crear un nuevo registro en la base de datos */
      create: async (data: T) => {
        const instance = new model(data);
        const doc = await instance.save();
        return doc.toObject() as Doc<T>;
      },
      /** Permite buscar todos los registros en la base de datos, parametro opcional para filtrar los registros */
      find: async (query?: Query, populate?: Populate) => {
        const req = model.find(query || {});
        if (populate) {// to prepare the query with populate
          if (Array.isArray(populate)) { populate.forEach(e => req.populate(typeof e === 'string' ? { path: e } : e)) }
          else { req.populate(typeof populate === 'string' ? { path: populate } : populate) }
        }
        return await req.exec() as Doc<T>[];
      },
      /** Permite buscar un registro por su id */
      findById: async (id: string, populate?: Populate) => {
        const req = model.findById(id);
        if (populate) {// to prepare the query with populate
          if (Array.isArray(populate)) { populate.forEach(e => req.populate(typeof e === 'string' ? { path: e } : e)) }
          else { req.populate(typeof populate === 'string' ? { path: populate } : populate) }
        }
        return await req.exec() as Doc<T> | null;
      },
      /** Permite actualizar un registro por su id */
      update: async (id: string, data: Partial<Doc<T>>, populate?: Populate) => {
        const req = model.findByIdAndUpdate(id, data, { new: true });
        if (populate) {// to prepare the query with populate
          if (Array.isArray(populate)) { populate.forEach(e => req.populate(typeof e === 'string' ? { path: e } : e)) }
          else { req.populate(typeof populate === 'string' ? { path: populate } : populate) }
        }
        return await req.exec() as Doc<T> | null;
      },
      /** Permite eliminar un registro por su id */
      delete: async (id: string) => {
        return await model.findByIdAndDelete(id).exec() !== null
      }
    }
  }
}

export default MongoDBRepository;