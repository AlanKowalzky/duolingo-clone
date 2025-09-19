import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LessonService } from '../../core/services/lesson.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="profile-container">
      <h1>Your Profile</h1>
      
      <div class="stats-grid">
        <div class="stat-card">
          <h3>Completed Lessons</h3>
          <span class="stat-value">{{ lessonService.completedLessons() }}</span>
        </div>
        
        <div class="stat-card">
          <h3>Total XP</h3>
          <span class="stat-value">{{ lessonService.totalXP() }}</span>
        </div>
        
        <div class="stat-card">
          <h3>Current Streak</h3>
          <span class="stat-value">{{ lessonService.currentStreak() }}</span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .profile-container {
      max-width: 800px;
      margin: 0 auto;
      padding: 2rem;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1.5rem;
      margin-top: 2rem;
    }

    .stat-card {
      background: white;
      padding: 2rem;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      text-align: center;
    }

    .stat-value {
      font-size: 2.5rem;
      font-weight: bold;
      color: #58cc02;
      display: block;
      margin-top: 0.5rem;
    }
  `]
})
export class ProfileComponent {
  readonly lessonService = inject(LessonService);
}