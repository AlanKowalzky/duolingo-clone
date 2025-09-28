import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError(error => {
      console.error('HTTP Error:', error);
      
      if (error.status === 401) {
        localStorage.removeItem('user-token');
        window.location.href = '/login';
      }
      
      return throwError(() => error);
    })
  );
};