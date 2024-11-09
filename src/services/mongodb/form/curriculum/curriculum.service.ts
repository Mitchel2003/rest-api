import curriculumModel from "@/models/form/curriculum/curriculum.model";
import { Curriculum } from "@/types/form/curriculum/curriculum.type";
import Repository from "@/repositories/mongodb.repository";
import MongoDB from "@/services/mongodb/mongodb.service";

class CurriculumService extends MongoDB<Curriculum> {
  private static instance: CurriculumService;

  private constructor() {
    super(Repository.create(curriculumModel))
  }

  public static getInstance(): CurriculumService {
    if (!CurriculumService.instance) CurriculumService.instance = new CurriculumService()
    return CurriculumService.instance;
  }
}

export const curriculumService = CurriculumService.getInstance();