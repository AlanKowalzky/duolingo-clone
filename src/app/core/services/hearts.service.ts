import { Injectable, signal, computed, effect } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeartsService {
  private readonly _hearts = signal(5);
  private readonly _maxHearts = signal(5);

  readonly hearts = this._hearts.asReadonly();
  readonly maxHearts = this._maxHearts.asReadonly();
  readonly hasHearts = computed(() => this._hearts() > 0);

  constructor() {
    // Load hearts from localStorage
    const saved = localStorage.getItem('user-hearts');
    if (saved) {
      this._hearts.set(parseInt(saved));
    }

    // Save hearts on change
    effect(() => {
      localStorage.setItem('user-hearts', this._hearts().toString());
    });
  }

  loseHeart(): boolean {
    if (this._hearts() > 0) {
      this._hearts.update(h => h - 1);
      return true;
    }
    return false;
  }

  gainHeart(): void {
    if (this._hearts() < this._maxHearts()) {
      this._hearts.update(h => h + 1);
    }
  }

  refillHearts(): void {
    this._hearts.set(this._maxHearts());
  }
}