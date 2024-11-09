import { z } from "zod";

const checkSchema = z.object({
  name: z.string({
    required_error: "El nombre del check es requerido"
  }),
  inactive: z.boolean().optional().default(false)
});

export default checkSchema;