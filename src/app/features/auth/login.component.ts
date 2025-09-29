import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LessonService } from '../../core/services/lesson.service';
import { ButtonComponent } from '../../ui/components/button.component';
import { CardComponent } from '../../ui/components/card.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonComponent, CardComponent],
  template: `
    <div class="login-container">
      <app-card title="Login to Duolingo Clone" variant="primary">
        <div class="demo-info">
          <p><strong>Demo Credentials:</strong></p>
          <p>Email: demo&#64;duolingo.com</p>
          <p>Password: demo123</p>
        </div>
        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" action="/login" method="post">
          <div class="form-group">
            <label for="email">Email:</label>
            <input 
              id="email"
              type="email" 
              formControlName="email"
              class="form-control"
              [class.error]="emailError()"
              autocomplete="username"
              name="email">
            @if (emailError()) {
              <span class="error-text">{{ emailError() }}</span>
            }
          </div>
          
          <div class="form-group">
            <label for="password">Password:</label>
            <input 
              id="password"
              type="password" 
              formControlName="password"
              class="form-control"
              [class.error]="passwordError()"
              autocomplete="current-password"
              name="password">
            @if (passwordError()) {
              <span class="error-text">{{ passwordError() }}</span>
            }
          </div>
          
          <div slot="footer">
            <app-button 
              type="submit" 
              [disabled]="loginForm.invalid || isLoading()"
              [loading]="isLoading()"
              [fullWidth]="true"
              data-cy="login-button">
              Login
            </app-button>
          </div>
        </form>
      </app-card>
    </div>
  `,
  styles: [`
    .login-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 60vh;
      padding: 2rem;
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
    .form-control.error {
      border-color: #dc3545;
    }
    .error-text {
      color: #dc3545;
      font-size: 0.875rem;
      margin-top: 0.25rem;
      display: block;
    }
    label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 600;
    }
    .demo-info {
      background: #e8f5e8;
      padding: 1rem;
      border-radius: 8px;
      margin-bottom: 1.5rem;
      border-left: 4px solid #58cc02;
    }
    .demo-info p {
      margin: 0.25rem 0;
      font-size: 0.9rem;
    }
  `]
})
export class LoginComponent {
  private readonly router = inject(Router);
  private readonly lessonService = inject(LessonService);
  private readonly fb = inject(FormBuilder);
  
  readonly isLoading = signal(false);
  
  readonly loginForm = this.fb.group({
    email: ['demo&#64;duolingo.com', [Validators.required, Validators.email]],
    password: ['demo123', [Validators.required, Validators.minLength(6)]]
  });
  
  readonly emailError = signal('');
  readonly passwordError = signal('');
  
  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading.set(true);
      this.clearErrors();
      
      // Simulate API call
      setTimeout(() => {
        this.login();
        this.isLoading.set(false);
      }, 1000);
    } else {
      this.validateForm();
    }
  }
  
  private validateForm(): void {
    const emailControl = this.loginForm.get('email');
    const passwordControl = this.loginForm.get('password');
    
    if (emailControl?.errors) {
      if (emailControl.errors['required']) {
        this.emailError.set('Email is required');
      } else if (emailControl.errors['email']) {
        this.emailError.set('Please enter a valid email');
      }
    }
    
    if (passwordControl?.errors) {
      if (passwordControl.errors['required']) {
        this.passwordError.set('Password is required');
      } else if (passwordControl.errors['minlength']) {
        this.passwordError.set('Password must be at least 6 characters');
      }
    }
  }
  
  private clearErrors(): void {
    this.emailError.set('');
    this.passwordError.set('');
  }

  private login(): void {
    localStorage.setItem('user-token', 'mock-token');
    this.lessonService.initializeUser();
    this.router.navigate(['/lessons']);
  }
}