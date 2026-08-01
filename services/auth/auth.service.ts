import axios from "axios";
import { ApiResponse } from "@/types/api";
import { UserProfileResponse } from "@/app/api/auth/me/route";

export async function getCurrentUser() {
  const response = await axios.get<ApiResponse<UserProfileResponse>>("/api/auth/me");
  return response.data;
}

export async function logoutUser() {
  const response = await axios.post<ApiResponse>("/api/auth/logout");
  return response.data;
}
