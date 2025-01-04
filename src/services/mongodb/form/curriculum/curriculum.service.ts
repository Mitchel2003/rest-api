import { Doc, Query, Populate } from "@/types/repository.type";
import Repository from "@/repositories/mongodb.repository";
import MongoDB from "@/services/mongodb/mongodb.service";
import { Result } from "@/interfaces/api.interface";

import curriculumModel from "@/models/form/curriculum/curriculum.model";
import { Curriculum } from "@/types/form/curriculum/curriculum.type";

class CurriculumService extends MongoDB<Curriculum> {
  private static instance: CurriculumService;
  private readonly defaultPopulate: Populate = [{
    path: 'office',
    select: 'name area',
    populate: {
      path: 'area',
      select: 'name headquarter',
      populate: {
        path: 'headquarter',
        select: 'name address city client',
        populate: [{
          path: 'city',
          select: 'name state',
          populate: {
            path: 'state',
            select: 'name country',
            populate: {
              path: 'country',
              select: 'name'
            }
          }
        }, {
          path: 'client',
          select: 'name email phone nit'
        }]
      }
    }
  }, {
    path: 'representative',
    select: 'name email phone city'
  }, {
    path: 'supplier',
    select: 'name email address phone nit'
  }, {
    path: 'manufacturer',
    select: 'name email phone city'
  }]

  private constructor() {
    super(Repository.create(curriculumModel))
  }

  public static getInstance(): CurriculumService {
    if (!CurriculumService.instance) CurriculumService.instance = new CurriculumService()
    return CurriculumService.instance;
  }

  // Overwrite the methods to apply the populate that corresponds to this service "curriculum"
  async find(query?: Query, populate?: Populate): Promise<Result<Curriculum[]>> {
    return super.find(query, populate || this.defaultPopulate);
  }
  async findById(id: string): Promise<Result<Curriculum | null>> {
    return super.findById(id, this.defaultPopulate);
  }
  async update(id: string, data: Partial<Doc<Curriculum>>): Promise<Result<Curriculum | null>> {
    return super.update(id, data, this.defaultPopulate);
  }
}

export const curriculumService = CurriculumService.getInstance();