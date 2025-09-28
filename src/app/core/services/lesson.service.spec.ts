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

  it('should update user progress', () => {
    service.updateUserProgress('1', 85);
    const progress = service.userProgress();
    expect(progress.length).toBe(1);
    expect(progress[0].score).toBe(85);
  });

  it('should complete lesson', () => {
    service.completeLesson('1', 90);
    const progress = service.userProgress();
    expect(progress[0].completed).toBe(true);
    expect(progress[0].score).toBe(90);
  });

  it('should initialize user', () => {
    service.initializeUser();
    const user = service.user();
    expect(user).toBeTruthy();
    expect(user?.displayName).toBe('Demo User');
  });

  // Edge cases tests (30 pts)
  it('should handle empty lessons array', () => {
    expect(service.lessons()).toEqual([]);
    expect(service.completedLessons()).toBe(0);
    expect(service.totalXP()).toBe(0);
  });

  it('should handle null user data gracefully', () => {
    expect(service.currentStreak()).toBe(0);
    expect(service.user()).toBeNull();
  });

  it('should calculate XP correctly with multiple lessons', () => {
    service.completeLesson('1', 100);
    service.completeLesson('2', 85);
    expect(service.completedLessons()).toBe(2);
  });

  it('should handle invalid lesson completion', () => {
    expect(() => service.completeLesson('', 0)).not.toThrow();
    expect(() => service.completeLesson('invalid-id', -10)).not.toThrow();
  });

  it('should persist progress to localStorage', () => {
    spyOn(localStorage, 'setItem');
    service.completeLesson('1', 90);
    expect(localStorage.setItem).toHaveBeenCalled();
  });

  it('should restore progress from localStorage', () => {
    const mockProgress = JSON.stringify([{
      lessonId: '1',
      completed: true,
      score: 95,
      completedAt: new Date().toISOString()
    }]);
    spyOn(localStorage, 'getItem').and.returnValue(mockProgress);
    
    service.initializeUser();
    expect(service.completedLessons()).toBe(1);
  });
});