"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.curriculumSchema = void 0;
const zod_1 = require("zod");
exports.curriculumSchema = zod_1.z.object({
    title: zod_1.z
        .string({ required_error: "Title is required" }),
    description: zod_1.z
        .string({ required_error: "Description must be a string" }),
    date: zod_1.z
        .string()
        .datetime()
        .optional()
});
//# sourceMappingURL=curriculum.schema.js.map