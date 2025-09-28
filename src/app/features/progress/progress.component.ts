import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LessonService } from '../../core/services/lesson.service';

@Component({
  selector: 'app-progress',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="progress-container">
      <h2>Your Progress</h2>
      
      <div class="stats-overview">
        <div class="stat">
          <span class="value">{{ lessonService.completedLessons() }}</span>
          <span class="label">Lessons Completed</span>
        </div>
        <div class="stat">
          <span class="value">{{ lessonService.totalXP() }}</span>
          <span class="label">Total XP</span>
        </div>
        <div class="stat">
          <span class="value">{{ lessonService.currentStreak() }}</span>
          <span class="label">Day Streak</span>
        </div>
      </div>

      <div class="progress-details">
        @for (progress of lessonService.userProgress(); track progress.lessonId) {
          <div class="progress-item" [class.completed]="progress.completed">
            <span class="lesson-id">Lesson {{ progress.lessonId }}</span>
            <span class="score">{{ progress.score }}%</span>
            <span class="attempts">{{ progress.attempts }} attempts</span>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .progress-container {
      max-width: 800px;
      margin: 0 auto;
      padding: 2rem;
    }

    .stats-overview {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1rem;
      margin: 2rem 0;
    }

    .stat {
      text-align: center;
      padding: 1rem;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .value {
      display: block;
      font-size: 2rem;
      font-weight: bold;
      color: #58cc02;
    }

    .progress-item {
      display: flex;
      justify-content: space-between;
      padding: 1rem;
      margin: 0.5rem 0;
      background: #f8f9fa;
      border-radius: 8px;
    }

    .progress-item.completed {
      background: #e8f5e8;
      border-left: 4px solid #58cc02;
    }
  `]
})
export class ProgressComponent {
  readonly lessonService = inject(LessonService);
}