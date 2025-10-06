export interface QuizOption {
  label: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  answer: number;
  explanation?: string;
}

export interface Quiz {
  id: string;
  courseId: string;
  userId: string;
  createdAt: number;
  questions: QuizQuestion[];
}
