import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { mockInterceptor } from './mock.interceptor';

describe('MockInterceptor', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([mockInterceptor])),
        provideHttpClientTesting()
      ]
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should mock lessons API', (done) => {
    httpClient.get('/api/lessons').subscribe(response => {
      expect(response).toBeTruthy();
      expect(Array.isArray(response)).toBe(true);
      done();
    });
  });

  it('should mock successful login', (done) => {
    const loginData = { email: 'test@example.com', password: 'password123' };
    
    httpClient.post('/api/auth/login', loginData).subscribe(response => {
      expect(response).toEqual(jasmine.objectContaining({
        token: 'mock-jwt-token',
        user: jasmine.objectContaining({
          email: 'test@example.com'
        })
      }));
      done();
    });
  });

  it('should mock failed login', (done) => {
    const loginData = { email: 'wrong@example.com', password: 'wrong' };
    
    httpClient.post('/api/auth/login', loginData).subscribe({
      next: () => fail('Should have failed'),
      error: (error: HttpErrorResponse) => {
        expect(error.status).toBe(401);
        done();
      }
    });
  });

  it('should mock progress API', (done) => {
    httpClient.get('/api/progress').subscribe(response => {
      expect(response).toEqual(jasmine.objectContaining({
        completedLessons: jasmine.any(Number),
        totalXP: jasmine.any(Number),
        currentStreak: jasmine.any(Number)
      }));
      done();
    });
  });

  it('should pass through non-mocked requests', () => {
    httpClient.get('/api/other').subscribe();
    
    const req = httpTestingController.expectOne('/api/other');
    expect(req.request.method).toBe('GET');
    req.flush({ data: 'test' });
  });
});