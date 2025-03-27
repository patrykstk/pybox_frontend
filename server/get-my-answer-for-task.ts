"use server";

import api from "@/lib/api";
import { ApiResponse } from "@/interfaces/api-response";

interface MyAnswer extends ApiResponse {
  code: string;
  output: string | null;
  is_correct: boolean | null;
  mark: number | null;
}

const getMyAnswerForTask = async (taskId: number): Promise<MyAnswer | null> => {
  try {
    const response = await api.get<MyAnswer>(`/task/${taskId}/answer/my`);
    return response.data;
  } catch (error) {
    console.error("Błąd pobierania zadań:", error);
    return null;
  }
};

export { getMyAnswerForTask };
