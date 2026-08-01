import axios from "axios";
import { ApiResponse, EducationResource, Article } from "@/types";

export async function getPublicEducationResources(): Promise<ApiResponse<EducationResource[]>> {
  const response = await axios.get("/api/education");
  return response.data;
}

export async function getPublicArticles(): Promise<ApiResponse<Article[]>> {
  const response = await axios.get("/api/articles");
  return response.data;
}
