"use server";

import api from "@/lib/api";
import type { GetTasksProps } from "@/interfaces/requests/get-tasks-props";
import type { level } from "@/types/level";

interface SearchParams {
  page?: number;
  search?: string;
  level?: level;
  tags?: string[];
}

export async function getModTasks(
  params: SearchParams = {},
): Promise<GetTasksProps | null> {
  const { page, search, level, tags } = params;

  const queryParams: string[] = [];

  if (page) queryParams.push(`page=${page}`);
  if (search) queryParams.push(`search=${search}`);
  if (level) queryParams.push(`level=${level}`);
  if (tags && tags.length)
    tags.forEach((tag) => queryParams.push(`tags[]=${tag}`));

  const queryString = queryParams.length > 0 ? queryParams.join("&") : "";
  const url = queryString ? `/tasks?${queryString}` : "/tasks";

  try {
    const response = await api.get<GetTasksProps>(url);
    const data = response.data;
    return { ...data, data: data.data || [] };
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return null;
  }
}
