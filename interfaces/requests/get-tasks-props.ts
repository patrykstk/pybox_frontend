import { ApiResponse } from "@/interfaces/api-response";
import { Task } from "@/interfaces/task";

export interface GetTasksProps extends ApiResponse {
  current_page: number;
  data: Task[];
  last_page: number;
}
