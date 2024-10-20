import { SchemaID, UserReferencesProps } from '../interfaces/props.interface';
import User from '../models/user.model';

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
   * @returns {Promise<UserReferencesProps>} Referencias de ubicación del usuario
   */
  async get(id: SchemaID): Promise<UserReferencesProps> {
    try {
      const user = await User.findById(id).populate({
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

      // if (!user || !user.headquarter) return {}
      // return {
      //   city: user.headquarter.city._id,
      //   state: user.headquarter.city.state._id,
      //   country: user.headquarter.city.state.country._id
      // }
      return {} as UserReferencesProps //mean while
    } catch (e) { throw new Error(`Failed to fetch user references: ${e}`) }
  }
}

export const userReferences = UserReferences.getInstance();