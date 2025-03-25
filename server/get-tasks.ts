"use server";

import api from "@/lib/api";
import { GetTasksProps } from "@/interfaces/requests/get-tasks-props";
import { level } from "@/types/level";

interface SearchParams {
  page?: number;
  search?: string;
  level?: level;
  tags?: string[];
}

const getTasks = async (
  params: SearchParams,
): Promise<GetTasksProps | null> => {
  const { page, search, level, tags } = params;

  const queryParams: string[] = [];

  if (page) queryParams.push(`page=${page}`);
  if (search) queryParams.push(`search=${search}`);
  if (level) queryParams.push(`level=${level}`);
  if (tags && tags.length)
    tags.forEach((tag) => queryParams.push(`tags[]=${tag}`));

  const queryString = queryParams.join("&");

  try {
    const response = await api.get<GetTasksProps>("/tasks?" + queryString);
    return response.data;
  } catch (error) {
    console.error("Błąd pobierania zadań:", error);
    return null;
  }
};

export { getTasks };
