import { QuizQuestion } from "./quiz";

export type EducationType = "VIDEO" | "DOCUMENT";
export type ImageOptionType = "YOUTUBE" | "URL" | "LOCAL";

export interface EducationResource {
  id: string;
  title: string;
  description?: string;
  imageUrl?: string;
  type: EducationType;
  sourceUrl: string;
  category: string;
  readTime?: string;
  hasQuiz: boolean;
  quizQuestions?: QuizQuestion[];
  createdAt: string;
}

export type ArticleStatus = "PUBLISHED" | "DRAFT";

export interface Article {
  id: string;
  title: string;
  description?: string;
  imageUrl?: string;
  category: string;
  author: string;
  publishedDate: string;
  status: ArticleStatus;
  views: number;
  readTime?: string;
  content?: string;
  createdAt?: string;
}

export interface EducationCardProps {
  category?: string;
  title?: string;
  description?: string;
  image?: string;
  author?: string;
  readTime?: string;
  type?: EducationType;
  href?: string;
}
