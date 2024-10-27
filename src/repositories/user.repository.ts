import { Query, Repository } from "repository.type";
import userModel from "../models/user/user.model";
import { User } from "../types/user/user.type";

export class UserRepository implements Repository<User> {
  async create(data: User): Promise<User> {
    const user = new userModel(data)
    return await user.save()
  }
  async find(query?: Query): Promise<User[]> {
    return await userModel.find(query || {}).exec()
  }
  async findOne(query: Query): Promise<User | null> {
    return await userModel.findOne(query).exec()
  }
  async findById(id: string): Promise<User | null> {
    return await userModel.findById(id).exec()
  }
  async update(id: string, data: Partial<User>): Promise<User | null> {
    return await userModel.findByIdAndUpdate(id, data, { new: true }).exec()
  }
  async delete(id: string): Promise<boolean> {
    const res = await userModel.findByIdAndDelete(id).exec()
    return res !== null
  }
}