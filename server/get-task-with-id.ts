"use server";

import api from "@/lib/api";
import { GetTaskProps } from "@/interfaces/requests/get-task-props";
import { Task } from "@/interfaces/models/task";
import axios from "axios";

const getTaskWithId = async (taskId: string): Promise<Task | null> => {
  try {
    const response = await api.get<GetTaskProps>(`/task/${taskId}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        console.warn(`Zadanie o ID ${taskId} nie zostało znalezione.`);
        return null;
      }
      console.error(
        "Błąd pobierania zadania:",
        error.message,
        error.response?.data,
      );
    } else {
      console.error("Nieznany błąd:", error);
    }
    throw new Error("Nie udało się pobrać zadania.");
  }
};

export { getTaskWithId };
