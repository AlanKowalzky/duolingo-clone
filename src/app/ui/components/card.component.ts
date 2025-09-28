import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card" [class]="variant()">
      @if (title()) {
        <div class="card-header">
          <h3>{{ title() }}</h3>
          <ng-content select="[slot=header]"></ng-content>
        </div>
      }
      <div class="card-content">
        <ng-content></ng-content>
      </div>
      @if (hasFooter) {
        <div class="card-footer">
          <ng-content select="[slot=footer]"></ng-content>
        </div>
      }
    </div>
  `,
  styles: [`
    .card {
      background: white;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      overflow: hidden;
      transition: transform 0.2s;
    }
    .card:hover { transform: translateY(-2px); }
    .card.primary { border-left: 4px solid #58cc02; }
    .card.secondary { border-left: 4px solid #1cb0f6; }
    .card-header {
      padding: 1rem;
      border-bottom: 1px solid #e9ecef;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .card-content { padding: 1.5rem; }
    .card-footer {
      padding: 1rem;
      border-top: 1px solid #e9ecef;
      background: #f8f9fa;
    }
  `]
})
export class CardComponent {
  readonly title = input<string>();
  readonly variant = input<'default' | 'primary' | 'secondary'>('default');
  
  readonly hasFooter = true; // Simplified - in real app would check for footer content
}