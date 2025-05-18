import { Doc, Query, Populate } from "@/types/repository.type";
import Repository from "@/repositories/mongodb.repository";
import MongoDB from "@/services/mongodb/mongodb.service";
import { Result } from "@/interfaces/api.interface";

import stateModel from "@/models/location/state.model";
import { State } from "@/types/location/state.type";

class StateService extends MongoDB<State> {
  private static instance: StateService;
  private readonly defaultPopulate: Populate = {
    path: 'country',
    select: 'name'
  }

  private constructor() {
    super(Repository.create(stateModel))
  }

  public static getInstance(): StateService {
    if (!StateService.instance) StateService.instance = new StateService()
    return StateService.instance;
  }
  /** Busca un departamento por su id en la base de datos */
  async findById(id: string): Promise<Result<State | null>> {
    return super.findById(id, this.defaultPopulate);
  }
  /** Busca departamentos por query en la base de datos */
  async find(query?: Query, populate?: Populate): Promise<Result<State[]>> {
    return super.find(query, populate || this.defaultPopulate);
  }
  /** Crea un nuevo departamento en la base de datos */
  async create(data: State): Promise<Result<State>> {
    return super.create(data, this.defaultPopulate)
  }
  /** Actualiza un departamento por su id en la base de datos */
  async update(id: string, data: Partial<Doc<State>>): Promise<Result<State | null>> {
    return super.update(id, data, this.defaultPopulate)
  }
  /** Elimina un departamento por su id en la base de datos */
  async delete(id: string): Promise<Result<State | null>> {
    return super.delete(id, this.defaultPopulate)
  }
}

export const stateService = StateService.getInstance();