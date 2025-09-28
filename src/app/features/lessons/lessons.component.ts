import { Component, inject, input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { LessonService } from '../../core/services/lesson.service';
import { Lesson } from '../../shared/models/lesson.model';
import { CardComponent } from '../../ui/components/card.component';
import { ButtonComponent } from '../../ui/components/button.component';

@Component({
  selector: 'app-lessons',
  standalone: true,
  imports: [CommonModule, RouterModule, CardComponent, ButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="lessons-container">
      <h1>Your Lessons</h1>
      
      <div class="progress-stats" data-cy="progress-stats">
        <div class="stat">
          <span class="label">Completed:</span>
          <span class="value">{{ lessonService.completedLessons() }}</span>
        </div>
        <div class="stat">
          <span class="label">Total XP:</span>
          <span class="value">{{ lessonService.totalXP() }}</span>
        </div>
        <div class="stat">
          <span class="label">Streak:</span>
          <span class="value">{{ lessonService.currentStreak() }}</span>
        </div>
      </div>

      <div class="lessons-grid">
        @for (lesson of lessonService.lessons(); track lesson.id) {
          <app-card [title]="lesson.title" [variant]="lesson.isLocked ? 'secondary' : 'primary'">
            <div slot="header">
              <span class="level">Level {{ lesson.level }}</span>
            </div>
            
            <p>{{ lesson.description }}</p>
            <div class="lesson-meta">
              <span class="xp">{{ lesson.xpReward }} XP</span>
            </div>
            
            <div slot="footer">
              @if (!lesson.isLocked) {
                <app-button variant="primary" size="small">
                  <a [routerLink]="['/lesson', lesson.id]" 
                     [queryParams]="{from: 'lessons', level: lesson.level}" 
                     style="text-decoration: none; color: inherit;">
                    Start
                  </a>
                </app-button>
              } @else {
                <app-button variant="outline" [disabled]="true">Locked</app-button>
              }
            </div>
          </app-card>
        }
      </div>
    </div>
  `,
  styles: [`
    .lessons-container {
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }

    .progress-stats {
      display: flex;
      gap: 2rem;
      margin: 2rem 0;
      padding: 1rem;
      background: #f8f9fa;
      border-radius: 8px;
    }

    .stat {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .lessons-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1.5rem;
    }

    .lesson-card {
      padding: 1.5rem;
      border: 2px solid #e9ecef;
      border-radius: 12px;
      background: white;
      transition: transform 0.2s;
    }

    .lesson-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }

    .lesson-card.locked {
      opacity: 0.6;
      background: #f8f9fa;
    }

    .start-btn {
      display: inline-block;
      padding: 0.75rem 1.5rem;
      background: #58cc02;
      color: white;
      text-decoration: none;
      border-radius: 8px;
      font-weight: 600;
      margin-top: 1rem;
    }
  `]
})
export class LessonsComponent implements OnInit {
  readonly lessonService = inject(LessonService);
  private readonly route = inject(ActivatedRoute);
  
  // Use resolved data with withComponentInputBinding
  readonly lessons = input<Lesson[]>();
  
  ngOnInit() {
    // Access resolved data
    const resolvedLessons = this.route.snapshot.data['lessons'];
    console.log('Resolved lessons:', resolvedLessons);
  }
}