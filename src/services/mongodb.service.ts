import UserHeadquarter from "@/models/relation/userHeadquarter.model";
import { SchemaID, LocationProps } from "@/interfaces/db.interface";

/*----------------------------------------------userReferences----------------------------------------------*/
class UserReferences {
  private static instance: UserReferences | undefined;

  private constructor() { }

  public static getInstance(): UserReferences {
    if (!UserReferences.instance) UserReferences.instance = new UserReferences()
    return UserReferences.instance
  }

  /**
   * Obtiene las referencias de ubicación de un usuario.
   * @param {SchemaID} id - ID del usuario
   * @returns {Promise<LocationProps>} Referencias de ubicación del usuario
   */
  async get(id: SchemaID): Promise<LocationProps> {//working here...
    try {
      const user = await UserHeadquarter.findOne({ user: id }).populate({
        path: 'headquarter',
        populate: {
          path: 'city',
          populate: {
            path: 'state',
            populate: {
              path: 'country'
            }
          }
        }
      })

      return { user, headquarter: user?.headquarter }
      // return {
      //   city: user.headquarter
      // }
    } catch (e) { throw new Error(`Failed to fetch user references: ${e}`) }
  }
}

export const userReferences = UserReferences.getInstance();