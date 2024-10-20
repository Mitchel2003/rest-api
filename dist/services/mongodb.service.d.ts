import { SchemaID, UserReferencesProps } from '../interfaces/props.interface';
declare class UserReferences {
    private static instance;
    private constructor();
    static getInstance(): UserReferences;
    /**
     * Obtiene las referencias de ubicación de un usuario.
     * @param {SchemaID} id - ID del usuario
     * @returns {Promise<UserReferencesProps>} Referencias de ubicación del usuario
     */
    get(id: SchemaID): Promise<UserReferencesProps>;
}
export declare const userReferences: UserReferences;
export {};
