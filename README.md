# Duolingo Clone - Angular Final Project

A production-quality Angular application built as a clone of Duolingo language learning platform.

## 🚀 Features Implemented

### Signals & Reactivity (150/150 pts)
- ✅ Single source of truth with signals in LessonService
- ✅ 3+ computed values: completedLessons, totalXP, currentStreak
- ✅ 2+ effects with cleanup: progress persistence, analytics tracking
- ✅ Bridge RxJS ↔ Signals: HTTP calls converted with toSignal()
- ✅ Signal inputs in components
- ✅ Signal queries with viewChild for focus management
- ✅ untracked() optimization to prevent unnecessary updates

### Architecture & Components (50/90 pts)
- ✅ Feature-sliced structure (core/shared/features/ui)
- ✅ Standalone components with clear APIs
- ✅ Reusable components with content projection

### Routing & Navigation (110/110 pts)
- ✅ Lazy loading with loadComponent (25 pts)
- ✅ Functional guards with typed data (authGuard) (20 pts)
- ✅ Functional resolvers (lessonsResolver, lessonResolver) (20 pts)
- ✅ withComponentInputBinding() for route params (15 pts)
- ✅ Custom preloading strategy for data prefetch (20 pts)
- ✅ Error route and 404 page, safe redirects (10 pts)
- ✅ Deep linking with query params, navigation state (20 pts)

### Testing (20/130 pts)
- ✅ Unit tests for core services and components
- ✅ Test setup with HttpClient mocking

## 🏗️ Architecture

### Why Signals vs RxJS?
We chose signals for:
- **App state management**: Cleaner, more predictable state updates
- **Computed values**: Automatic dependency tracking and memoization
- **Template reactivity**: Better performance with fine-grained updates

RxJS remains for:
- **HTTP operations**: Established patterns for async data fetching
- **Complex async flows**: Where operators like debounce, retry are needed

## 🛠️ Tech Stack
- Angular 19+ with Standalone Components
- TypeScript (strict mode)
- SCSS for styling
- Signals for state management
- RxJS for HTTP operations
- ESLint for code quality

## 📦 Installation

```bash
npm install
ng serve
```

## 🧪 Testing

```bash
ng test
ng e2e
```

## 📊 Current Score: ~395/600 points

## 🎯 Next Steps
1. Advanced routing with guards and resolvers
2. E2E testing implementation
3. Backend integration with Firebase
4. Forms and validation
5. Performance optimizations

## 👥 Team
- [Author 1](https://github.com/author1)
- [Author 2](https://github.com/author2) 
- [Author 3](https://github.com/author3)

## 🏫 RS School
Created in 2025 for [RS School Angular Course](https://rs.school/courses/angular)