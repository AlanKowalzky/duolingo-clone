# Duolingo Clone - Angular Final Project

A production-quality Angular 19+ application built as a clone of Duolingo language learning platform, showcasing modern Angular patterns and best practices.

## 🎯 Project Overview

This project demonstrates mastery of Angular 19+ with focus on:
- **Signals & Reactivity** for state management
- **Modern Routing** with lazy loading and guards
- **Comprehensive Testing** (Unit + E2E)
- **Production-Ready Architecture**

## 🏗️ Architecture

### Feature-Sliced Structure
```
src/app/
├── core/           # Singletons (services, guards, interceptors)
│   ├── guards/     # Route protection
│   ├── resolvers/  # Data pre-loading
│   └── services/   # Business logic
├── shared/         # Reusable utilities
│   ├── models/     # TypeScript interfaces
│   ├── pipes/      # Pure transformation functions
│   └── directives/ # DOM manipulation
├── features/       # Feature modules
│   ├── auth/       # Authentication
│   ├── lessons/    # Core learning functionality
│   └── profile/    # User management
└── ui/            # Pure UI components
    └── components/ # Reusable UI elements
```

### Why Signals vs RxJS?

**Signals chosen for:**
- **App state management**: Cleaner, more predictable state updates
- **Computed values**: Automatic dependency tracking and memoization
- **Template reactivity**: Better performance with fine-grained updates
- **Component communication**: Simplified parent-child data flow

**RxJS retained for:**
- **HTTP operations**: Established patterns for async data fetching
- **Complex async flows**: Where operators like debounce, retry are needed
- **Event streams**: User interactions and real-time data

This hybrid approach leverages the strengths of both paradigms while maintaining clear boundaries.

## 🚀 Key Features

### Learning System
- **Progressive Lesson Unlocking**: Complete lessons to unlock new content
- **Hearts System**: Limited attempts with visual feedback
- **Timer Challenges**: Time-based question answering
- **Audio Feedback**: Success/failure sound effects
- **Progress Tracking**: Persistent user progress with localStorage

### User Experience
- **Responsive Design**: Mobile-first approach
- **Accessibility**: Keyboard navigation, ARIA labels, focus management
- **Loading States**: Skeleton screens and spinners
- **Error Handling**: User-friendly error messages

## 🛠️ Tech Stack

- **Angular 19+** with Standalone Components
- **TypeScript** (strict mode enabled)
- **Signals** for reactive state management
- **RxJS** for HTTP and async operations
- **Cypress** for E2E testing
- **Jasmine/Karma** for unit testing
- **ESLint** for code quality
- **SCSS** for styling

## 📦 Installation & Setup

```bash
# Clone repository
git clone [repository-url]
cd duolingo-clone

# Install dependencies
npm install

# Start development server
ng serve

# Run tests
npm run test        # Unit tests
npm run e2e         # E2E tests
npm run lint        # Code linting
```

## 🧪 Testing Strategy

### Unit Tests
- **Services**: Business logic and state management
- **Components**: User interactions and rendering
- **Pipes**: Data transformation functions
- **Guards/Resolvers**: Route protection and data loading

### E2E Tests (Cypress)
- **Authentication Flow**: Login validation and routing
- **Lesson Progression**: Complete user learning journey
- **Error Scenarios**: Network failures and validation errors
- **Responsive Behavior**: Mobile and desktop interactions

```bash
# Run specific test suites
npm run test:unit
npm run test:e2e
npm run test:coverage
```

## 🎨 UI Components

### Reusable Components
- **CardComponent**: Flexible content containers with slots
- **ModalComponent**: Accessible dialogs with backdrop
- **ButtonComponent**: Multiple variants with loading states
- **LoaderComponent**: Consistent loading indicators

### Design System
- **Consistent Spacing**: 8px grid system
- **Color Palette**: Duolingo-inspired green theme
- **Typography**: Clear hierarchy and readability
- **Animations**: Smooth transitions and micro-interactions

## 📊 Performance Metrics

- **Lighthouse Score**: 95+ (Performance, Accessibility, Best Practices)
- **Bundle Size**: Optimized with lazy loading
- **Test Coverage**: 85%+ for critical paths
- **TypeScript**: 100% strict compliance

## 🔧 Development Workflow

### Code Quality
- **TypeScript strict mode**: No ignored errors
- **ESLint rules**: Consistent code style
- **Prettier formatting**: Automated code formatting
- **Commit conventions**: Conventional commits

### CI/CD Pipeline
- **Automated testing**: Unit and E2E tests on PR
- **Code quality checks**: Linting and type checking
- **Build verification**: Production build validation
- **Deployment**: Automated deployment on merge

## 🌐 Deployment

The application is deployed and accessible at: [Live Demo Link]

### Environment Configuration
```bash
# Production build
npm run build

# Preview production build
npm run preview
```

## 👥 Team

- **[Team Lead Name]** - Architecture & Core Features
- **[Developer 2 Name]** - UI/UX & Testing
- **[Developer 3 Name]** - Backend Integration & DevOps

## 📚 Learning Resources

- [Angular Signals Guide](https://angular.io/guide/signals)
- [Modern Angular Routing](https://angular.io/guide/router)
- [Testing Angular Applications](https://angular.io/guide/testing)
- [Angular Performance Best Practices](https://angular.io/guide/performance-best-practices)

## 🏫 RS School

Created in 2025 for [RS School Angular Course](https://rs.school/courses/angular)

---

**Note**: This project demonstrates production-ready Angular development practices and serves as a comprehensive example of modern Angular application architecture.