import { ApiResponse } from "@/interfaces/api-response";
import { Author } from "@/interfaces/author";
import { level } from "@/types/level";

export interface GetTaskProps extends ApiResponse {
  id: number;
  title: string;
  content: string;
  level: level;
  input: string | null;
  code: string;
  output: string | null;
  created_by: Author;
  created_at: string;
  updated_at: string;
  tags: string[];
}
