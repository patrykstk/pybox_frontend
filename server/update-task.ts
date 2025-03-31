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
    return { success: false, error: "Invalid fields!" };
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

    if (response.data.status === "success") {
      return { success: true, message: "Task updated successfully" };
    } else {
      return { success: false, error: "Failed to update task" };
    }
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "An error occurred while updating the task",
    };
  }
};

export { updateTask };
