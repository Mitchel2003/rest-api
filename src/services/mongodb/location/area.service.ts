import Repository from "@/repositories/mongodb.repository";
import MongoDB from "@/services/mongodb/mongodb.service";
import areaModel from "@/models/location/area.model";
import { Area } from "@/types/location/area.type";

class AreaService extends MongoDB<Area> {
  private static instance: AreaService;

  private constructor() {
    super(Repository.create(areaModel))
  }

  public static getInstance(): AreaService {
    if (!AreaService.instance) AreaService.instance = new AreaService()
    return AreaService.instance;
  }
}

export const areaService = AreaService.getInstance();