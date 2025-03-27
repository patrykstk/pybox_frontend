"use server";

import * as z from "zod";
import api from "@/lib/api";
import { answerSchema } from "@/schemas/answer-schema";

const answerTask = async (
  values: z.infer<typeof answerSchema>,
  taskId: number,
) => {
  const validatedFields = answerSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { code } = validatedFields.data;

  try {
    const response = await api.post(`/task/${taskId}/answer`, {
      code,
    });

    if (response.data.status === "success") {
      console.log(`Success przesłałem zadanie z kodem ${code}!`);
      return { success: "yay" };
    }
  } catch (error) {
    return { error: "bład" };
  }
};

export { answerTask };
