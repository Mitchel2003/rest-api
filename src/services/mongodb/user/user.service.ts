import Repository from '@/repositories/mongodb.repository';
import MongoDB from '@/services/mongodb/mongodb.service';
import { Result } from '@/interfaces/api.interface';
import userModel from '@/models/user/user.model';
import { User } from '@/types/user/user.type';

class UserService extends MongoDB<User> {
  private static instance: UserService;

  private constructor() {
    super(Repository.create(userModel))
  }

  public static getInstance(): UserService {
    if (!UserService.instance) UserService.instance = new UserService()
    return UserService.instance
  }

  async findByUid(uid: string): Promise<Result<User | null>> {
    return super.findOne({ uid })
  }
  async findByCompany(companyId: string): Promise<Result<User[]>> {
    return super.find({ 'company': companyId })
  }
}

export const userService = UserService.getInstance();