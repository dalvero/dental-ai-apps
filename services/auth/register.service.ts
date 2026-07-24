import axios from "axios";
import { ApiResponse } from "@/types/api";
import { User } from "@/types";

export async function register(
  name: string,
  email: string,
  password: string
) {
  const response = await axios.post<ApiResponse<User>>(
    "/api/auth/register",
    {
      name,
      email,
      password,
    }
  );
  return response.data;
}