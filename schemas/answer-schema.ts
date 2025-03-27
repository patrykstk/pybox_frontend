import { z } from "zod";

const answerSchema = z.object({
  code: z
    .string()
    .min(1, "Rozwiązanie jest wymagane")
    .max(10000, "Rozwiązanie może mieć maksymalnie 10000 znaków"),
});

export { answerSchema };
