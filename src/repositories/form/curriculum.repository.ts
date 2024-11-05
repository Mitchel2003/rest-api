import CurriculumModel from "@/models/form/curriculum/curriculum.model";
import { Query, Repository } from "@/types/repository.type";
import { Curriculum } from "@/types/form/curriculum/curriculum.type";

export class CurriculumRepository implements Repository<Curriculum> {
  private static instance: CurriculumRepository;
  private constructor() { }

  public static getInstance(): CurriculumRepository {
    if (!CurriculumRepository.instance) CurriculumRepository.instance = new CurriculumRepository()
    return CurriculumRepository.instance;
  }

  /** Crea un nuevo curriculum */
  async create(data: Curriculum): Promise<Curriculum> {
    const cv = new CurriculumModel(data)
    return await cv.save()
  }
  /** Busca curriculum por consulta */
  async find(query?: Query): Promise<Curriculum[]> {
    return await CurriculumModel.find(query || {}).exec()
  }
  /** Busca un curriculum por consulta */
  async findOne(query: Query): Promise<Curriculum | null> {
    return await CurriculumModel.findOne(query).exec()
  }
  /** Busca un curriculum por su ID */
  async findById(id: string): Promise<Curriculum | null> {
    return await CurriculumModel.findById(id).exec()
  }
  /** Actualiza un curriculum por su ID */
  async update(id: string, data: Partial<Curriculum>): Promise<Curriculum | null> {
    return await CurriculumModel.findByIdAndUpdate(id, data, { new: true }).exec()
  }
  /** Elimina un curriculum por su ID */
  async delete(id: string): Promise<boolean> {
    const res = await CurriculumModel.findByIdAndDelete(id).exec()
    return res !== null
  }
}

export default CurriculumRepository.getInstance()