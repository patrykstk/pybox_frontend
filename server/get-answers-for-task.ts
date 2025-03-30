"use server";

import api from "@/lib/api";
import { ApiResponse } from "@/interfaces/api-response";
import { Author } from "@/interfaces/author";

interface Answer {
  code: string;
  output: string | null;
  is_correct: boolean | null;
  mark: number | null;
  created_at: string;
  user: Author;
}

interface Answers extends ApiResponse {
  data: Answer[];
}

const getAnswersForTask = async (taskId: string): Promise<Answers | null> => {
  try {
    const response = await api.get<Answers>(`/task/${taskId}/answers`);
    return response.data;
  } catch (error: any) {
    if (error.response?.status === 404) {
      console.warn(`Brak odpowiedzi  dla zadania ${taskId}`);
      return null;
    }
    console.error("Błąd pobierania odpowiedzi:", error);
    throw error;
  }
};

export { getAnswersForTask };
