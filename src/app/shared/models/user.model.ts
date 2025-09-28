export interface User {
  id: string;
  email: string;
  displayName: string;
  streak: number;
  totalXP: number;
  hearts: number;
  currentLesson: number;
  createdAt: Date;
}

export interface UserProgress {
  userId: string;
  lessonId: string;
  completed: boolean;
  score: number;
  completedAt?: Date;
  attempts: number;
}

export type UserStats = Pick<User, 'streak' | 'totalXP' | 'hearts'>;