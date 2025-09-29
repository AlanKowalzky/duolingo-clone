import { Component, inject, signal, OnInit } from '@angular/core';
import { FormBuilder, FormArray, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../ui/components/button.component';
import { CardComponent } from '../../ui/components/card.component';

@Component({
  selector: 'app-quiz-builder',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonComponent, CardComponent],
  template: `
    <div class="quiz-builder-container">
      <app-card title="Quiz Builder" variant="primary">
        <form [formGroup]="quizForm" (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label for="title">Quiz Title:</label>
            <input 
              id="title"
              type="text" 
              formControlName="title"
              class="form-control"
              placeholder="Enter quiz title">
          </div>
          
          <div class="form-group">
            <label for="description">Description:</label>
            <textarea 
              id="description"
              formControlName="description"
              class="form-control"
              rows="3"
              placeholder="Enter quiz description"></textarea>
          </div>
          
          <div class="questions-section">
            <div class="section-header">
              <h3>Questions</h3>
              <app-button 
                type="button" 
                variant="outline" 
                size="small"
                (click)="addQuestion()">
                Add Question
              </app-button>
            </div>
            
            <div formArrayName="questions" class="questions-list">
              @for (question of questionsArray.controls; track $index; let i = $index) {
                <app-card [title]="'Question ' + (i + 1)" variant="secondary">
                  <div [formGroupName]="i" class="question-form">
                    <div class="form-group">
                      <label for="question-text-{{i}}">Question Text:</label>
                      <input 
                        id="question-text-{{i}}"
                        type="text" 
                        formControlName="text"
                        class="form-control"
                        placeholder="Enter question text">
                    </div>
                    
                    <div class="form-group">
                      <label for="question-type-{{i}}">Question Type:</label>
                      <select id="question-type-{{i}}" formControlName="type" class="form-control">
                        <option value="multiple-choice">Multiple Choice</option>
                        <option value="fill-blank">Fill in the Blank</option>
                      </select>
                    </div>
                    
                    @if (getQuestionType(i) === 'multiple-choice') {
                      <div class="form-group">
                        <label for="options-{{i}}">Options:</label>
                        <div formArrayName="options" class="options-list">
                          @for (option of getOptionsArray(i).controls; track $index; let j = $index) {
                            <div class="option-input">
                              <input 
                                type="text" 
                                [formControlName]="j"
                                class="form-control"
                                [placeholder]="'Option ' + (j + 1)">
                              <button 
                                type="button" 
                                class="remove-btn"
                                (click)="removeOption(i, j)">
                                ×
                              </button>
                            </div>
                          }
                          <app-button 
                            type="button" 
                            variant="outline" 
                            size="small"
                            (click)="addOption(i)">
                            Add Option
                          </app-button>
                        </div>
                      </div>
                    }
                    
                    <div class="form-group">
                      <label for="correct-answer-{{i}}">Correct Answer:</label>
                      <input 
                        id="correct-answer-{{i}}"
                        type="text" 
                        formControlName="correctAnswer"
                        class="form-control"
                        placeholder="Enter correct answer">
                    </div>
                  </div>
                  
                  <div slot="footer">
                    <app-button 
                      type="button" 
                      variant="danger" 
                      size="small"
                      (click)="removeQuestion(i)">
                      Remove Question
                    </app-button>
                  </div>
                </app-card>
              }
            </div>
          </div>
          
          <div slot="footer">
            <app-button 
              type="submit" 
              [disabled]="quizForm.invalid || isLoading()"
              [loading]="isLoading()"
              [fullWidth]="true">
              Create Quiz
            </app-button>
          </div>
        </form>
      </app-card>
    </div>
  `,
  styles: [`
    .quiz-builder-container {
      padding: 2rem;
      max-width: 800px;
      margin: 0 auto;
    }
    
    .form-group {
      margin-bottom: 1.5rem;
    }
    
    .form-control {
      width: 100%;
      padding: 0.75rem;
      border: 2px solid #e9ecef;
      border-radius: 8px;
      font-size: 1rem;
    }
    
    label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 600;
    }
    
    .questions-section {
      margin: 2rem 0;
    }
    
    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }
    
    .questions-list {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }
    
    .question-form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    
    .options-list {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    
    .option-input {
      display: flex;
      gap: 0.5rem;
      align-items: center;
    }
    
    .remove-btn {
      background: #dc3545;
      color: white;
      border: none;
      border-radius: 50%;
      width: 30px;
      height: 30px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  `]
})
export class QuizBuilderComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  
  readonly isLoading = signal(false);
  
  readonly quizForm = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', [Validators.required, Validators.minLength(10)]],
    questions: this.fb.array([])
  });
  
  get questionsArray() {
    return this.quizForm.get('questions') as FormArray;
  }
  
  addQuestion(): void {
    const questionGroup = this.fb.group({
      text: ['', [Validators.required]],
      type: ['multiple-choice', [Validators.required]],
      options: this.fb.array(['', '', '', '']), // Default 4 options
      correctAnswer: ['', [Validators.required]]
    });
    
    this.questionsArray.push(questionGroup);
  }
  
  removeQuestion(index: number): void {
    this.questionsArray.removeAt(index);
  }
  
  getOptionsArray(questionIndex: number): FormArray {
    return this.questionsArray.at(questionIndex).get('options') as FormArray;
  }
  
  addOption(questionIndex: number): void {
    const optionsArray = this.getOptionsArray(questionIndex);
    optionsArray.push(this.fb.control(''));
  }
  
  removeOption(questionIndex: number, optionIndex: number): void {
    const optionsArray = this.getOptionsArray(questionIndex);
    if (optionsArray.length > 2) { // Keep at least 2 options
      optionsArray.removeAt(optionIndex);
    }
  }
  
  getQuestionType(questionIndex: number): string {
    return this.questionsArray.at(questionIndex).get('type')?.value || 'multiple-choice';
  }
  
  onSubmit(): void {
    if (this.quizForm.valid) {
      this.isLoading.set(true);
      
      const quizData = this.quizForm.value;
      console.log('Creating quiz:', quizData);
      
      // Simulate API call
      setTimeout(() => {
        alert('Quiz created successfully!');
        this.isLoading.set(false);
        this.resetForm();
      }, 2000);
    } else {
      alert('Please fill in all required fields');
    }
  }
  
  private resetForm(): void {
    this.quizForm.reset();
    this.questionsArray.clear();
  }
  
  ngOnInit(): void {
    // Add initial question
    this.addQuestion();
  }
}