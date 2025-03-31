"use server";

import api from "@/lib/api";
import { ApiResponse } from "@/interfaces/api-response";
import { Author } from "@/interfaces/author";

interface Answer {
  id: number;
  code: string;
  output: string | null;
  is_correct: boolean | null;
  mark: number | null;
  created_at: string;
  updated_at: string;
  user: Author;
}

interface Answers extends ApiResponse {
  data: Answer[];
  current_page: number;
  total: number;
  per_page: number;
  last_page: number;
  first_page_url: string;
  last_page_url: string;
  next_page_url: string | null;
  prev_page_url: string | null;
  from: number;
  to: number;
  links: {
    url: string | null;
    label: string;
    active: boolean;
  }[];
}

const getAnswersForTask = async (taskId: string): Promise<Answers> => {
  try {
    const response = await api.get<Answers>(`/task/${taskId}/answers`);
    return response.data;
  } catch (error: any) {
    console.error("Błąd pobierania odpowiedzi:", error);

    if (error.response) {
      // Serwer zwrócił odpowiedź z błędem
      if (error.response.status === 404) {
        console.warn(`Brak odpowiedzi dla zadania ${taskId}`);
        return {
          status: "error",
          current_page: 1,
          total: 0,
          per_page: 20,
          last_page: 1,
          first_page_url: "",
          last_page_url: "",
          next_page_url: null,
          prev_page_url: null,
          from: 0,
          to: 0,
          data: [],
          links: [],
        };
      }

      throw new Error(`Błąd serwera: ${error.response.status}`);
    } else if (error.request) {
      // Żądanie zostało wysłane, ale brak odpowiedzi
      throw new Error("Brak odpowiedzi od serwera");
    } else {
      // Inne błędy
      throw new Error("Nieoczekiwany błąd");
    }
  }
};

export { getAnswersForTask };
