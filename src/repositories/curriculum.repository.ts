import curriculumModel from "../models/form/curriculum.model";
import { Curriculum } from "../types/form/curriculum.type";
import { Query, Repository } from "repository.type";

export class CurriculumRepository implements Repository<Curriculum> {
  async create(data: Curriculum): Promise<Curriculum> {
    const cv = new curriculumModel(data)
    return await cv.save()
  }
  async find(query?: Query): Promise<Curriculum[]> {
    return await curriculumModel.find(query || {}).exec()
  }
  async findOne(query: Query): Promise<Curriculum | null> {
    return await curriculumModel.findOne(query).exec()
  }
  async findById(id: string): Promise<Curriculum | null> {
    return await curriculumModel.findById(id).exec()
  }
  async update(id: string, data: Partial<Curriculum>): Promise<Curriculum | null> {
    return await curriculumModel.findByIdAndUpdate(id, data, { new: true }).exec()
  }
  async delete(id: string): Promise<boolean> {
    const res = await curriculumModel.findByIdAndDelete(id).exec()
    return res !== null
  }
}