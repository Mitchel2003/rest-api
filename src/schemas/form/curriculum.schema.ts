import { z } from "zod";

const curriculumSchema = z.object({
  title: z
    .string({ required_error: "Title is required" }),
  description: z
    .string({ required_error: "Description must be a string" }),
  date: z
    .string()
    .datetime()
    .optional()
})

export default curriculumSchema