"use server";

import api from "@/lib/api";
import { Answer } from "@/interfaces/models/answer";
import { Task } from "@/interfaces/models/task";

const getTaskWithAnswer = async (
  taskId: number,
  answerId: number,
): Promise<{ task: Task | null; answer: Answer | null }> => {
  try {
    const [taskResponse, answerResponse] = await Promise.all([
      api.get(`/task/${taskId}`),
      api.get(`/task/${taskId}/answers`),
    ]);

    console.log("Dane pobrane:", {
      task: taskResponse.data,
      answers: answerResponse.data,
    });

    const task: Task = taskResponse.data;
    const answers: Answer[] = answerResponse.data?.data || [];
    const specificAnswer = answers.find((answer) => answer.id === answerId);

    return { task, answer: specificAnswer || null };
  } catch (error) {
    console.error("Błąd pobierania zadań:", error);
    return { task: null, answer: null };
  }
};

export { getTaskWithAnswer };
