import { MongoDBService as MongoDB } from "@/services/mongodb/mongodb.service";
import { Repository } from "@/repositories/mongodb/mongodb.repository";
import clientModel from "@/models/user/client.model";
import { User } from "@/types/user/user.type";

export class UserService extends MongoDB<User> {
  private static instance: UserService;

  private constructor() {
    super(Repository.create(clientModel))
  }

  public static getInstance(): UserService {
    if (!UserService.instance) UserService.instance = new UserService()
    return UserService.instance;
  }
}

export const userService = UserService.getInstance();