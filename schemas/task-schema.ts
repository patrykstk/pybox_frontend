import { z } from "zod";

const taskSchema = z.object({
  title: z
    .string()
    .min(1, "Tytuł jest wymagany")
    .max(100, "Tytuł może mieć maksymalnie 100 znaków"),
  level: z.enum(["easy", "medium", "hard", "insane"], {
    message: "Poziom trudności jest wymagany",
  }),
  tags: z.string().array().optional(),
  content: z
    .string()
    .min(1, "Treść zadania jest wymagana")
    .max(1000, "Treść zadania może mieć maksymalnie 1000 znaków"),
  input: z.string().optional(),
  code: z
    .string()
    .min(1, "Rozwiązanie jest wymagane")
    .max(10000, "Rozwiązanie może mieć maksymalnie 10000 znaków"),
});

export { taskSchema };
