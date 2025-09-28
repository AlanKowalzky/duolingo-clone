import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { errorInterceptor } from './error.interceptor';

describe('ErrorInterceptor', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let consoleSpy: jasmine.Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([errorInterceptor])),
        provideHttpClientTesting()
      ]
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    consoleSpy = spyOn(console, 'error');
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should handle 404 errors', (done) => {
    httpClient.get('/api/test').subscribe({
      next: () => fail('Should have failed'),
      error: (error: HttpErrorResponse) => {
        expect(error.status).toBe(404);
        expect(consoleSpy).toHaveBeenCalledWith('HTTP Error:', error);
        done();
      }
    });

    const req = httpTestingController.expectOne('/api/test');
    req.flush('Not Found', { status: 404, statusText: 'Not Found' });
  });

  it('should handle 500 errors', (done) => {
    httpClient.get('/api/test').subscribe({
      next: () => fail('Should have failed'),
      error: (error: HttpErrorResponse) => {
        expect(error.status).toBe(500);
        expect(consoleSpy).toHaveBeenCalled();
        done();
      }
    });

    const req = httpTestingController.expectOne('/api/test');
    req.flush('Server Error', { status: 500, statusText: 'Internal Server Error' });
  });

  it('should handle network errors', (done) => {
    httpClient.get('/api/test').subscribe({
      next: () => fail('Should have failed'),
      error: (error: HttpErrorResponse) => {
        expect(error.error).toBeInstanceOf(ProgressEvent);
        expect(consoleSpy).toHaveBeenCalled();
        done();
      }
    });

    const req = httpTestingController.expectOne('/api/test');
    req.error(new ProgressEvent('Network error'));
  });

  it('should pass through successful requests', () => {
    httpClient.get('/api/test').subscribe(response => {
      expect(response).toEqual({ data: 'success' });
    });

    const req = httpTestingController.expectOne('/api/test');
    req.flush({ data: 'success' });
  });
});