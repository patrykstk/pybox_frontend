"use server";

import * as z from "zod";
import api from "@/lib/api";
import { taskSchema } from "@/schemas/task-schema";

const updateTask = async (
  values: z.infer<typeof taskSchema>,
  taskId: number,
) => {
  const validatedFields = taskSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { title, content, tags, level, input, code } = validatedFields.data;

  try {
    const response = await api.put(`/task/${taskId}`, {
      title,
      content,
      level,
      input,
      code,
      tags,
    });

    if (response.data.status === "success") return { success: "yay" };
  } catch (error) {
    return { error: "bład" };
  }
};

export { updateTask };
