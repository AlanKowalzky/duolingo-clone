import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { HttpLessonService } from '../services/http-lesson.service';
import { Lesson } from '../../shared/models/lesson.model';

export const lessonResolver: ResolveFn<Lesson | null> = (route, state) => {
  const httpLessonService = inject(HttpLessonService);
  const id = route.paramMap.get('id');
  return id ? httpLessonService.getLesson(id) : null;
};