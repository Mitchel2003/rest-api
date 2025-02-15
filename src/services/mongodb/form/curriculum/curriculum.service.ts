import { Doc, Query, Populate, PaginationOptions, PaginatedResult } from "@/types/repository.type";
import Repository from "@/repositories/mongodb.repository";
import MongoDB from "@/services/mongodb/mongodb.service";
import { Result } from "@/interfaces/api.interface";

import curriculumModel from "@/models/form/curriculum/curriculum.model";
import { Curriculum } from "@/types/form/curriculum/curriculum.type";

class CurriculumService extends MongoDB<Curriculum> {
  private static instance: CurriculumService;
  private readonly defaultPopulate: Populate = [{
    path: 'office',
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
  }, {
    path: 'inspection',
    select: 'name typeInspection inactive',
  }, {
    path: 'representative',
    select: 'name phone city',
  }, {
    path: 'supplier',
    select: 'name phone city',
  }, {
    path: 'manufacturer',
    select: 'name phone country',
  }]

  private constructor() {
    super(Repository.create(curriculumModel))
  }

  public static getInstance(): CurriculumService {
    if (!CurriculumService.instance) CurriculumService.instance = new CurriculumService()
    return CurriculumService.instance;
  }

  // Overwrite the methods to apply the populate that corresponds to this service "curriculum"
  async findByPaginate(query: Query = {}, options?: PaginationOptions): Promise<Result<PaginatedResult<Curriculum>>> {
    return super.findByPaginate(query, {
      sort: options?.sort || { createdAt: -1 },
      perPage: options?.perPage || 10,
      page: options?.page || 1
    }, this.defaultPopulate)
  }
  async findById(id: string): Promise<Result<Curriculum | null>> {
    return super.findById(id, this.defaultPopulate);
  }
  async update(id: string, data: Partial<Doc<Curriculum>>): Promise<Result<Curriculum | null>> {
    return super.update(id, data, this.defaultPopulate);
  }
}

export const curriculumService = CurriculumService.getInstance();