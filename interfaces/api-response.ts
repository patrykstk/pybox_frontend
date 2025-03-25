import { requestStatus } from "@/types/request-status";

export interface ApiResponse {
  status: requestStatus;
  message?: string;
  errors?: Record<string, string[]>;
}
