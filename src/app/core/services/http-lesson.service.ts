import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
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
        },
        {
          id: '1-3',
          type: 'multiple-choice',
          text: 'How do you say "Goodbye" in Spanish?',
          options: ['Hola', 'Adiós', 'Gracias', 'De nada'],
          correctAnswer: 'Adiós'
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
        },
        {
          id: '2-3',
          type: 'multiple-choice',
          text: 'What is "five" in Spanish?',
          options: ['cuatro', 'cinco', 'seis', 'siete'],
          correctAnswer: 'cinco'
        }
      ]
    },
    {
      id: '3',
      title: 'Colors',
      description: 'Learn basic colors',
      level: 3,
      xpReward: 20,
      isLocked: true,
      questions: [
        {
          id: '3-1',
          type: 'multiple-choice',
          text: 'What is "red" in Spanish?',
          options: ['azul', 'verde', 'rojo', 'amarillo'],
          correctAnswer: 'rojo'
        },
        {
          id: '3-2',
          type: 'fill-blank',
          text: 'Complete: "El cielo es _____" (The sky is blue)',
          correctAnswer: 'azul'
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
  
  // Simulate API delay for realistic testing
  getLessonsWithDelay(): Observable<Lesson[]> {
    return of(this.mockLessons).pipe(
      delay(500) // 500ms delay to simulate network
    );
  }
}