export interface QuizQuestion {
  id?: string;
  educationId?: string;
  question: string;
  options: string[];
  correctAnswer: number;
}
