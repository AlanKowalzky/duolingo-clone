import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { authGuard } from './auth.guard';

describe('AuthGuard', () => {
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: routerSpy }
      ]
    });

    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should allow access when user is authenticated', () => {
    spyOn(localStorage, 'getItem').and.returnValue('mock-token');
    
    const result = TestBed.runInInjectionContext(() => authGuard());
    
    expect(result).toBe(true);
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should redirect to login when user is not authenticated', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    
    const result = TestBed.runInInjectionContext(() => authGuard());
    
    expect(result).toBe(false);
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should handle empty token', () => {
    spyOn(localStorage, 'getItem').and.returnValue('');
    
    const result = TestBed.runInInjectionContext(() => authGuard());
    
    expect(result).toBe(false);
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should handle localStorage errors', () => {
    spyOn(localStorage, 'getItem').and.throwError('Storage error');
    
    const result = TestBed.runInInjectionContext(() => authGuard());
    
    expect(result).toBe(false);
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});