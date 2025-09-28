import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Lesson } from '../../shared/models/lesson.model';

@Injectable({
  providedIn: 'root'
})
export class HttpLessonService {
  private readonly http = inject(HttpClient);

  // Mock data for demo
  private readonly mockLessons: Lesson[] = [
    {
      id: '1',
      title: 'Basic Greetings',
      description: 'Learn how to say hello and goodbye',
      level: 1,
      xpReward: 10,
      isLocked: false,
      questions: [
        {
          id: '1-1',
          type: 'multiple-choice',
          text: 'How do you say "Hello" in Spanish?',
          options: ['Hola', 'Adiós', 'Gracias', 'Por favor'],
          correctAnswer: 'Hola'
        },
        {
          id: '1-2',
          type: 'fill-blank',
          text: 'Complete: "_____ días" (Good morning)',
          correctAnswer: 'Buenos'
        }
      ]
    },
    {
      id: '2',
      title: 'Numbers 1-10',
      description: 'Learn basic numbers',
      level: 2,
      xpReward: 15,
      isLocked: true,
      questions: [
        {
          id: '2-1',
          type: 'multiple-choice',
          text: 'What is "one" in Spanish?',
          options: ['uno', 'dos', 'tres', 'cuatro'],
          correctAnswer: 'uno'
        },
        {
          id: '2-2',
          type: 'fill-blank',
          text: 'Complete: "_____ y dos" (one and two)',
          correctAnswer: 'uno'
        }
      ]
    }
  ];

  getLessons(): Observable<Lesson[]> {
    return of(this.mockLessons);
  }

  getLesson(id: string): Observable<Lesson | null> {
    const lesson = this.mockLessons.find(l => l.id === id);
    return of(lesson || null);
  }
}