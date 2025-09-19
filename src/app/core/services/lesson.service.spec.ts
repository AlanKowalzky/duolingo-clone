import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { LessonService } from './lesson.service';

describe('LessonService', () => {
  let service: LessonService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()]
    });
    service = TestBed.inject(LessonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should calculate completed lessons correctly', () => {
    // Test computed signal
    expect(service.completedLessons()).toBe(0);
  });

  it('should calculate total XP correctly', () => {
    // Test computed signal
    expect(service.totalXP()).toBe(0);
  });

  it('should have current streak', () => {
    // Test computed signal
    expect(service.currentStreak()).toBe(0);
  });
});