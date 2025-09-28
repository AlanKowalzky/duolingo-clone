import { Injectable, signal, computed, effect } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  private readonly _timeLeft = signal(30);
  private readonly _isRunning = signal(false);
  private intervalId: any = null;

  readonly timeLeft = this._timeLeft.asReadonly();
  readonly isRunning = this._isRunning.asReadonly();
  readonly isTimeUp = computed(() => this._timeLeft() === 0);

  startTimer(seconds: number = 30): void {
    this.stopTimer();
    this._timeLeft.set(seconds);
    this._isRunning.set(true);
    
    this.intervalId = setInterval(() => {
      if (this._timeLeft() > 0) {
        this._timeLeft.update(t => t - 1);
      } else {
        this.stopTimer();
      }
    }, 1000);
  }

  stopTimer(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this._isRunning.set(false);
  }

  resetTimer(): void {
    this.stopTimer();
    this._timeLeft.set(30);
  }
}