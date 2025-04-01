export interface Answer {
  id: number;
  code: string;
  output: string | null;
  is_correct: boolean | null;
  mark: number | null;
  created_at: string;
  updated_at: string;
  user: {
    id: number;
    name: string;
    surname: string;
  };
}

export interface GetAnswersProps {
  status: string;
  current_page: number;
  data: Answer[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: {
    url: string | null;
    label: string;
    active: boolean;
  }[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}
