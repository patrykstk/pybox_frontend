import { ApiResponse } from "@/interfaces/api-response";
import { User } from "@/interfaces/models/user";

export interface GetUserProps extends ApiResponse {
  user: User;
}
