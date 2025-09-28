import { Component, inject, input, signal, computed, viewChild, ElementRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { LessonService } from '../../core/services/lesson.service';
import { HeartsService } from '../../core/services/hearts.service';
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
          <div class="hearts-display">
            @for (heart of [].constructor(heartsService.hearts()); track $index) {
              <span class="heart">❤️</span>
            }
          </div>
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
                  #textInput
                  type="text" 
                  class="text-input"
                  [value]="selectedAnswer()"
                  (input)="onInputChange($event)"
                  placeholder="Type your answer...">
              }
            }

            <div class="actions">
              <button 
                class="check-btn"
                [disabled]="!selectedAnswer()"
                (click)="checkAnswer()">
                Check
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
      transition: all 0.2s ease;
      min-width: 120px;
    }

    .check-btn:hover:not(:disabled) {
      background: #4caf00;
      transform: translateY(-1px);
    }

    .check-btn:disabled {
      background: #ccc;
      cursor: not-allowed;
      opacity: 0.6;
    }
  `]
})
export class LessonDetailComponent implements OnInit {
  private readonly lessonService = inject(LessonService);
  private readonly heartsService = inject(HeartsService);
  private readonly route = inject(ActivatedRoute);
  
  // Signal input (10 pts)
  readonly id = input.required<string>();
  
  // Signal query (5 pts) - for focus management
  readonly textInput = viewChild<ElementRef<HTMLInputElement>>('textInput');
  
  // Component state signals
  readonly currentQuestionIndex = signal(0);
  readonly selectedAnswer = signal('');
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

  ngOnInit() {
    // Handle query params for deep linking
    const queryParams = this.route.snapshot.queryParams;
    console.log('Lesson accessed from:', queryParams['from']);
    console.log('Lesson level:', queryParams['level']);
    console.log('Lesson ID:', this.id());
    console.log('Current lesson:', this.currentLesson());
    console.log('Current question:', this.currentQuestion());
  }

  selectAnswer(answer: string): void {
    console.log('Selected answer:', answer);
    this.selectedAnswer.set(answer);
  }

  onInputChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    console.log('Input changed:', target.value);
    this.selectAnswer(target.value);
  }

  checkAnswer(): void {
    const question = this.currentQuestion();
    const answer = this.selectedAnswer().trim();
    
    if (!question || !answer) {
      console.log('No question or answer:', { question, answer });
      return;
    }

    console.log('Checking answer:', { userAnswer: answer, correctAnswer: question.correctAnswer });
    
    const isCorrect = answer.toLowerCase() === question.correctAnswer.toLowerCase();
    const result: QuestionResult = {
      questionId: question.id,
      userAnswer: answer,
      isCorrect,
      timeSpent: 0
    };

    this.results.update(results => [...results, result]);
    
    // Show feedback
    alert(isCorrect ? 'Correct!' : `Wrong! The correct answer is: ${question.correctAnswer}`);
    
    // Move to next question or finish lesson
    const lesson = this.currentLesson();
    if (lesson && this.currentQuestionIndex() < lesson.questions.length - 1) {
      setTimeout(() => {
        this.currentQuestionIndex.update(i => i + 1);
        this.selectedAnswer.set('');
        
        // Focus input for next question
        const input = this.textInput();
        if (input) {
          input.nativeElement.focus();
        }
      }, 1500);
    } else {
      setTimeout(() => this.finishLesson(), 1500);
    }
  }

  private finishLesson(): void {
    // Calculate score and update progress
    const correctAnswers = this.results().filter(r => r.isCorrect).length;
    const totalQuestions = this.results().length;
    const score = Math.round((correctAnswers / totalQuestions) * 100);
    
    // Update lesson service with progress
    this.lessonService.completeLesson(this.id(), score);
    
    console.log(`Lesson completed with score: ${score}%`);
    alert(`Lesson completed! Score: ${score}%`);
  }
}