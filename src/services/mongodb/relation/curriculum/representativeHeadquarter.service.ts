import representativeHeadquarterModel from "@/models/relation/curriculum/representativeHeadquarter.model";
import { RepresentativeHeadquarter } from "@/types/relation/curriculum/representativeHeadquarter.type";
import MongoDBService from "@/services/mongodb/mongodb.service";
import Repository from "@/repositories/mongodb.repository";

class RepresentativeHeadquarterService extends MongoDBService<RepresentativeHeadquarter> {
  private static instance: RepresentativeHeadquarterService;

  private constructor() {
    super(Repository.create(representativeHeadquarterModel));
  }

  public static getInstance(): RepresentativeHeadquarterService {
    if (!RepresentativeHeadquarterService.instance) RepresentativeHeadquarterService.instance = new RepresentativeHeadquarterService();
    return RepresentativeHeadquarterService.instance;
  }
}

export const representativeHeadquarterService = RepresentativeHeadquarterService.getInstance(); 