import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  private readonly _isMuted = signal(false);
  readonly isMuted = this._isMuted.asReadonly();

  playCorrect(): void {
    if (!this._isMuted()) {
      this.playTone(800, 200); // High tone for correct
    }
  }

  playIncorrect(): void {
    if (!this._isMuted()) {
      this.playTone(300, 400); // Low tone for incorrect
    }
  }

  playComplete(): void {
    if (!this._isMuted()) {
      this.playTone(600, 300); // Medium tone for completion
    }
  }

  toggleMute(): void {
    this._isMuted.update(m => !m);
  }

  private playTone(frequency: number, duration: number): void {
    try {
      const audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.value = frequency;
      oscillator.type = 'sine';

      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration / 1000);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + duration / 1000);
    } catch {
      console.log('Audio not supported');
    }
  }
}