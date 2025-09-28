import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="loader-container" [class.small]="size() === 'small'">
      <div class="spinner"></div>
      @if (message()) {
        <p>{{ message() }}</p>
      }
    </div>
  `,
  styles: [`
    .loader-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 2rem;
    }

    .spinner {
      width: 40px;
      height: 40px;
      border: 4px solid #f3f3f3;
      border-top: 4px solid #58cc02;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    .small .spinner {
      width: 20px;
      height: 20px;
      border-width: 2px;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `]
})
export class LoaderComponent {
  readonly size = input<'normal' | 'small'>('normal');
  readonly message = input<string>('');
}