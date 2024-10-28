import { Query, Repository } from "../../types/repository.type";
import UserModel from "../../models/user/user.model";
import { User } from "../../types/user/user.type";

export class UserRepository implements Repository<User> {
  async create(data: User): Promise<User> {
    const user = new UserModel(data)
    return await user.save()
  }
  async find(query?: Query): Promise<User[]> {
    return await UserModel.find(query || {}).exec()
  }
  async findOne(query: Query): Promise<User | null> {
    return await UserModel.findOne(query).exec()
  }
  async findById(id: string): Promise<User | null> {
    return await UserModel.findById(id).exec()
  }
  async update(id: string, data: Partial<User>): Promise<User | null> {
    return await UserModel.findByIdAndUpdate(id, data, { new: true }).exec()
  }
  async delete(id: string): Promise<boolean> {
    const res = await UserModel.findByIdAndDelete(id).exec()
    return res !== null
  }
}