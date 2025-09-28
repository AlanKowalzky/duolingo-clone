import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { lessonsResolver } from './core/resolvers/lessons.resolver';
import { lessonResolver } from './core/resolvers/lesson.resolver';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'lessons',
    loadComponent: () => import('./features/lessons/lessons.component').then(m => m.LessonsComponent),
    resolve: { lessons: lessonsResolver },
    canActivate: [authGuard]
  },
  {
    path: 'lesson/:id',
    loadComponent: () => import('./features/lessons/lesson-detail.component').then(m => m.LessonDetailComponent),
    resolve: { lesson: lessonResolver },
    canActivate: [authGuard]
  },
  {
    path: 'profile',
    loadComponent: () => import('./features/profile/profile.component').then(m => m.ProfileComponent),
    canActivate: [authGuard]
  },
  {
    path: 'progress',
    loadComponent: () => import('./features/progress/progress.component').then(m => m.ProgressComponent),
    canActivate: [authGuard]
  },
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login.component').then(m => m.LoginComponent)
  },
  {
    path: '**',
    loadComponent: () => import('./shared/components/not-found.component').then(m => m.NotFoundComponent)
  }
];