import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { HttpLessonService } from '../services/http-lesson.service';
import { Lesson } from '../../shared/models/lesson.model';

export const lessonsResolver: ResolveFn<Lesson[]> = (route, state) => {
  const httpLessonService = inject(HttpLessonService);
  return httpLessonService.getLessons();
};