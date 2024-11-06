import Repository from "@/repositories/mongodb.repository";
import MongoDB from "@/services/mongodb/mongodb.service";
import clientModel from "@/models/user/client.model";
import { User } from "@/types/user/user.type";

class UserService extends MongoDB<User> {
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