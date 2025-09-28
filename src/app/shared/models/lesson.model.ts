export interface Lesson {
  id: string;
  title: string;
  description: string;
  level: number;
  xpReward: number;
  questions: Question[];
  isLocked: boolean;
}

export interface Question {
  id: string;
  type: QuestionType;
  text: string;
  options?: string[];
  correctAnswer: string;
  audioUrl?: string;
}

export type QuestionType = 'multiple-choice' | 'fill-blank' | 'translate' | 'audio';

export interface QuestionResult {
  questionId: string;
  userAnswer: string;
  isCorrect: boolean;
  timeSpent: number;
}