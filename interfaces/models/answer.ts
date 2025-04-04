import { Author } from "@/interfaces/models/author";

export interface Answer {
  id: number;
  code: string;
  output: string | null;
  is_correct: boolean | null;
  mark: number | null;
  created_at: string;
  updated_at: string;
  user: Author;
}
