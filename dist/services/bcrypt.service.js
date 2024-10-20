"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verified = exports.encrypt = void 0;
const bcryptjs_1 = require("bcryptjs");
/**
 * Using "bcryptjs" we try convert a password into hash with a number of rounds (salt)
 * @param pass - correspond to password that user wish validate
 * @param passHash - is the number of rounds in which the password will be hashed.
 * @returns {string} this return the password hashed
 */
const encrypt = async (pass, salt) => {
    return await (0, bcryptjs_1.hash)(pass, salt);
};
exports.encrypt = encrypt;
/**
 * Validate if the password writed by the user is correct
 * @param pass - correspond to password that user wish validate
 * @param passHash - is hash and represent the password that we get from database
 * @returns {boolean} this return a boolean
 */
const verified = async (pass, passHash = '') => {
    return await (0, bcryptjs_1.compare)(pass, passHash);
};
exports.verified = verified;
//# sourceMappingURL=bcrypt.service.js.map