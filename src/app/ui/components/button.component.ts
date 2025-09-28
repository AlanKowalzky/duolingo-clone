import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button 
      [type]="type()"
      [disabled]="disabled()"
      [class]="'btn btn-' + variant() + (size() !== 'medium' ? ' btn-' + size() : '') + (fullWidth() ? ' btn-full' : '')">
      @if (loading()) {
        <span class="spinner"></span>
      }
      <ng-content select="[slot=icon]"></ng-content>
      <ng-content></ng-content>
    </button>
  `,
  styles: [`
    .btn {
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
    }
    .btn:disabled { opacity: 0.6; cursor: not-allowed; }
    .btn-primary { background: #58cc02; color: white; }
    .btn-secondary { background: #1cb0f6; color: white; }
    .btn-outline { background: transparent; border: 2px solid #58cc02; color: #58cc02; }
    .btn-small { padding: 0.5rem 1rem; font-size: 0.875rem; }
    .btn-large { padding: 1rem 2rem; font-size: 1.125rem; }
    .btn-full { width: 100%; justify-content: center; }
    .spinner {
      width: 1rem;
      height: 1rem;
      border: 2px solid transparent;
      border-top: 2px solid currentColor;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }
    @keyframes spin { to { transform: rotate(360deg); } }
  `]
})
export class ButtonComponent {
  readonly variant = input<'primary' | 'secondary' | 'outline'>('primary');
  readonly size = input<'small' | 'medium' | 'large'>('medium');
  readonly type = input<'button' | 'submit' | 'reset'>('button');
  readonly disabled = input<boolean>(false);
  readonly loading = input<boolean>(false);
  readonly fullWidth = input<boolean>(false);
}