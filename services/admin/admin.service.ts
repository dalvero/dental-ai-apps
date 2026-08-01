import axios from "axios";
import { ApiResponse } from "@/types/api";

export interface AdminDashboardData {
  totalParents: number;
  totalChildren: number;
  totalEducation: number;
  totalArticles: number;
  ageDemographics: {
    balita: number;
    usiaDini: number;
    anak: number;
  };
  users: Array<{
    id: string;
    name: string;
    email: string;
    role: "PARENT" | "ADMIN";
    childrenCount: number;
    joinedDate: string;
    status: "ACTIVE" | "INACTIVE";
    children: Array<{
      id: string;
      name: string;
      birthDate: string;
      gender: string;
    }>;
  }>;
}

export async function getAdminDashboardData() {
  const response = await axios.get<ApiResponse<AdminDashboardData>>("/api/admin/dashboard");
  return response.data;
}
