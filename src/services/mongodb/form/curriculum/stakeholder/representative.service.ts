import Repository from "@/repositories/mongodb.repository";
import MongoDB from "@/services/mongodb/mongodb.service";

import representativeModel from "@/models/form/curriculum/stakeholder/representative.model";
import { Representative } from "@/types/form/curriculum/stakeholder/representative.type";

class RepresentativeService extends MongoDB<Representative> {
  private static instance: RepresentativeService;

  private constructor() {
    super(Repository.create(representativeModel))
  }

  public static getInstance(): RepresentativeService {
    if (!RepresentativeService.instance) RepresentativeService.instance = new RepresentativeService()
    return RepresentativeService.instance;
  }
}

export const representativeService = RepresentativeService.getInstance();