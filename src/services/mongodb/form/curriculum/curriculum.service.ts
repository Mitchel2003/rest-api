import { Types, PipelineStage, PopulateOptions } from "mongoose";
import { handlerService as handler } from "@/errors/handler";
import Repository from "@/repositories/mongodb.repository";
import MongoDB from "@/services/mongodb/mongodb.service";
import { Doc, Query } from "@/types/repository.type";
import { Result } from "@/interfaces/api.interface";
// import { redisService as redis } from "@/services/cache/redis.service";
// import { Cached } from "@/decorators/cache.decorator";
// import { redisConfig } from "@/utils/redis";

import curriculumModel from "@/models/form/curriculum/curriculum.model";
import { Curriculum } from "@/types/form/curriculum/curriculum.type";

interface MongoDocument extends Omit<Curriculum, '_id'> { _id: { toString(): string };[key: string]: any }
interface AggregatedCurriculum extends Omit<Curriculum, '_id'> { _id: Types.ObjectId; __v: number }
interface FindByProviderOptions {
  populate?: PopulateOptions | (string | PopulateOptions)[];
  company: string;
  limit?: number;
  query?: Query;
}

class CurriculumService extends MongoDB<Curriculum> {
  // private readonly redis: typeof redis;
  private static instance: CurriculumService;
  private readonly defaultPopulate: PopulateOptions[] = [{// Populate with all the details
    path: 'office',
    select: 'name headquarter',
    populate: {
      path: 'headquarter',
      select: 'name address city client',
      populate: [{
        path: 'city',
        select: 'name state',
        populate: {
          path: 'state',
          select: 'name country',
          populate: {
            path: 'country',
            select: 'name'
          }
        }
      }, {
        path: 'client',
        select: 'name email phone nit'
      }]
    }
  }, {
    path: 'inspection',
    select: 'name typeInspection inactive',
  }, {
    path: 'representative',
    select: 'name phone city',
  }, {
    path: 'supplier',
    select: 'name phone city',
  }, {
    path: 'manufacturer',
    select: 'name phone country',
  }]

  private readonly listPopulate: PopulateOptions[] = [{// Populate for lists
    path: 'office',
    select: 'name headquarter',
    populate: {
      path: 'headquarter',
      select: 'name client',
      populate: {
        path: 'client',
        select: 'name'
      }
    }
  }]

  private constructor() {
    super(Repository.create(curriculumModel));
    // this.redis = redis;
  }

  public static getInstance(): CurriculumService {
    if (!CurriculumService.instance) CurriculumService.instance = new CurriculumService()
    return CurriculumService.instance;
  }

  /**
   * Converts a MongoDB document to a Doc<Curriculum>
   * @param doc MongoDB document
   * @returns Doc<Curriculum>
   */
  private convertToDoc(doc: MongoDocument): Doc<Curriculum> {
    const { _id, __v, ...rest } = doc;
    return { ...rest, _id: new Types.ObjectId(_id.toString()) } as Doc<Curriculum>;
  }

  // @Cached({//redis config
  //   keyPrefix: 'gs:curriculum:ownership',
  //   ttl: redisConfig.ttl.curriculum,
  //   keyGenerator: (curriculumId: string, providerId: string) => `gs:curriculum:${curriculumId}:provider:${providerId}`
  // })
  async verifyProviderOwnership(curriculumId: string, providerId: string): Promise<Result<boolean>> {
    return handler(async () => {
      /* Temporarily disabled Redis cache
      const cacheKey = `curriculum:${curriculumId}:provider:${providerId}`;
      const cachedResult = await this.redis.get(cacheKey);
      if (cachedResult !== null) return cachedResult;
      */

      const pipeline: PipelineStage[] = [
        { $match: { _id: new Types.ObjectId(curriculumId) } } as PipelineStage,
        {
          $lookup: {
            from: 'offices',
            localField: 'office',
            foreignField: '_id',
            as: 'officeData'
          }
        } as PipelineStage,
        { $unwind: '$officeData' } as PipelineStage,
        {
          $lookup: {
            from: 'headquarters',
            localField: 'officeData.headquarter',
            foreignField: '_id',
            as: 'headquarterData'
          }
        } as PipelineStage,
        { $unwind: '$headquarterData' } as PipelineStage,
        {
          $lookup: {
            from: 'clients',
            localField: 'headquarterData.client',
            foreignField: '_id',
            as: 'clientData'
          }
        } as PipelineStage,
        { $unwind: '$clientData' } as PipelineStage
      ]
      const result = await curriculumModel.aggregate<{ clientData: { _id: Types.ObjectId } }>(pipeline)
      if (!result.length) return false
      return result[0].clientData._id.equals(new Types.ObjectId(providerId))

      /* Temporarily disabled Redis cache
      await this.redis.set(cacheKey, isOwner, 3600);
      */
    }, "verificar propiedad del curriculum")
  }

  // @Cached({//redis config
  //   keyPrefix: 'gs:provider:curriculums',
  //   ttl: redisConfig.ttl.curriculum,
  //   keyGenerator: (options: FindByProviderOptions) => `gs:provider:${options.company}:curriculums`
  // })
  async findByProvider(options: FindByProviderOptions): Promise<Result<Curriculum[]>> {
    return handler(async () => {
      const { query = {}, limit, company, populate } = options;
      const pipeline: PipelineStage[] = [{// Join with office and headquarter to access client
        $lookup: {
          from: 'offices',
          localField: 'office',
          foreignField: '_id',
          as: 'officeData'
        }
      } as PipelineStage,
      { $unwind: '$officeData' } as PipelineStage,
      {
        $lookup: {
          from: 'headquarters',
          localField: 'officeData.headquarter',
          foreignField: '_id',
          as: 'headquarterData'
        }
      } as PipelineStage,
      { $unwind: '$headquarterData' } as PipelineStage,
      {// Filter by provider and query additional
        $match: {
          'headquarterData.client': new Types.ObjectId(company),
          ...query
        }
      } as PipelineStage]
      if (limit) pipeline.push({ $limit: limit } as PipelineStage)// Add limit if exists
      pipeline.push({ $sort: { createdAt: -1 } } as PipelineStage)// Add sort
      const data = await curriculumModel.aggregate<AggregatedCurriculum>(pipeline)
      if (populate || this.listPopulate) {// If populate is required, we do an additional find with the filtered IDs
        const ids = data.map(doc => new Types.ObjectId(doc._id.toString()))
        const populatedDocs = await curriculumModel
          .find({ _id: { $in: ids } })
          .populate(populate || this.listPopulate)
          .sort({ createdAt: -1 })
          .lean()//to get plain objects
        return populatedDocs.map(doc => this.convertToDoc(doc as MongoDocument))// Convert to Doc<Curriculum>[]
      }
      return data.map(doc => this.convertToDoc(doc as MongoDocument))// Convert to Doc<Curriculum>[]
    }, "buscar por proveedor")
  }

  // Overwrite base methods to use default populate and cache
  // @Cached({
  //   keyPrefix: 'gs:curriculum:list',
  //   ttl: redisConfig.ttl.curriculum
  // })
  async find(query?: Query, populate?: PopulateOptions | (string | PopulateOptions)[]): Promise<Result<Curriculum[]>> {
    return super.find(query, populate || this.defaultPopulate);
  }

  // @Cached({
  //   keyPrefix: 'gs:curriculum',
  //   ttl: redisConfig.ttl.curriculum,
  //   keyGenerator: (id: string) => `gs:curriculum:${id}`
  // })
  async findById(id: string): Promise<Result<Curriculum | null>> {
    return super.findById(id, this.defaultPopulate);
  }

  async update(id: string, data: Partial<Doc<Curriculum>>): Promise<Result<Curriculum | null>> {
    // Invalidar caché relacionado
    // await this.redis.invalidatePattern(`gs:curriculum:${id}*`);
    // await this.redis.invalidatePattern('gs:provider:*:curriculums');
    // await this.redis.invalidatePattern('gs:curriculum:list*');
    return super.update(id, data, this.defaultPopulate);
  }

  async delete(id: string): Promise<Result<boolean>> {
    // Invalidar caché relacionado
    // await this.redis.invalidatePattern(`gs:curriculum:${id}*`);
    // await this.redis.invalidatePattern('gs:provider:*:curriculums');
    // await this.redis.invalidatePattern('gs:curriculum:list*');
    return super.delete(id);
  }
}

export const curriculumService = CurriculumService.getInstance();