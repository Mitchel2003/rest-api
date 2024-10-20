/**
 * Using "bcryptjs" we try convert a password into hash with a number of rounds (salt)
 * @param pass - correspond to password that user wish validate
 * @param passHash - is the number of rounds in which the password will be hashed.
 * @returns {string} this return the password hashed
 */
export declare const encrypt: (pass: string, salt: number) => Promise<string>;
/**
 * Validate if the password writed by the user is correct
 * @param pass - correspond to password that user wish validate
 * @param passHash - is hash and represent the password that we get from database
 * @returns {boolean} this return a boolean
 */
export declare const verified: (pass: string, passHash?: string) => Promise<boolean>;
