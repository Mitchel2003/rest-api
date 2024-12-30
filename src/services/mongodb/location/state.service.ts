import { Doc, Query, Populate } from "@/types/repository.type";
import Repository from "@/repositories/mongodb.repository";
import MongoDB from "@/services/mongodb/mongodb.service";
import { Result } from "@/interfaces/api.interface";

import stateModel from "@/models/location/state.model";
import { State } from "@/types/location/state.type";

class StateService extends MongoDB<State> {
  private static instance: StateService;
  private readonly defaultPopulate: Populate = {
    select: 'name',
    path: 'country',
  }

  private constructor() {
    super(Repository.create(stateModel))
  }

  public static getInstance(): StateService {
    if (!StateService.instance) StateService.instance = new StateService()
    return StateService.instance;
  }

  // Overwrite the methods to apply the populate that corresponds to this service "state"
  async find(query?: Query, populate?: Populate): Promise<Result<State[]>> {
    return super.find(query, populate || this.defaultPopulate);
  }
  async findById(id: string): Promise<Result<State | null>> {
    return super.findById(id, this.defaultPopulate);
  }
  async update(id: string, data: Partial<Doc<State>>): Promise<Result<State | null>> {
    return super.update(id, data, this.defaultPopulate);
  }
}

export const stateService = StateService.getInstance();