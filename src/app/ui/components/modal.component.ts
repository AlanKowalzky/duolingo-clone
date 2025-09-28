import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (isOpen()) {
      <div class="modal-overlay" (click)="onClose()" (keydown.escape)="onClose()" tabindex="0">
        <div class="modal-content" (click)="$event.stopPropagation()" (keydown.escape)="onClose()" tabindex="0">
          <div class="modal-header">
            <ng-content select="[slot=header]"></ng-content>
            <button class="close-btn" (click)="onClose()" (keydown.enter)="onClose()" tabindex="0" aria-label="Close modal">×</button>
          </div>
          <div class="modal-body">
            <ng-content></ng-content>
          </div>
          <div class="modal-footer">
            <ng-content select="[slot=footer]"></ng-content>
          </div>
        </div>
      </div>
    }
  `,
  styles: [`
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }
    .modal-content {
      background: white;
      border-radius: 12px;
      max-width: 500px;
      width: 90%;
      max-height: 80vh;
      overflow: auto;
    }
    .modal-header {
      padding: 1rem;
      border-bottom: 1px solid #e9ecef;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .close-btn {
      background: none;
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
    }
    .modal-body { padding: 1.5rem; }
    .modal-footer {
      padding: 1rem;
      border-top: 1px solid #e9ecef;
      display: flex;
      justify-content: flex-end;
      gap: 1rem;
    }
  `]
})
export class ModalComponent {
  readonly isOpen = input.required<boolean>();
  readonly closeModal = output<void>();
  
  onClose() {
    this.closeModal.emit();
  }
}