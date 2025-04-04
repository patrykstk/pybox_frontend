import { ApiResponse } from "@/interfaces/api-response";
import { Task } from "@/interfaces/models/task";

export interface GetTasksProps extends ApiResponse {
  current_page: number;
  data: Task[];
  first_page_url: string;
  last_page: number;
  last_page_url: string;
  next_page_url: string | null;
  prev_page_url: string | null;
}
