"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userReferences = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
/*----------------------------------------------userReferences----------------------------------------------*/
class UserReferences {
    static instance;
    constructor() { }
    static getInstance() {
        if (!UserReferences.instance)
            UserReferences.instance = new UserReferences();
        return UserReferences.instance;
    }
    /**
     * Obtiene las referencias de ubicación de un usuario.
     * @param {SchemaID} id - ID del usuario
     * @returns {Promise<UserReferencesProps>} Referencias de ubicación del usuario
     */
    async get(id) {
        try {
            const user = await user_model_1.default.findById(id).populate({
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
            });
            // if (!user || !user.headquarter) return {}
            // return {
            //   city: user.headquarter.city._id,
            //   state: user.headquarter.city.state._id,
            //   country: user.headquarter.city.state.country._id
            // }
            return {}; //mean while
        }
        catch (e) {
            throw new Error(`Failed to fetch user references: ${e}`);
        }
    }
}
exports.userReferences = UserReferences.getInstance();
//# sourceMappingURL=mongodb.service.js.map