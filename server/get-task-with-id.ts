"use server";

import api from "@/lib/api";
import { GetTaskProps } from "@/interfaces/requests/get-task-props";
import { Task } from "@/interfaces/task";

const getTaskWithId = async (taskId: string): Promise<Task | null> => {
  try {
    const response = await api.get<GetTaskProps>(`/task/${taskId}`);
    return response.data;
  } catch (error) {
    console.error("Błąd pobierania zadań:", error);
    return null;
  }
};

export { getTaskWithId };
