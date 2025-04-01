"use server";

import api from "@/lib/api";
import type { GetAnswersProps } from "@/interfaces/requests/get-answers-props";

export async function getTaskAnswers(
  taskId: number,
): Promise<GetAnswersProps | null> {
  try {
    const response = await api.get<GetAnswersProps>(`/task/${taskId}/answers`);
    return response.data;
  } catch (error) {
    console.error("Error fetching answers:", error);
    return null;
  }
}

export async function deleteAnswer(
  answerId: number,
): Promise<{ status: string; message: string } | null> {
  try {
    const response = await api.delete(`/answer/${answerId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting answer:", error);
    return null;
  }
}
