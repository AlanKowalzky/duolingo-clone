import { Component, inject, input, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LessonService } from '../../core/services/lesson.service';
import { Question, QuestionResult } from '../../shared/models/lesson.model';

@Component({
  selector: 'app-lesson-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="lesson-container">
      @if (currentLesson(); as lesson) {
        <div class="lesson-header">
          <h1>{{ lesson.title }}</h1>
          <div class="progress-bar">
            <div class="progress-fill" [style.width.%]="progressPercentage()"></div>
          </div>
          <span class="progress-text">{{ currentQuestionIndex() + 1 }} / {{ lesson.questions.length }}</span>
        </div>

        @if (currentQuestion(); as question) {
          <div class="question-container">
            <h2>{{ question.text }}</h2>
            
            @switch (question.type) {
              @case ('multiple-choice') {
                <div class="options">
                  @for (option of question.options; track option) {
                    <button 
                      class="option-btn"
                      [class.selected]="selectedAnswer() === option"
                      (click)="selectAnswer(option)">
                      {{ option }}
                    </button>
                  }
                </div>
              }
              @case ('fill-blank') {
                <input 
                  type="text" 
                  class="text-input"
                  [value]="selectedAnswer()"
                  (input)="selectAnswer($event.target.value)"
                  placeholder="Wpisz odpowiedź...">
              }
            }

            <div class="actions">
              <button 
                class="check-btn"
                [disabled]="!selectedAnswer()"
                (click)="checkAnswer()">
                Sprawdź
              </button>
            </div>
          </div>
        }
      }
    </div>
  `,
  styles: [`
    .lesson-container {
      max-width: 800px;
      margin: 0 auto;
      padding: 2rem;
    }

    .progress-bar {
      width: 100%;
      height: 8px;
      background: #e5e5e5;
      border-radius: 4px;
      overflow: hidden;
      margin: 1rem 0;
    }

    .progress-fill {
      height: 100%;
      background: #58cc02;
      transition: width 0.3s ease;
    }

    .question-container {
      background: white;
      padding: 2rem;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      margin: 2rem 0;
    }

    .options {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin: 2rem 0;
    }

    .option-btn {
      padding: 1rem;
      border: 2px solid #e5e5e5;
      border-radius: 8px;
      background: white;
      cursor: pointer;
      transition: all 0.2s;
    }

    .option-btn:hover {
      border-color: #58cc02;
    }

    .option-btn.selected {
      border-color: #58cc02;
      background: #f0f8e8;
    }

    .text-input {
      width: 100%;
      padding: 1rem;
      border: 2px solid #e5e5e5;
      border-radius: 8px;
      font-size: 1.1rem;
    }

    .check-btn {
      padding: 1rem 2rem;
      background: #58cc02;
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 1.1rem;
      font-weight: 600;
      cursor: pointer;
      margin-top: 2rem;
    }

    .check-btn:disabled {
      background: #ccc;
      cursor: not-allowed;
    }
  `]
})
export class LessonDetailComponent {
  private readonly lessonService = inject(LessonService);
  
  // Signal input (10 pts)
  readonly id = input.required<string>();
  
  // Component state signals
  private readonly currentQuestionIndex = signal(0);
  private readonly selectedAnswer = signal('');
  private readonly results = signal<QuestionResult[]>([]);

  // Computed values
  readonly currentLesson = computed(() => 
    this.lessonService.lessons().find(l => l.id === this.id())
  );
  
  readonly currentQuestion = computed(() => {
    const lesson = this.currentLesson();
    return lesson?.questions[this.currentQuestionIndex()] || null;
  });

  readonly progressPercentage = computed(() => {
    const lesson = this.currentLesson();
    if (!lesson) return 0;
    return (this.currentQuestionIndex() / lesson.questions.length) * 100;
  });

  selectAnswer(answer: string): void {
    this.selectedAnswer.set(answer);
  }

  checkAnswer(): void {
    const question = this.currentQuestion();
    const answer = this.selectedAnswer();
    
    if (!question || !answer) return;

    const isCorrect = answer === question.correctAnswer;
    const result: QuestionResult = {
      questionId: question.id,
      userAnswer: answer,
      isCorrect,
      timeSpent: 0 // Would track actual time
    };

    this.results.update(results => [...results, result]);
    
    // Move to next question or finish lesson
    const lesson = this.currentLesson();
    if (lesson && this.currentQuestionIndex() < lesson.questions.length - 1) {
      this.currentQuestionIndex.update(i => i + 1);
      this.selectedAnswer.set('');
    } else {
      this.finishLesson();
    }
  }

  private finishLesson(): void {
    // Calculate score and update progress
    const correctAnswers = this.results().filter(r => r.isCorrect).length;
    const totalQuestions = this.results().length;
    const score = Math.round((correctAnswers / totalQuestions) * 100);
    
    console.log(`Lesson completed with score: ${score}%`);
    // Would update user progress here
  }
}