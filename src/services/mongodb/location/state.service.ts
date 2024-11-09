import Repository from "@/repositories/mongodb.repository";
import MongoDB from "@/services/mongodb/mongodb.service";
import stateModel from "@/models/location/state.model";
import { State } from "@/types/location/state.type";

class StateService extends MongoDB<State> {
  private static instance: StateService;

  private constructor() {
    super(Repository.create(stateModel))
  }

  public static getInstance(): StateService {
    if (!StateService.instance) StateService.instance = new StateService()
    return StateService.instance;
  }
}

export const stateService = StateService.getInstance();