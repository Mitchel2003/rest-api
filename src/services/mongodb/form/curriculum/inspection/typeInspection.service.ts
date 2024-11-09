import typeInspectionModel from "@/models/form/curriculum/inspection/typeInspection.model";
import { TypeInspection } from "@/types/form/curriculum/inspection/typeInspection.type";
import MongoDBService from "@/services/mongodb/mongodb.service";
import Repository from "@/repositories/mongodb.repository";

class TypeInspectionService extends MongoDBService<TypeInspection> {
  private static instance: TypeInspectionService;

  private constructor() {
    super(Repository.create(typeInspectionModel));
  }

  public static getInstance(): TypeInspectionService {
    if (!TypeInspectionService.instance) TypeInspectionService.instance = new TypeInspectionService();
    return TypeInspectionService.instance;
  }
}

export const typeInspectionService = TypeInspectionService.getInstance(); 