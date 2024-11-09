import userHeadquarterModel from "@/models/relation/engineer/userHeadquarter.model";
import { UserHeadquarter } from "@/types/relation/engineer/userHeadquarter.type";
import Repository from "@/repositories/mongodb.repository";
import MongoDB from "@/services/mongodb/mongodb.service";

class UserHeadquarterService extends MongoDB<UserHeadquarter> {
  private static instance: UserHeadquarterService;

  private constructor() {
    super(Repository.create(userHeadquarterModel))
  }

  public static getInstance(): UserHeadquarterService {
    if (!UserHeadquarterService.instance) UserHeadquarterService.instance = new UserHeadquarterService()
    return UserHeadquarterService.instance;
  }
}

export const userHeadquarterService = UserHeadquarterService.getInstance();