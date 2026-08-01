import axios from "axios";
import { ApiResponse, Article, ArticleStatus } from "@/types";

// Re-export type alias for backward compatibility
export type ArticleData = Article;

export async function getArticles(): Promise<ApiResponse<Article[]>> {
  const response = await axios.get("/api/admin/articles");
  return response.data;
}

export async function createArticle(data: {
  title: string;
  category: string;
  author: string;
  status: ArticleStatus;
}): Promise<ApiResponse<Article>> {
  const response = await axios.post("/api/admin/articles", data);
  return response.data;
}

export async function updateArticle(
  id: string,
  data: {
    title?: string;
    category?: string;
    author?: string;
    status?: ArticleStatus;
  }
): Promise<ApiResponse<Article>> {
  const response = await axios.put(`/api/admin/articles/${id}`, data);
  return response.data;
}

export async function deleteArticle(id: string): Promise<ApiResponse<null>> {
  const response = await axios.delete(`/api/admin/articles/${id}`);
  return response.data;
}
