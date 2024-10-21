import { z } from "zod";
export declare const curriculumSchema: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodString;
    date: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    description: string;
    title: string;
    date?: string | undefined;
}, {
    description: string;
    title: string;
    date?: string | undefined;
}>;
