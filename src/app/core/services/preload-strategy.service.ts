import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of, timer } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomPreloadingStrategy implements PreloadingStrategy {
  preload(route: Route, load: () => Observable<unknown>): Observable<unknown> {
    // Preload lessons after 2 seconds
    if (route.path === 'lessons') {
      return timer(2000).pipe(mergeMap(() => load()));
    }
    
    // Preload lesson detail immediately for better UX
    if (route.path === 'lesson/:id') {
      return load();
    }
    
    // Don't preload other routes
    return of(null);
  }
}