"use server";

import api from "@/lib/api";
import { ApiResponse } from "@/interfaces/api-response";

interface MyAnswer extends ApiResponse {
  id: number;
  code: string;
  output: string | null;
  is_correct: boolean | null;
  mark: number | null;
}

const getMyAnswerForTask = async (taskId: string): Promise<MyAnswer | null> => {
  try {
    const response = await api.get<MyAnswer>(`/task/${taskId}/answer/my`);
    return response.data;
  } catch (error: any) {
    if (error.response?.status === 404) {
      console.warn(`Brak odpowiedzi użytkownika dla zadania ${taskId}`);
      return null;
    }
    console.error("Błąd pobierania odpowiedzi:", error);
    throw error;
  }
};

export { getMyAnswerForTask };
