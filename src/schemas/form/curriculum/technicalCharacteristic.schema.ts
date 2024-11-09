import { z } from "zod";

const technicalCharacteristicSchema = z.object({
  speed: z.string().optional(),
  power: z.string().optional(),
  weight: z.string().optional(),
  voltage: z.string().optional(),
  amperage: z.string().optional(),
  capacity: z.string().optional(),
  pressure: z.string().optional(),
  humidity: z.string().optional(),
  frequency: z.string().optional(),
  temperature: z.string().optional(),
  curriculum: z.string({
    required_error: "Curriculum is required"
  })
})

export default technicalCharacteristicSchema