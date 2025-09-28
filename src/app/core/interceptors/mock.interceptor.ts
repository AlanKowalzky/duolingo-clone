import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { delay, of, throwError } from 'rxjs';

export const mockInterceptor: HttpInterceptorFn = (req, next) => {
  // Mock API responses for testing
  if (req.url.includes('/api/lessons')) {
    const mockLessons = [
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
          }
        ]
      }
    ];
    
    return of(new HttpResponse({
      status: 200,
      body: mockLessons
    })).pipe(delay(500)); // Simulate network delay
  }
  
  if (req.url.includes('/api/auth/login')) {
    const body = req.body as { email: string; password: string };
    
    // Mock authentication
    if (body.email === 'test@example.com' && body.password === 'password123') {
      return of(new HttpResponse({
        status: 200,
        body: {
          token: 'mock-jwt-token',
          user: {
            id: '1',
            email: body.email,
            name: 'Test User'
          }
        }
      })).pipe(delay(1000));
    } else {
      return throwError(() => new HttpResponse({
        status: 401,
        body: { message: 'Invalid credentials' }
      })).pipe(delay(1000));
    }
  }
  
  if (req.url.includes('/api/progress')) {
    return of(new HttpResponse({
      status: 200,
      body: {
        completedLessons: 5,
        totalXP: 150,
        currentStreak: 3
      }
    })).pipe(delay(300));
  }
  
  // For all other requests, continue with the original request
  return next(req);
};