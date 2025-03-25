import { ApiResponse } from "@/interfaces/api-response";
import { User } from "@/interfaces/user";

export interface GetUserProps extends ApiResponse {
  user: User;
}
