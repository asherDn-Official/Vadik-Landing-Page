export interface QuizQuestion {
  id: number;
  type: 'multiple-choice' | 'multiple-select' | 'text-input' | 'true-false';
  question: string;
  options?: string[];
  correctAnswer?: string | string[];
  category: string;
}

export interface QuizAnswer {
  questionId: number;
  answer: string | string[];
}

export interface QuizState {
  currentQuestion: number;
  answers: QuizAnswer[];
  isCompleted: boolean;
  pointsEarned?: number;
}

export interface QuizCompletionResponse {
  pointsEarned: number;
  bonusPoints: number;
  totalQuestions: number;
  correctAnswers: number;
  completionMessage: string;
}