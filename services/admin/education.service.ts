import axios from "axios";
import { ApiResponse, EducationResource, QuizQuestion } from "@/types";

// Re-export type aliases for backward compatibility
export type EducationResourceData = EducationResource;
export type QuizQuestionData = QuizQuestion;

export async function getEducationResources(): Promise<ApiResponse<EducationResource[]>> {
  const response = await axios.get("/api/admin/education");
  return response.data;
}

export async function createEducationResource(data: {
  title: string;
  description?: string;
  imageUrl?: string;
  type: "VIDEO" | "DOCUMENT";
  sourceUrl: string;
  category: string;
  readTime?: string;
  hasQuiz?: boolean;
}): Promise<ApiResponse<EducationResource>> {
  const response = await axios.post("/api/admin/education", data);
  return response.data;
}

export async function updateEducationResource(
  id: string,
  data: {
    title?: string;
    description?: string;
    imageUrl?: string;
    type?: "VIDEO" | "DOCUMENT";
    sourceUrl?: string;
    category?: string;
    readTime?: string;
    hasQuiz?: boolean;
    quizQuestions?: QuizQuestion[];
  }
): Promise<ApiResponse<EducationResource>> {
  const response = await axios.put(`/api/admin/education/${id}`, data);
  return response.data;
}

export async function deleteEducationResource(id: string): Promise<ApiResponse<null>> {
  const response = await axios.delete(`/api/admin/education/${id}`);
  return response.data;
}
