import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="login-container">
      <h1>Login to Duolingo Clone</h1>
      <button (click)="login()" class="login-btn">
        Mock Login
      </button>
    </div>
  `,
  styles: [`
    .login-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 50vh;
      gap: 2rem;
    }

    .login-btn {
      padding: 1rem 2rem;
      background: #58cc02;
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 1.1rem;
      cursor: pointer;
    }
  `]
})
export class LoginComponent {
  private readonly router = inject(Router);

  login(): void {
    // Mock login - set token
    localStorage.setItem('user-token', 'mock-token');
    this.router.navigate(['/lessons']);
  }
}