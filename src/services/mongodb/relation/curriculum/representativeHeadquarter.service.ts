import { Doc, Query, Populate } from "@/types/repository.type";
import Repository from "@/repositories/mongodb.repository";
import MongoDB from "@/services/mongodb/mongodb.service";
import { Result } from "@/interfaces/api.interface";

import representativeHeadquarterModel from "@/models/relation/curriculum/representativeHeadquarter.model";
import { RepresentativeHeadquarter } from "@/types/relation/curriculum/representativeHeadquarter.type";

class RepresentativeHeadquarterService extends MongoDB<RepresentativeHeadquarter> {
  private static instance: RepresentativeHeadquarterService;
  private readonly defaultPopulate: Populate = {
    path: 'representative',
    select: 'name phone city'
  }

  private constructor() {
    super(Repository.create(representativeHeadquarterModel));
  }

  public static getInstance(): RepresentativeHeadquarterService {
    if (!RepresentativeHeadquarterService.instance) RepresentativeHeadquarterService.instance = new RepresentativeHeadquarterService();
    return RepresentativeHeadquarterService.instance;
  }

  // Overwrite the methods to apply the populate that corresponds to this service "representativeHeadquarter"
  async find(query?: Query, populate?: Populate): Promise<Result<RepresentativeHeadquarter[]>> {
    return super.find(query, populate || this.defaultPopulate);
  }
  async findById(id: string): Promise<Result<RepresentativeHeadquarter | null>> {
    return super.findById(id, this.defaultPopulate);
  }
  async update(id: string, data: Partial<Doc<RepresentativeHeadquarter>>): Promise<Result<RepresentativeHeadquarter | null>> {
    return super.update(id, data, this.defaultPopulate);
  }
}

export const representativeHeadquarterService = RepresentativeHeadquarterService.getInstance(); 