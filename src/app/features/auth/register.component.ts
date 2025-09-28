import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../ui/components/button.component';
import { CardComponent } from '../../ui/components/card.component';

// Custom validators
export class CustomValidators {
  static passwordStrength(control: AbstractControl) {
    const value = control.value;
    if (!value) return null;
    
    const hasNumber = /[0-9]/.test(value);
    const hasUpper = /[A-Z]/.test(value);
    const hasLower = /[a-z]/.test(value);
    const hasSpecial = /[#?!@$%^&*-]/.test(value);
    
    const valid = hasNumber && hasUpper && hasLower && hasSpecial && value.length >= 8;
    return valid ? null : { passwordStrength: true };
  }
  
  static emailDomain(control: AbstractControl) {
    const value = control.value;
    if (!value) return null;
    
    const allowedDomains = ['gmail.com', 'yahoo.com', 'outlook.com'];
    const domain = value.split('@')[1];
    return allowedDomains.includes(domain) ? null : { emailDomain: true };
  }
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonComponent, CardComponent],
  template: `
    <div class="register-container">
      <app-card title="Create Account" variant="primary">
        <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label for="firstName">First Name:</label>
            <input 
              id="firstName"
              type="text" 
              formControlName="firstName"
              class="form-control"
              [class.error]="firstNameError()">
            @if (firstNameError()) {
              <span class="error-text">{{ firstNameError() }}</span>
            }
          </div>
          
          <div class="form-group">
            <label for="lastName">Last Name:</label>
            <input 
              id="lastName"
              type="text" 
              formControlName="lastName"
              class="form-control"
              [class.error]="lastNameError()">
            @if (lastNameError()) {
              <span class="error-text">{{ lastNameError() }}</span>
            }
          </div>
          
          <div class="form-group">
            <label for="email">Email:</label>
            <input 
              id="email"
              type="email" 
              formControlName="email"
              class="form-control"
              [class.error]="emailError()">
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
              [class.error]="passwordError()">
            <div class="password-strength">
              <div class="strength-bar" [class]="passwordStrengthClass()"></div>
              <span class="strength-text">{{ passwordStrengthText() }}</span>
            </div>
            @if (passwordError()) {
              <span class="error-text">{{ passwordError() }}</span>
            }
          </div>
          
          <div class="form-group">
            <label for="confirmPassword">Confirm Password:</label>
            <input 
              id="confirmPassword"
              type="password" 
              formControlName="confirmPassword"
              class="form-control"
              [class.error]="confirmPasswordError()">
            @if (confirmPasswordError()) {
              <span class="error-text">{{ confirmPasswordError() }}</span>
            }
          </div>
          
          <div class="form-group">
            <label class="checkbox-label">
              <input 
                type="checkbox" 
                formControlName="agreeToTerms"
                class="checkbox">
              I agree to the Terms of Service and Privacy Policy
            </label>
            @if (termsError()) {
              <span class="error-text">{{ termsError() }}</span>
            }
          </div>
          
          <div slot="footer">
            <app-button 
              type="submit" 
              [disabled]="registerForm.invalid || isLoading()"
              [loading]="isLoading()"
              [fullWidth]="true"
              data-cy="register-button">
              Create Account
            </app-button>
          </div>
        </form>
      </app-card>
    </div>
  `,
  styles: [`
    .register-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 80vh;
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
    .checkbox-label {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-weight: normal;
    }
    .checkbox {
      width: auto;
    }
    .password-strength {
      margin-top: 0.5rem;
    }
    .strength-bar {
      height: 4px;
      border-radius: 2px;
      transition: all 0.3s;
    }
    .strength-bar.weak {
      width: 33%;
      background: #dc3545;
    }
    .strength-bar.medium {
      width: 66%;
      background: #ffc107;
    }
    .strength-bar.strong {
      width: 100%;
      background: #28a745;
    }
    .strength-text {
      font-size: 0.875rem;
      margin-top: 0.25rem;
      display: block;
    }
  `]
})
export class RegisterComponent {
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  
  readonly isLoading = signal(false);
  
  readonly registerForm = this.fb.group({
    firstName: ['', [Validators.required, Validators.minLength(2)]],
    lastName: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email, CustomValidators.emailDomain]],
    password: ['', [Validators.required, CustomValidators.passwordStrength]],
    confirmPassword: ['', [Validators.required]],
    agreeToTerms: [false, [Validators.requiredTrue]]
  }, { validators: this.passwordMatchValidator });
  
  readonly firstNameError = signal('');
  readonly lastNameError = signal('');
  readonly emailError = signal('');
  readonly passwordError = signal('');
  readonly confirmPasswordError = signal('');
  readonly termsError = signal('');
  
  readonly passwordStrengthClass = signal('');
  readonly passwordStrengthText = signal('');
  
  constructor() {
    // Watch password changes for strength indicator
    this.registerForm.get('password')?.valueChanges.subscribe(value => {
      this.updatePasswordStrength(value || '');
    });
  }
  
  private passwordMatchValidator(control: AbstractControl) {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    
    if (!password || !confirmPassword) return null;
    
    return password.value === confirmPassword.value ? null : { passwordMismatch: true };
  }
  
  private updatePasswordStrength(password: string): void {
    if (!password) {
      this.passwordStrengthClass.set('');
      this.passwordStrengthText.set('');
      return;
    }
    
    const hasNumber = /[0-9]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasSpecial = /[#?!@$%^&*-]/.test(password);
    
    const score = [hasNumber, hasUpper, hasLower, hasSpecial, password.length >= 8]
      .filter(Boolean).length;
    
    if (score < 3) {
      this.passwordStrengthClass.set('weak');
      this.passwordStrengthText.set('Weak password');
    } else if (score < 5) {
      this.passwordStrengthClass.set('medium');
      this.passwordStrengthText.set('Medium password');
    } else {
      this.passwordStrengthClass.set('strong');
      this.passwordStrengthText.set('Strong password');
    }
  }
  
  onSubmit(): void {
    if (this.registerForm.valid) {
      this.isLoading.set(true);
      this.clearErrors();
      
      // Simulate API call
      setTimeout(() => {
        this.register();
        this.isLoading.set(false);
      }, 2000);
    } else {
      this.validateForm();
    }
  }
  
  private validateForm(): void {
    const controls = this.registerForm.controls;
    
    if (controls.firstName.errors) {
      this.firstNameError.set('First name is required (min 2 characters)');
    }
    
    if (controls.lastName.errors) {
      this.lastNameError.set('Last name is required (min 2 characters)');
    }
    
    if (controls.email.errors) {
      if (controls.email.errors['required']) {
        this.emailError.set('Email is required');
      } else if (controls.email.errors['email']) {
        this.emailError.set('Please enter a valid email');
      } else if (controls.email.errors['emailDomain']) {
        this.emailError.set('Please use gmail.com, yahoo.com, or outlook.com');
      }
    }
    
    if (controls.password.errors) {
      if (controls.password.errors['required']) {
        this.passwordError.set('Password is required');
      } else if (controls.password.errors['passwordStrength']) {
        this.passwordError.set('Password must contain uppercase, lowercase, number, special character and be 8+ chars');
      }
    }
    
    if (controls.confirmPassword.errors || this.registerForm.errors?.['passwordMismatch']) {
      this.confirmPasswordError.set('Passwords do not match');
    }
    
    if (controls.agreeToTerms.errors) {
      this.termsError.set('You must agree to the terms');
    }
  }
  
  private clearErrors(): void {
    this.firstNameError.set('');
    this.lastNameError.set('');
    this.emailError.set('');
    this.passwordError.set('');
    this.confirmPasswordError.set('');
    this.termsError.set('');
  }
  
  private register(): void {
    const formValue = this.registerForm.value;
    console.log('Registering user:', formValue);
    
    // Mock registration success
    localStorage.setItem('user-token', 'mock-token');
    this.router.navigate(['/lessons']);
  }
}