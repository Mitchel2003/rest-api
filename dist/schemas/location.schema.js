"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.countrySchema = exports.stateSchema = exports.citySchema = void 0;
const zod_1 = require("zod");
exports.citySchema = zod_1.z.object({
    name: zod_1.z
        .string({ required_error: "Name is required" })
});
exports.stateSchema = zod_1.z.object({
    name: zod_1.z
        .string({ required_error: "Name is required" })
});
exports.countrySchema = zod_1.z.object({
    name: zod_1.z
        .string({ required_error: "Name is required" })
});
/** @link https://github.com/Mitchel2003/rest-api/blob/main/README.md#001 */ 
//# sourceMappingURL=location.schema.js.map