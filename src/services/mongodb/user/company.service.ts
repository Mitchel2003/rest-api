import Repository from "@/repositories/mongodb.repository";
import MongoDB from "@/services/mongodb/mongodb.service";
import companyModel from "@/models/user/company.model";
import { Company } from "@/types/user/company.type";

class CompanyService extends MongoDB<Company> {
  private static instance: CompanyService;

  private constructor() {
    super(Repository.create(companyModel))
  }

  public static getInstance(): CompanyService {
    if (!CompanyService.instance) CompanyService.instance = new CompanyService()
    return CompanyService.instance;
  }
}

export const companyService = CompanyService.getInstance();