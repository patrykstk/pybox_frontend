import { level } from "@/types/level";
import { Author } from "@/interfaces/models/author";

export interface Task {
  id: number;
  title: string;
  content: string;
  level: level;
  input: string | null;
  code: string;
  output: string | null;
  created_by: Author;
  updated_at: string;
  tags: string[];
}
