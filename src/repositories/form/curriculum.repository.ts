import CurriculumModel from "@/models/form/cv.model";
import { Query, Repository } from "@/types/repository.type";
import { Curriculum } from "form/curriculum/curriculum.type";

export class CurriculumRepository implements Repository<Curriculum> {
  private static instance: CurriculumRepository;
  private constructor() { }

  public static getInstance(): CurriculumRepository {
    if (!CurriculumRepository.instance) CurriculumRepository.instance = new CurriculumRepository()
    return CurriculumRepository.instance;
  }

  async create(data: Curriculum): Promise<Curriculum> {
    const cv = new CurriculumModel(data)
    return await cv.save()
  }
  async find(query?: Query): Promise<Curriculum[]> {
    return await CurriculumModel.find(query || {}).exec()
  }
  async findOne(query: Query): Promise<Curriculum | null> {
    return await CurriculumModel.findOne(query).exec()
  }
  async findById(id: string): Promise<Curriculum | null> {
    return await CurriculumModel.findById(id).exec()
  }
  async update(id: string, data: Partial<Curriculum>): Promise<Curriculum | null> {
    return await CurriculumModel.findByIdAndUpdate(id, data, { new: true }).exec()
  }
  async delete(id: string): Promise<boolean> {
    const res = await CurriculumModel.findByIdAndDelete(id).exec()
    return res !== null
  }
}

export default CurriculumRepository.getInstance()