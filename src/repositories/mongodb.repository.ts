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
  /*---------------------------------------------------------------------------------------------------------*/

  /*--------------------------------------------------functions--------------------------------------------------*/
  /**
   * Permite buscar todos los registros en la base de datos
   * @param query - Query para buscar los documentos
   * @param populate - Opciones de populate para devolver el documento con sus referencias
   * @returns {Promise<Doc<T>[]>} Retorna los documentos encontrados
   */
  async find(query?: Query, populate?: Populate): Promise<Doc<T>[]> {
    const req = this.model.find(query || {});
    if (populate) { //populate document if needed
      if (Array.isArray(populate)) { populate.forEach(e => req.populate(typeof e === 'string' ? { path: e } : e)) }
      else { req.populate(typeof populate === 'string' ? { path: populate } : populate) }
    } //or return document without populate
    return await req.exec() as Doc<T>[];
  }

  /**
   * Permite buscar un registro por su id
   * @param id - ID del documento a buscar
   * @param populate - Opciones de populate para devolver el documento con sus referencias
   * @returns Documento encontrado
   */
  async findById(id: string, populate?: Populate): Promise<Doc<T> | null> {
    const req = this.model.findById(id);
    if (populate) { //populate if needed
      if (Array.isArray(populate)) { populate.forEach(e => req.populate(typeof e === 'string' ? { path: e } : e)) }
      else { req.populate(typeof populate === 'string' ? { path: populate } : populate) }
    } //or return document without populate
    return await req.exec() as Doc<T> | null;
  }

  /**
   * Permite buscar un registro por su query
   * @param query - Query para buscar el documento
   * @param populate - Opciones de populate para devolver el documento con sus referencias
   * @returns Documento encontrado
   */
  async findOne(query: Query, populate?: Populate): Promise<Doc<T> | null> {
    const req = this.model.findOne(query);
    if (populate) { //populate if needed
      if (Array.isArray(populate)) { populate.forEach(e => req.populate(typeof e === 'string' ? { path: e } : e)) }
      else { req.populate(typeof populate === 'string' ? { path: populate } : populate) }
    } //or return document without populate
    return await req.exec() as Doc<T> | null;
  }

  /**
   * Permite buscar registros por acceso
   * @param options - Opciones para la busqueda
   * @param customPipeline - Pipeline personalizado para la busqueda
   * @returns {Promise<Doc<T>[]>} Retorna los documentos encontrados
   */
  async findByUsers(
    options: Options & { userIds: string[] },
    customPipeline: (objectIds: Types.ObjectId[], query: Query) => PipelineStage[]
  ): Promise<Doc<T>[]> {
    const { userIds, limit, populate, query = {} } = options
    const objectIds = userIds.map(id => new Types.ObjectId(id))
    const pipeline = customPipeline(objectIds, query)//build pipeline
    if (limit) pipeline.push({ $limit: limit } as PipelineStage)
    pipeline.push({ $sort: { createdAt: -1 } } as PipelineStage)
    //put pipeline and additional populate (optional) to deep search
    let data = await this.model.aggregate<Aggregated>(pipeline)
    if (populate) { //populate document if has populate option (optional)
      const ids = data.map(doc => new Types.ObjectId(doc._id.toString()))
      const populatedDocs = await this.model
        .find({ _id: { $in: ids } })
        .populate(populate)
        .sort({ createdAt: -1 }).lean()
      return populatedDocs.map(doc => asDoc<T>(doc as MongoDoc))
    } //or return document without populate
    return data.map(doc => asDoc(doc))
  }

  /**
   * Permite verificar la propiedad de un recurso, en otras palabras
   * Verifica si el usuario tiene acceso al recurso, mediante el pipeline customizado
   * @param contextIds - Representa los IDs de acceso (permissions) segun el usuario
   * @param pipeline - Representa el pipeline de agregacion para buscar el recurso
   * @returns {Promise<boolean>} Retorna true si el usuario tiene acceso al recurso
   */
  async verifyOwnership(contextIds: string[], pipeline: PipelineStage[]): Promise<boolean> {
    const result = await this.model.aggregate(pipeline);
    const data = result.length > 0 ? result[0] : null;
    return data && contextIds.some(id => data.id && data.id.equals(new Types.ObjectId(id)));
  }

  /**
   * Permite crear un nuevo registro en la base de datos
   * @param data - Datos del documento a crear en mongodb
   * @param populate - Opción para popular referencias (opcional)
   * @returns {Promise<Doc<T>>} Retorna el documento creado
   */
  async create(data: T, populate?: Populate): Promise<Doc<T>> {
    const instance = new this.model(data);
    const doc = await instance.save();
    if (populate) { //populate if needed
      const req = this.model.findById(doc._id)
      if (Array.isArray(populate)) { populate.forEach(e => req.populate(typeof e === 'string' ? { path: e } : e)) }
      else { req.populate(typeof populate === 'string' ? { path: populate } : populate) }
      return await req.exec() as Doc<T>;
    } //or return document without populate
    return doc.toObject() as Doc<T>;
  }

  /** 
   * Permite actualizar un registro por su id
   * @param id - ID del documento a actualizar
   * @param data - Datos a actualizar, Partial<T>
   * @param populate - Opción para popular referencias
   * @returns {Promise<Doc<T>>} Retorna el documento actualizado
   */
  async update(id: string, data: Partial<Doc<T>>, populate?: Populate): Promise<Doc<T> | null> {
    const req = this.model.findByIdAndUpdate(id, data, { new: true });
    if (populate) { //populate document if has populate option (optional)
      if (Array.isArray(populate)) { populate.forEach(e => req.populate(typeof e === 'string' ? { path: e } : e)) }
      else { req.populate(typeof populate === 'string' ? { path: populate } : populate) }
    } //returns populated document if populate is provided
    return await req.exec() as Doc<T> | null;
  }

  /** 
   * Permite actualizar registros por query
   * @param query - Query para buscar los documentos a actualizar
   * @param update - Datos a actualizar, suele ser un objeto con los campos
   * @returns {Promise<boolean>} Retorna true si se actualizaron registros
   */
  async updateMany(query: Query, update: any): Promise<boolean> {
    return await this.model.updateMany(query, update).exec() !== null
  }

  /** 
   * Permite eliminar un registro por su id
   * @param id - ID del documento a eliminar
   * @param populate - Opción para popular referencias
   * @returns {Promise<Doc<T> | null>} Retorna el documento eliminado o null
   */
  async delete(id: string, populate?: Populate): Promise<Doc<T> | null> {
    const req = this.model.findByIdAndDelete(id)
    if (populate) { //populate document if needed
      if (Array.isArray(populate)) { populate.forEach(e => req.populate(typeof e === 'string' ? { path: e } : e)) }
      else { req.populate(typeof populate === 'string' ? { path: populate } : populate) }
    } //returns populated document if populate is provided
    return await req.exec() as Doc<T> | null;
  }
}

export default MongoDBRepository