import { z } from "zod";

const changePasswordSchema = z
  .object({
    old_password: z.string(),
    password: z
      .string()
      .min(8, { message: "Hasło musi mieć co najmniej 8 znaków." })
      .regex(/[a-zA-Z]/, {
        message: "Hasło musi zawierać przynajmniej jedną literę.",
      })
      .regex(/[0-9]/, {
        message: "Hasło musi zawierać przynajmniej jedną cyfrę.",
      })
      .regex(/[^a-zA-Z0-9]/, {
        message: "Hasło musi zawierać przynajmniej jeden znak specjalny.",
      }),

    password_confirmation: z.string().min(8, { message: "" }),
  })
  .superRefine((val, ctx) => {
    if (val.password !== val.password_confirmation) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Hasła się nie pokrywają.",
        path: ["password_confirmation"],
      });
    }
  });

export { changePasswordSchema };
